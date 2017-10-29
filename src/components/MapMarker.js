import { Marker } from 'react-google-maps';

import { materialIconSVG } from '../lib/';

const MARKER_TYPES = {
  Location: 'Location',
  Bakery: 'Bakery',
}

export {MARKER_TYPES};

const MapMarker = props => {
  switch (props.type) {
    case MARKER_TYPES.Location:
      return (
        <Marker
          {...props}
          icon={materialIconSVG.getSVG('place', 'maps', 'small')}
        />
      );
    case MARKER_TYPES.Bakery:
      console.log('Rendering bakery');
      return (
        <Marker
          {...props}
          icon={materialIconSVG.getSVG('restaurant', 'maps', 'small')} />
      );
    default:
      return (
        <Marker {...props} />
      );
  }
}
export default MapMarker;
