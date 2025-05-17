"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix Leaflet marker icon issue
const fixLeafletIcon = () => {
  // Type-safe approach to access and delete a property
  const iconProto = L.Icon.Default.prototype as {
    _getIconUrl?: unknown;
  };
  
  // Delete the property in a type-safe way
  if ('_getIconUrl' in iconProto) {
    delete iconProto._getIconUrl;
  }
  
  // Set the icon options
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
  });
};

interface EventMapProps {
  position: [number, number];
  zoom: number;
  title?: string;
}

export default function EventMap({ position, zoom, title = "Event Location" }: EventMapProps) {
  useEffect(() => {
    fixLeafletIcon();
  }, []);
  
  return (
    <MapContainer 
      center={position} 
      zoom={zoom} 
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <strong>{title}</strong><br />
          Join us on July 18th, 2025!
        </Popup>
      </Marker>
    </MapContainer>
  );
}