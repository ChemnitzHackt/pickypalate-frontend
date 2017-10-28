import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import Styles from './MapStyles';

console.log(Styles)

const GOOGLE_MAPS_API_KEY = 'AIzaSyDlahMtbvEn2WGTdbBZ0mp7Kew5Q8m4AEU';

const isDay = () => {
  const hours = new Date().getHours()
  return hours > 6 && hours < 20
};

const Map = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=' + 
                  GOOGLE_MAPS_API_KEY + '&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div className='map--loader' />,
    containerElement: <div className='map--container' />,
    mapElement: <div className='map--view' />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const lat = props.latitude;
  const lng = props.longitude;

  return (
    <GoogleMap
      onClick={props.onClick}
      defaultZoom={13}
      center={{ lat, lng }}
      defaultOptions={{ styles: Styles[ isDay() ? 'Day' : 'Night' ] }}
    >
      {props.children}
    </GoogleMap>
  )
});
export default Map;