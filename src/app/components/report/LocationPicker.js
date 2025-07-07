'use client';

import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Alert,
  Chip,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  LocationOn,
  MyLocation,
  Map,
  GpsFixed,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

export function LocationPicker({ location, onChange }) {
  const [locationData, setLocationData] = useState({
    lat: null,
    lng: null,
    address: '',
    accuracy: null,
    useCurrentLocation: false,
    ...location,
  });

  const [getting, setGetting] = useState(false);

  useEffect(() => {
    onChange(locationData);
  }, [locationData, onChange]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setGetting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocationData = {
          ...locationData,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          useCurrentLocation: true,
        };
        setLocationData(newLocationData);
        
        // Reverse geocode to get address (simulated)
        reverseGeocode(position.coords.latitude, position.coords.longitude);
        setGetting(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enter manually.');
        setGetting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const reverseGeocode = async (lat, lng) => {
    // Simulate reverse geocoding (in real app, use a geocoding service)
    const simulatedAddress = `Near ${lat.toFixed(4)}, ${lng.toFixed(4)}, Nairobi, Kenya`;
    setLocationData(prev => ({
      ...prev,
      address: simulatedAddress,
    }));
  };

  const handleManualLocation = (field, value) => {
    setLocationData(prev => ({
      ...prev,
      [field]: value,
      useCurrentLocation: false,
    }));
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Incident Location
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          📍 Location Privacy Options
        </Typography>
        <Typography variant="body2">
          • Use GPS for precise location (recommended for evidence)<br/>
          • Enter approximate area if exact location is sensitive<br/>
          • Location data is encrypted and only used for incident mapping
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Current Location Option */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MyLocation sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Use Current Location
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Automatically detect your current GPS coordinates
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<GpsFixed />}
                onClick={getCurrentLocation}
                disabled={getting}
                sx={{ minWidth: 140 }}
              >
                {getting ? 'Getting...' : 'Get Location'}
              </Button>
            </Box>

            {locationData.lat && locationData.lng && (
              <Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    size="small"
                    icon={<LocationOn />}
                    label={`${locationData.lat.toFixed(6)}, ${locationData.lng.toFixed(6)}`}
                    color="success"
                  />
                  {locationData.accuracy && (
                    <Chip
                      size="small"
                      label={`±${Math.round(locationData.accuracy)}m accuracy`}
                      color="info"
                      variant="outlined"
                    />
                  )}
                </Box>
                
                {locationData.address && (
                  <Typography variant="body2" color="text.secondary">
                    📍 {locationData.address}
                  </Typography>
                )}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Manual Location Entry */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Map sx={{ mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Manual Location Entry
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter location details manually
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address or Area Description"
                  value={locationData.address}
                  onChange={(e) => handleManualLocation('address', e.target.value)}
                  placeholder="e.g., Near CBD, Nairobi or specific street address"
                  multiline
                  rows={2}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Latitude (Optional)"
                  type="number"
                  value={locationData.lat || ''}
                  onChange={(e) => handleManualLocation('lat', parseFloat(e.target.value) || null)}
                  placeholder="e.g., -1.2921"
                  inputProps={{
                    step: 'any',
                    min: -90,
                    max: 90,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Longitude (Optional)"
                  type="number"
                  value={locationData.lng || ''}
                  onChange={(e) => handleManualLocation('lng', parseFloat(e.target.value) || null)}
                  placeholder="e.g., 36.8219"
                  inputProps={{
                    step: 'any',
                    min: -180,
                    max: 180,
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Location Summary */}
        {(locationData.address || (locationData.lat && locationData.lng)) && (
          <Grid item xs={12}>
            <Alert severity="success">
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                ✅ Location Set
              </Typography>
              <Typography variant="body2">
                {locationData.address && `Address: ${locationData.address}`}
                {locationData.lat && locationData.lng && (
                  <>
                    <br />
                    Coordinates: {locationData.lat.toFixed(6)}, {locationData.lng.toFixed(6)}
                  </>
                )}
              </Typography>
            </Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
} 