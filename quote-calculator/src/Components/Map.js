// map.js

import React, { useEffect, useRef } from 'react';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const OneMap = () => {
    const mapRef = useRef(null); // Reference for the map instance

    useEffect(() => {
        const sw = L.latLng(1.144, 103.535);
        const ne = L.latLng(1.494, 104.502);
        const bounds = L.latLngBounds(sw, ne);

        // Initialize map only once
        if (!mapRef.current) {
            mapRef.current = L.map('mapdiv', {
                center: L.latLng(1.2868108, 103.8545349),
                zoom: 16,
                maxBounds: bounds,
            });

            const basemap = L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png', {
                detectRetina: true,
                maxZoom: 19,
                minZoom: 11,
                attribution: '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
            });

            basemap.addTo(mapRef.current);
        }
    }, []); // Empty dependency array to run only once

    return <div id="mapdiv" style={{ height: '800px' }}></div>;
};

export default OneMap;
