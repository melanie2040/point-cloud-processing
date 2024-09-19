import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import iconMap from './iconmap.png'; // Your custom marker icon
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const Map = ({ postalCode }) => {
    const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]); // Default position
    const [address, setAddress] = useState('');
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    const fetchCoordinates = async (postalCode) => {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: postalCode,
                    format: 'json',
                    addressdetails: 1,
                },
            });

            const results = response.data;
            if (results.length > 0) {
                const { lat, lon } = results[0];
                setMarkerPosition([lat, lon]);
                setAddress(results[0].display_name);

                // Update the map view if it is initialized
                if (mapRef.current) {
                    mapRef.current.setView([lat, lon], mapRef.current.getZoom());
                }

                // Update marker position
                if (markerRef.current) {
                    markerRef.current.setLatLng([lat, lon]);
                }
            } else {
                setAddress('No address found');
            }
        } catch (error) {
            setAddress('Error fetching coordinates');
        }
    };

    useEffect(() => {
        // Initialize the map
        mapRef.current = L.map('map', { center: markerPosition, zoom: 13 });

        // Set up the tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(mapRef.current);

        // Create the marker
        markerRef.current = L.marker(markerPosition, {
            icon: L.icon({
                iconUrl: iconMap,
                iconSize: [38, 38],
                iconAnchor: [22, 94],
                popupAnchor: [-3, -76],
            }),
        }).addTo(mapRef.current);

        // Cleanup function to remove the map on unmount
        return () => {
            mapRef.current.remove();
        };
    }, []);

    useEffect(() => {
        if (postalCode) {
            fetchCoordinates(postalCode);
        }
    }, [postalCode]);

    return (
        <div>
            <div id="map" style={{ height: '500px', width: '100%' }} />
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <h4>Address:</h4>
                <p>{address}</p>
            </div>
        </div>
    );
};

export default Map;
