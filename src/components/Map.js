import React from 'react';
import { compose, withProps, lifecycle} from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import LocationProvider from './../util/LocationProvider';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDlahMtbvEn2WGTdbBZ0mp7Kew5Q8m4AEU';

const Map = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=' + 
                  GOOGLE_MAPS_API_KEY + '&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div className='map--loader' />,
    containerElement: <div className='map--container' />,
    mapElement: <div className='map--view' />
  }),
  lifecycle({

    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          if(places.length)
            this.props.onLatLngChange(
              places[0].geometry.location.lat(),
              places[0].geometry.location.lng());

        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const lat = props.latitude;
  const lng = props.longitude;

  return (
    <GoogleMap onClick={props.onClick} defaultZoom={10} center={{ lat, lng }}>
       {props.showSearch && <SearchBox
          controlPosition={google.maps.ControlPosition.TOP_CENTER}
          onPlacesChanged={props.onPlacesChanged}
          ref={props.onSearchBoxMounted}>
          <input
          type="text"
          placeholder="Start typing"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
          />
        </SearchBox>
      }

    </GoogleMap>
  )
});
export default Map;