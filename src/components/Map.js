import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDlahMtbvEn2WGTdbBZ0mp7Kew5Q8m4AEU';

const Map = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_MAPS_API_KEY + '&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div className='map--loader' />,
    containerElement: <div className='map--container' />,
    mapElement: <div className='map--view' />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const lat = props.location && parseFloat(props.location.latitude);
  const lng = props.location && parseFloat(props.location.longitude);

  return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat, lng }}>
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  )
});
export default Map;