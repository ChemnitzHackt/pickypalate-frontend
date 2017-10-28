const LOCATION = {
  latitude: '52.5145',
  longitude: '13.3907'
};

let UPDATE_CALLBACK;

/**
 * Basic location provider and updater.
 * 
 * @class LocationProvider
 */
class LocationProvider {
  
  /**
   * Constructor.
   * 
   * @memberof LocationProvider
   */
  constructor () {
    this.update();
    this._listen();
  }

  /**
   * Returns the current location.
   * 
   * @returns {Object} - current location.
   * @memberof LocationProvider
   */
  get () {
    return LOCATION;
  }

  /**
   * Subscribe a given callback to location changes.
   * 
   * @param {Function} callback - the callback to call upon changes
   * @memberof LocationProvider
   */
  onChange (callback) {
    UPDATE_CALLBACK = callback;
  }

  /**
   * Update location and trigger callback if available.
   * 
   * @memberof LocationProvider
   */
  update () {
    console.log('[LocationProvider] Updating ...');
    navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition(({ coords }) => {
      LOCATION.longitude = coords.longitude;
      LOCATION.latitude = coords.latitude;
      if (UPDATE_CALLBACK) {
        UPDATE_CALLBACK(LOCATION);
      }
    });
  }

  /**
   * Listen for location changes.
   * TODO: @adfr do real change listening here
   * 
   * @memberof LocationProvider
   */
  _listen () {
    setInterval(this._update, 5000);
  }
}

export default LocationProvider;
