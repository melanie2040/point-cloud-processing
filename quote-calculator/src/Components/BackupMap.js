import React, { useState, useEffect } from 'react';
//import MapLibreGL from 'maplibre-gl';
//import 'maplibre-gl/dist/maplibre-gl.css'; // Import MapLibre CSS
import axios from 'axios';
import L from 'leaflet'; // Import Leaflet
import iconMap from './iconmap.png';
import 'leaflet/dist/leaflet.css';

export async function geocodePostalCode(postalCode){
    const apiKey = 'a55f4d3770f940e8b31fa151a2dc0246';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(postalCode)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if(data.results.length>0){
        const location = data.results[0].geometry;
        return { lat: location.lat, lng: location.lng };
    }else{
        throw new Error('No results found');
    }
}

export async function initMap(postalCode){
    try{
        const{lat, lng} = await geocodePostalCode(postalCode);

        const map = L.map('map').setView([lat, lng], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        const customIcon = L.icon({
            iconUrl: iconMap, // Path to your custom icon
            iconSize: [38, 38], // Size of the icon [width, height]
            iconAnchor: [22, 94], // Point of the icon which will correspond to marker's location
            popupAnchor: [-3, -76] // Point from which the popup should open relative to the iconAnchor
        });

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
        //marker.bindPopup('Location: ' + postalCode).openPopup();
    }catch(error){
        console.error('Error: ', error);
    }
}