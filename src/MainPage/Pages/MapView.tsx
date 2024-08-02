import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';

// const startLocationIcon = require('../../assets/oval.png');
// const endLocationIcon = require('../../assets/greenMarker.png');

const OKCONTRACTING_COORDINATES = { latitude: 37.4147, longitude: -122.0837 };

const MapViewLayout = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0); // Highlight the first route by default
  const mapAnimationTimeout = useRef(null);

  useEffect(() => {
    const fetchCurrentLocation = () => {
      const watchId = Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error watching current location:', error);
        },
        { enableHighAccuracy: true, distanceFilter: 10 }
      );

      return () => Geolocation.clearWatch(watchId);
    };

    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      setWaypoints([currentLocation, OKCONTRACTING_COORDINATES]);
      fetchRoutes(currentLocation, OKCONTRACTING_COORDINATES);
    }
  }, [currentLocation]);

  const fetchRoutes = async (origin, destination) => {
    try {
      const waypointsStr = waypoints.slice(1, -1).map(point => `${point.latitude},${point.longitude}`).join('|');
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&waypoints=${waypointsStr}&key=${GOOGLE_API_KEY}&alternatives=true`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.routes) {
        const routes = data.routes.map(route => ({
          coordinates: decodePolyline(route.overview_polyline.points),
          summary: route.summary,
          distance: route.legs[0].distance.text,
          duration: route.legs[0].duration.text,
        }));
        setRoutes(routes);
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  const decodePolyline = (t, e) => {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
      a = null, h = 0, i = 0;
      do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5;
      while (a >= 32);
      n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
      do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5;
      while (a >= 32);
      o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]);
    }
    return d.map(point => ({ latitude: point[0], longitude: point[1] }));
  };

  const handleZoomIn = () => {
    if (mapRef && currentLocation) {
      mapRef.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const handleZoomOut = () => {
    if (mapRef && currentLocation) {
      mapRef.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    }
  };

  const handleStartNavigation = () => {
    if (mapRef && currentLocation) {
      mapRef.fitToCoordinates([...waypoints, OKCONTRACTING_COORDINATES], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });

      // Delay to wait for map animation to complete
      mapAnimationTimeout.current = setTimeout(() => {
        mapRef.getCamera().then((camera) => {
          const zoom = Math.min(camera.zoom, 17); // Limit maximum zoom level
          mapRef.animateCamera({
            center: {
              latitude: (currentLocation.latitude + OKCONTRACTING_COORDINATES.latitude) / 2,
              longitude: (currentLocation.longitude + OKCONTRACTING_COORDINATES.longitude) / 2,
            },
            zoom,
          });
        });
      }, 1000); // Adjust delay as needed
    }
  };

  const handlePolylinePress = (index) => {
    setSelectedRouteIndex(index);
  };

  return (
    <View style={{ flex: 1 }}>
      {currentLocation && (
        <>
          <MapView
            ref={(ref) => setMapRef(ref)}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={currentLocation} title="Current Location">
              {/* <Image source={startLocationIcon} style={{ width: 32, height: 32 }} /> */}
            </Marker>

            <Marker coordinate={OKCONTRACTING_COORDINATES} title="W Middlefield Road, Okcontracting">
              {/* <Image source={endLocationIcon} style={{ width: 32, height: 32 }} /> */}
            </Marker>

            {waypoints.map((waypoint, index) => (
              <Marker key={index} coordinate={waypoint} title={`Waypoint ${index + 1}`} />
            ))}

            {routes.map((route, index) => (
              <Polyline
                key={index}
                coordinates={route.coordinates}
                strokeColor={index === selectedRouteIndex ? 'blue' : 'gray'}
                strokeWidth={index === selectedRouteIndex ? 5 : 3}
                tappable
                onPress={() => handlePolylinePress(index)}
              />
            ))}
          </MapView>

          {selectedRouteIndex !== null && routes[selectedRouteIndex] && (
            <View style={{ position: 'absolute', top: 10, left: 10, backgroundColor: 'white', padding: 5, borderRadius: 5 }}>
              <Text>{routes[selectedRouteIndex].summary}</Text>
              <Text>Distance: {routes[selectedRouteIndex].distance}</Text>
              <Text>Duration: {routes[selectedRouteIndex].duration}</Text>
            </View>
          )}

          <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
            <Text>Latitude: {currentLocation.latitude.toFixed(6)}</Text>
            <Text>Longitude: {currentLocation.longitude.toFixed(6)}</Text>
          </View>

          <View style={{ position: 'absolute', top: 20, right: 20 }}>
            <TouchableOpacity onPress={handleZoomIn}>
              <Icon name="plus" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleZoomOut}>
              <Icon name="minus" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
            <TouchableOpacity onPress={handleStartNavigation} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Start Navigation</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default MapViewLayout;
