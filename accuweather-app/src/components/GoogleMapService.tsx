import {GoogleMap} from '@react-google-maps/api';
import React, { useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import useStyles from '../helpers/useStyles';
import { addMapAction, addMarkerAction, addMapsAction } from '../store/actions/action.googleMapReducer';
import { addMarkerToMap } from '../helpers/addMarkerToMap';
import { resetRedirectAction } from '../store/actions/action.mapReducer';

declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    google: any;
  }
}

window.google = window.google || {};

interface IProps {
  // favorites: any;
  favoriteCities: any;
  markerLatLng: any;
  markerAddress: string;
  numOfMarkers: any;
  mapZoom: any;
  redirect: boolean;
  showCities: boolean;
  address: string;
  markersMap: any;
  latLng: any;
  map: any;
  addMap: Function
  addMaps: Function
  addMarker: Function
  resetRedirect: Function
}

const GoogleMapService: React.FC<IProps> = ({
  addMaps,
  map,
  latLng,
  address,
  addMap,
  addMarker,
  markersMap,
  redirect,
  mapZoom,
  numOfMarkers,
  markerAddress,
  markerLatLng,
  favoriteCities,
  showCities,
  resetRedirect,
}) => {
  
  const mapRef = useRef(null);
  const classes = useStyles();
  const maps = window.google.maps;

  useEffect(() => {
    if (map && address !== "") {
      reverseGeocoding(map, address, maps);
    }
    // eslint-disable-next-line
  }, [address])

  useEffect(() => {
    if (showCities) {
      console.log('showCities', showCities)
      addCitiesToMap(map, favoriteCities, latLng, markersMap);
    }
    // eslint-disable-next-line
  }, [showCities]);

  const addCitiesToMap = (
    map: any,
    favoriteCities: any,
    latLng: any,
    markersMap: any,
  ) => {
    if (favoriteCities.length !== 0) {
      let bounds: any;
      if (map && markersMap.size !== 0) {
        bounds = new maps.LatLngBounds();
        const marker = markersMap.get('user');
        bounds.extend(marker.getPosition());
        // eslint-disable-next-line
        favoriteCities.map((city: any) => {
          const location = {
            lat: city.lat,
            lng: city.lng,
          };
          const place = { name: city.cityName, location };
          const marker = addMarkerToMap(place, map, maps, true);
          markersMap.set(city.cityCode, marker);
          bounds.extend(marker.getPosition());
        });
      }
      addMarker(markersMap);
      if (map && markersMap.size > 2) {
        map.fitBounds(bounds);
      }
    }
  };

  

  const onLoad = useCallback(function onLoad(map: any) {
    if (redirect) {
      const newMarkersMap = new Map();
      map.setCenter(latLng);
      map.setZoom(mapZoom);
      if (numOfMarkers > 0 && address) {
        let place = {};
        place = { name: markerAddress, location: markerLatLng };
        const newMarker = addMarkerToMap(place, map, maps);
        newMarkersMap.set('user', newMarker);
        addMarker(newMarkersMap);
      }
      if (numOfMarkers > 1) {
        addCitiesToMap(map, favoriteCities, markerLatLng, newMarkersMap);
      }
      resetRedirect();
    }
    addMap(map);
    addMaps(maps);
    // eslint-disable-next-line
  }, []);

  const reverseGeocoding = (map: any, address: string, maps: any) => {
    const geocoder = new maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          const newMarkersMap = new Map();
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          const latLng = { lat, lng };
          map.panTo(latLng);
          const place = { name: address, location: latLng };
          const newMarker = addMarkerToMap(place, map, maps);
          newMarkersMap.set('user', newMarker);
          addMarker(newMarkersMap);          
        }
      } 
    });
  };

  return (
    <div className={classes.root}>
      <GoogleMap
        id="map"
        ref={mapRef}
        center={latLng}
        zoom={13}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: true,
          mapTypeControlOptions: {
            position: maps.ControlPosition.LEFT_BOTTOM,
          },
        }}
        mapContainerClassName={classes.drawerMap}
        onLoad={onLoad}
      >
      </GoogleMap>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  markersMap: state.googleMap.markersMap,
  latLng: state.map.latLng,
  address: state.map.address,
  map: state.googleMap.map,
  redirect: state.map.redirect,
  mapZoom: state.map.mapZoom,
  numOfMarkers: state.map.numOfMarkers,
  markerAddress: state.map.markerAddress,
  markerLatLng: state.map.markerLatLng,
  favoriteCities: state.cities.favoriteCities,
  showCities: state.cities.showCities,
  favorites: state.cities.favorites,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addMap: (map: any) => dispatch(addMapAction(map)),
  addMaps: (maps: any) => dispatch(addMapsAction(maps)),
  addMarker: (marker: any) => dispatch(addMarkerAction(marker)),
  resetRedirect: () => dispatch(resetRedirectAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoogleMapService);

// {/* <AutoCompleteInput
//           autocompleteBoxRef={autocompleteBoxRef}
//           setClearButton={setClearButton}
//           autocompleteInput={autocompleteInput}
//           clearButton={clearButton}
//           setAutocompleteInput={setAutocompleteInput}
//           maps={maps}
//           reverseGeocoding={reverseGeocoding}
//         /> */}
