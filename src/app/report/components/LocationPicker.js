'use client';

import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
  Paper,
  FormControlLabel,
  Switch,
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  LocationOn,
  MyLocation,
  GpsFixed,
  Warning,
  Info,
  Map as MapIcon,
  Search,
  Place,
} from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import GoogleMap from '../../components/GoogleMap';

export default function LocationPicker({ onLocationSelect, initialData = {} }) {
  const [locationData, setLocationData] = useState({
    useGPS: false,
    coordinates: null,
    address: '',
    nearestLandmark: '',
    accuracyLevel: 'approximate',
    publicLocation: false,
    description: '',
    ...initialData
  });
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: -1.2921, lng: 36.8219 }); // Nairobi center

  // Get user's current location
  const getCurrentLocation = () => {
    setGpsLoading(true);
    setGpsError('');

    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by this browser.');
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        setLocationData(prev => ({
          ...prev,
          coordinates: coords,
          useGPS: true
        }));
        
        setMapCenter(coords);
        setSelectedLocation(coords);
        
        // Reverse geocoding to get address
        try {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: coords }, (results, status) => {
            if (status === 'OK' && results[0]) {
              setLocationData(prev => ({
                ...prev,
                address: results[0].formatted_address
              }));
            }
          });
        } catch (error) {
          console.log('Geocoding error:', error);
        }
        
        setGpsLoading(false);
      },
      (error) => {
        setGpsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGpsError('Location access denied by user.');
            break;
          case error.POSITION_UNAVAILABLE:
            setGpsError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setGpsError('Location request timed out.');
            break;
          default:
            setGpsError('An unknown error occurred while retrieving location.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Handle map click for manual location selection
  const handleMapClick = (location) => {
    setSelectedLocation(location.coordinates);
    setLocationData(prev => ({
      ...prev,
      coordinates: location.coordinates,
      useGPS: false
    }));

    // Reverse geocoding
    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: location.coordinates }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setLocationData(prev => ({
            ...prev,
            address: results[0].formatted_address
          }));
        }
      });
    } catch (error) {
      console.log('Geocoding error:', error);
    }
  };

  // Search for a location
  const handleAddressSearch = (address) => {
    if (!address.trim()) return;

    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          const coords = { lat: location.lat(), lng: location.lng() };
          
          setSelectedLocation(coords);
          setMapCenter(coords);
          setLocationData(prev => ({
            ...prev,
            coordinates: coords,
            address: results[0].formatted_address,
            useGPS: false
          }));
        } else {
          setGpsError('Location not found. Please try a different address.');
        }
      });
    } catch (error) {
      setGpsError('Error searching for location.');
    }
  };

  // Update parent component
  useEffect(() => {
    if (onLocationSelect) {
      onLocationSelect(locationData);
    }
  }, [locationData, onLocationSelect]);

  const handleInputChange = (field, value) => {
    setLocationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
        Incident Location
      </Typography>

      {/* GPS and Manual Location */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <GpsFixed sx={{ mr: 1 }} />
                GPS Location
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Use your device's GPS to automatically detect the incident location.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                startIcon={<MyLocation />}
                onClick={getCurrentLocation}
                disabled={gpsLoading}
                sx={{ mb: 2 }}
              >
                {gpsLoading ? 'Getting Location...' : 'Get My Current Location'}
              </Button>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={locationData.useGPS}
                    onChange={(e) => handleInputChange('useGPS', e.target.checked)}
                  />
                }
                label="Use GPS coordinates"
              />
              
              {locationData.coordinates && locationData.useGPS && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                  <Typography variant="body2" color="success.contrastText">
                    <strong>GPS Coordinates:</strong><br />
                    Lat: {locationData.coordinates.lat.toFixed(6)}<br />
                    Lng: {locationData.coordinates.lng.toFixed(6)}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Search sx={{ mr: 1 }} />
                Manual Search
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Search for a location or click on the map to select manually.
              </Typography>
              <TextField
                fullWidth
                label="Search Address or Landmark"
                value={locationData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddressSearch(locationData.address);
                  }
                }}
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Search />}
                onClick={() => handleAddressSearch(locationData.address)}
              >
                Search Location
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Error Display */}
      {gpsError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {gpsError}
        </Alert>
      )}

      {/* Interactive Map */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <MapIcon sx={{ mr: 1 }} />
          Interactive Location Map
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Click on the map to select the exact incident location.
        </Typography>

        <GoogleMap
          locations={selectedLocation ? [{
            id: 'selected',
            name: 'Incident Location',
            coordinates: selectedLocation,
            type: 'incident',
            description: 'Selected incident location'
          }] : []}
          center={mapCenter}
          zoom={13}
          height={400}
          showControls={true}
          showSafeSpaces={false}
          showIncidents={true}
          onLocationClick={handleMapClick}
        />

        {selectedLocation && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
            <Typography variant="body2" color="info.contrastText">
              <strong>Selected Location:</strong><br />
              {locationData.address || `${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}`}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Additional Location Details */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Additional Location Details
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nearest Landmark"
              value={locationData.nearestLandmark}
              onChange={(e) => handleInputChange('nearestLandmark', e.target.value)}
              placeholder="e.g., Near Westgate Mall"
              sx={{ mb: 2 }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Location Accuracy"
              value={locationData.accuracyLevel}
              onChange={(e) => handleInputChange('accuracyLevel', e.target.value)}
              SelectProps={{ native: true }}
              sx={{ mb: 2 }}
            >
              <option value="exact">Exact Location</option>
              <option value="approximate">Approximate Area</option>
              <option value="general">General Vicinity</option>
            </TextField>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Location Description"
              value={locationData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Provide additional details about the location..."
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <FormControlLabel
          control={
            <Switch
              checked={locationData.publicLocation}
              onChange={(e) => handleInputChange('publicLocation', e.target.checked)}
            />
          }
          label="This is a public location (visible to others)"
        />
      </Paper>

      {/* Privacy Notice */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Privacy Notice:</strong> Location data is encrypted and only used for incident documentation. 
          You can choose to keep location details private or share them to help build a comprehensive incident database.
        </Typography>
      </Alert>

      {/* Location Summary */}
      {locationData.coordinates && (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Location Summary
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><Place /></ListItemIcon>
              <ListItemText
                primary="Address"
                secondary={locationData.address || 'No address available'}
              />
            </ListItem>
            {locationData.nearestLandmark && (
              <ListItem>
                <ListItemIcon><LocationOn /></ListItemIcon>
                <ListItemText
                  primary="Nearest Landmark"
                  secondary={locationData.nearestLandmark}
                />
              </ListItem>
            )}
            <ListItem>
              <ListItemIcon><Info /></ListItemIcon>
              <ListItemText
                primary="Accuracy Level"
                secondary={locationData.accuracyLevel}
              />
            </ListItem>
          </List>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            {locationData.useGPS && (
              <Chip label="GPS Location" color="success" size="small" />
            )}
            {locationData.publicLocation && (
              <Chip label="Public Location" color="info" size="small" />
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
} 