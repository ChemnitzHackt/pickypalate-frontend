import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const position = [51.505, -0.09];

const MapComponent = (props) => (
  <div>
  <Map center={position} zoom={7}>
    <TileLayer
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
  </Map>
  </div>
);
