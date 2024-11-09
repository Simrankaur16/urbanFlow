import { useState, useCallback } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import './RouteSelection.css';

// Add Mapbox GL CSS directly to the component
const mapboxStyles = document.createElement('link');
mapboxStyles.rel = 'stylesheet';
mapboxStyles.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
document.head.appendChild(mapboxStyles);

// Replace with your Mapbox access token
const MAPBOX_TOKEN = 'pk.eyJ1IjoibmVlbDIwMDQiLCJhIjoiY20zYWU4eTl1MWFrbDJ3cTJxZnIycGxkZSJ9.mMjStxQytumMjT6NqcaT_A';

const RouteSelection = () => {
  const [viewState, setViewState] = useState({
    latitude: 43.6832, // Brampton coordinates
    longitude: -79.7666,
    zoom: 12
  });

  const [route, setRoute] = useState({
    start: '',
    startCoords: null,
    end: '',
    endCoords: null
  });

  const [loading, setLoading] = useState(false);

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${MAPBOX_TOKEN}&limit=1`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        return { longitude, latitude, place_name: data.features[0].place_name };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  const handleLocationSearch = async (type) => {
    const address = route[type];
    if (!address) return;

    setLoading(true);
    const result = await geocodeAddress(address);
    setLoading(false);

    if (result) {
      setRoute(prev => ({
        ...prev,
        [type]: result.place_name,
        [`${type}Coords`]: { latitude: result.latitude, longitude: result.longitude }
      }));

      if (type === 'start') {
        setViewState(prev => ({
          ...prev,
          latitude: result.latitude,
          longitude: result.longitude,
          zoom: 13
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (route.startCoords && route.endCoords) {
      // Handle route calculation here
      console.log('Calculating route between:', route);
    }
  };

  return (
    <div className="route-selection">
      <h1>Plan Your Route</h1>
      
      <div className="route-container">
        <div className="route-form-container">
          <form onSubmit={handleSubmit} className="route-form">
            <div className="form-group">
              <label htmlFor="start">Start Location</label>
              <div className="input-with-button">
                <input
                  id="start"
                  value={route.start}
                  onChange={(e) => setRoute({ ...route, start: e.target.value })}
                  placeholder="Enter start location"
                />
                <button 
                  type="button" 
                  onClick={() => handleLocationSearch('start')}
                  disabled={loading || !route.start}
                >
                  Search
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="end">Destination</label>
              <div className="input-with-button">
                <input
                  id="end"
                  value={route.end}
                  onChange={(e) => setRoute({ ...route, end: e.target.value })}
                  placeholder="Enter destination"
                />
                <button 
                  type="button" 
                  onClick={() => handleLocationSearch('end')}
                  disabled={loading || !route.end}
                >
                  Search
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="find-routes-btn"
              disabled={!route.startCoords || !route.endCoords}
            >
              Find Routes
            </button>
          </form>

          {(route.startCoords || route.endCoords) && (
            <div className="transport-options">
              <h2>Available Options</h2>
              <div className="options-list">
                <div className="option-card">
                  <h3>Bus Route</h3>
                  <p>Next bus in 10 mins</p>
                  <p>Estimated time: 25 mins</p>
                </div>
                <div className="option-card">
                  <h3>Carpool</h3>
                  <p>3 drivers nearby</p>
                  <p>From $5</p>
                </div>
                <div className="option-card">
                  <h3>Bicycle</h3>
                  <p>5 bikes available</p>
                  <p>5 mins walk to station</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="map-container">
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <NavigationControl position="top-right" />
            
            {route.startCoords && (
              <Marker
                longitude={route.startCoords.longitude}
                latitude={route.startCoords.latitude}
                color="#00ff00"
              />
            )}
            
            {route.endCoords && (
              <Marker
                longitude={route.endCoords.longitude}
                latitude={route.endCoords.latitude}
                color="#ff0000"
              />
            )}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default RouteSelection; 