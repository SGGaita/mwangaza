'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Divider,
  Alert,
  Paper,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Schedule,
  Security,
  Verified,
  Close,
  Directions,
  Share,
  MyLocation,
  Layers,
  ZoomIn,
  ZoomOut,
  Fullscreen,
  Map as MapIcon,
  Warning,
  Refresh,
} from '@mui/icons-material';

// Kenya coordinates for default map center
const KENYA_CENTER = { lat: -1.2921, lng: 36.8219 };
const NAIROBI_CENTER = { lat: -1.2921, lng: 36.8219 };

export default function GoogleMap({ 
  locations = [], 
  center = NAIROBI_CENTER, 
  zoom = 11,
  height = 400,
  showControls = true,
  onLocationClick = null,
  markers = [],
  showSafeSpaces = true,
  showIncidents = false 
}) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapType, setMapType] = useState('roadmap');
  const [mapError, setMapError] = useState(false);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  // Check if Google Maps is available
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (typeof window !== 'undefined' && window.google && window.google.maps) {
        setIsGoogleMapsLoaded(true);
        setMapError(false);
      } else {
        setMapError(true);
        setIsGoogleMapsLoaded(false);
      }
    };

    // Check immediately
    checkGoogleMaps();

    // Also check after a delay in case the script is still loading
    const timer = setTimeout(checkGoogleMaps, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize Google Map
  useEffect(() => {
    if (!mapRef.current || map || !isGoogleMapsLoaded || mapError) return;

    try {
      // Initialize map
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeId: mapType,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });

      setMap(googleMap);
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
      setMapError(true);
    }
  }, [center, zoom, mapType, isGoogleMapsLoaded, mapError]);

  // Add markers when locations change
  useEffect(() => {
    if (!map || !locations.length || !isGoogleMapsLoaded) return;

    try {
      // Clear existing markers
      // Add new markers
      locations.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: location.coordinates,
          map,
          title: location.name,
          icon: getMarkerIcon(location.type),
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: createInfoWindowContent(location),
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          setSelectedLocation(location);
          if (onLocationClick) {
            onLocationClick(location);
          }
        });
      });
    } catch (error) {
      console.error('Error adding markers:', error);
    }
  }, [map, locations, onLocationClick, isGoogleMapsLoaded]);

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          
          if (map && isGoogleMapsLoaded) {
            map.setCenter(pos);
            map.setZoom(15);
            
            new window.google.maps.Marker({
              position: pos,
              map,
              title: 'Your Location',
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1976d2" width="24px" height="24px">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(32, 32),
              },
            });
          }
        },
        () => {
          console.log('Error: The Geolocation service failed.');
        }
      );
    }
  };

  // Get marker icon based on location type
  const getMarkerIcon = (type) => {
    const iconColor = getTypeColor(type);
    const iconSvg = getServiceIcon(type);
    
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 52" width="40px" height="52px">
          <!-- Map pin background -->
          <path d="M20 0C8.95 0 0 8.95 0 20c0 15 20 32 20 32s20-17 20-32C40 8.95 31.05 0 20 0z" fill="${iconColor}" stroke="#fff" stroke-width="2"/>
          <!-- Service icon -->
          <g transform="translate(8, 6) scale(0.6)">
            ${iconSvg}
          </g>
        </svg>
      `)}`,
      scaledSize: new window.google.maps.Size(40, 52),
      anchor: new window.google.maps.Point(20, 52),
    };
  };

  const getServiceIcon = (type) => {
    switch (type) {
      case 'community_center':
        return `
          <circle cx="9" cy="8" r="2.5" fill="white"/>
          <circle cx="15" cy="8" r="2.5" fill="white"/>
          <path d="M6 13c0-1.5 1.5-3 3-3s3 1.5 3 3v5H6v-5z" fill="white"/>
          <path d="M12 13c0-1.5 1.5-3 3-3s3 1.5 3 3v5h-6v-5z" fill="white"/>
          <circle cx="9" cy="8" r="1.5" fill="${getTypeColor('community_center')}"/>
          <circle cx="15" cy="8" r="1.5" fill="${getTypeColor('community_center')}"/>
        `;
      case 'religious_center':
        return `
          <rect x="6" y="10" width="12" height="8" rx="1" fill="white"/>
          <path d="M6 10L12 4L18 10z" fill="white"/>
          <path d="M12 2v6M10 4h4" stroke="${getTypeColor('religious_center')}" stroke-width="2" fill="none"/>
          <path d="M10 14h4v2h-4z" fill="white"/>
        `;
      case 'police_station':
        return `
          <path d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z" fill="white" stroke="${getTypeColor('police_station')}" stroke-width="1"/>
          <path d="M12 6L8 8v4c0 2.5 1.5 4.5 4 5 2.5-0.5 4-2.5 4-5V8l-4-2z" fill="${getTypeColor('police_station')}"/>
          <circle cx="12" cy="11" r="1.5" fill="white"/>
        `;
      case 'hospital':
        return `
          <rect x="6" y="6" width="12" height="12" rx="2" fill="white"/>
          <path d="M12 8v8M8 12h8" stroke="${getTypeColor('hospital')}" stroke-width="3"/>
        `;
      case 'school':
        return `
          <rect x="4" y="8" width="16" height="10" rx="1" fill="white"/>
          <path d="M4 8l8-4 8 4" stroke="white" stroke-width="2" fill="white"/>
          <circle cx="12" cy="13" r="2" fill="${getTypeColor('school')}"/>
          <path d="M8 16h8" stroke="${getTypeColor('school')}" stroke-width="1"/>
        `;
      case 'government_office':
        return `
          <rect x="4" y="10" width="16" height="10" fill="white"/>
          <path d="M4 10h16M6 6h12l-2 4H8z" fill="white"/>
          <path d="M8 14v4M12 14v4M16 14v4" stroke="${getTypeColor('government_office')}" stroke-width="1.5"/>
        `;
      case 'safe_space':
        return `
          <circle cx="12" cy="12" r="8" fill="white"/>
          <path d="M12 4C8 4 4 8 4 12s8 8 8 8 8-4 8-8-4-8-8-8z" fill="${getTypeColor('safe_space')}"/>
          <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" fill="none"/>
        `;
      case 'incident':
        return `
          <circle cx="12" cy="12" r="8" fill="white"/>
          <path d="M12 4C8 4 4 8 4 12s8 8 8 8 8-4 8-8-4-8-8-8z" fill="${getTypeColor('incident')}"/>
          <path d="M11 6h2v6h-2zM11 14h2v2h-2z" fill="white"/>
        `;
      case 'hotspot':
        return `
          <circle cx="12" cy="12" r="10" fill="white"/>
          <circle cx="12" cy="12" r="8" fill="${getTypeColor('hotspot')}" opacity="0.8"/>
          <circle cx="12" cy="12" r="5" fill="white"/>
          <circle cx="12" cy="12" r="3" fill="${getTypeColor('hotspot')}"/>
          <circle cx="12" cy="12" r="1" fill="white"/>
        `;
      default:
        return `
          <circle cx="12" cy="12" r="6" fill="white"/>
          <path d="M12 8v8M8 12h8" stroke="${getTypeColor(type)}" stroke-width="2"/>
        `;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'community_center': return '#4caf50';
      case 'police_station': return '#2196f3';
      case 'hospital': return '#f44336';
      case 'religious_center': return '#9c27b0';
      case 'school': return '#ff9800';
      case 'government_office': return '#607d8b';
      case 'safe_space': return '#4caf50';
      case 'incident': return '#d32f2f';
      case 'hotspot': return '#ff5722';
      default: return '#757575';
    }
  };

  const createInfoWindowContent = (location) => {
    return `
      <div style="max-width: 250px; padding: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #1976d2;">${location.name}</h3>
        <p style="margin: 0 0 8px 0; color: #666;">${location.description || location.address}</p>
        ${location.verified ? '<span style="color: #4caf50; font-size: 12px;">✓ Verified</span>' : ''}
        ${location.rating ? `<div style="margin: 4px 0;">Rating: ${'★'.repeat(Math.floor(location.rating))} (${location.rating})</div>` : ''}
        <div style="margin-top: 8px;">
          <button onclick="window.open('https://maps.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}', '_blank')" 
                  style="background: #1976d2; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">
            Get Directions
          </button>
        </div>
      </div>
    `;
  };

  // Fallback UI when Google Maps is not available
  const FallbackMapView = () => (
    <Paper
      elevation={2}
      sx={{
        height: height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        backgroundImage: `
          linear-gradient(45deg, #ccc 25%, transparent 25%), 
          linear-gradient(-45deg, #ccc 25%, transparent 25%), 
          linear-gradient(45deg, transparent 75%, #ccc 75%), 
          linear-gradient(-45deg, transparent 75%, #ccc 75%)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        position: 'relative',
      }}
    >
      <Alert severity="warning" sx={{ mb: 2, mx: 2 }}>
        <Typography variant="body2">
          Google Maps is not available. Please configure your API key to enable map functionality.
        </Typography>
      </Alert>
      
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <MapIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Map View Unavailable
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Location data is shown in list format below
        </Typography>
        
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={() => window.location.reload()}
        >
          Retry Loading Map
        </Button>
      </Box>

      {/* Show locations as a list overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          maxHeight: '200px',
          overflow: 'auto',
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Available Locations ({locations.length})
        </Typography>
        {locations.slice(0, 3).map((location, index) => (
          <Card key={index} sx={{ mb: 1, cursor: 'pointer' }} onClick={() => {
            setSelectedLocation(location);
            setDialogOpen(true);
            if (onLocationClick) onLocationClick(location);
          }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1, color: getTypeColor(location.type) }} />
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {location.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {location.location}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
        {locations.length > 3 && (
          <Typography variant="caption" color="text.secondary">
            ... and {locations.length - 3} more locations
          </Typography>
        )}
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Map Container or Fallback */}
      {mapError || !isGoogleMapsLoaded ? (
        <FallbackMapView />
      ) : (
        <Box 
          ref={mapRef}
          sx={{ 
            height: height,
            width: '100%',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        />
      )}

      {/* Map Controls - only show if map is working */}
      {showControls && !mapError && isGoogleMapsLoaded && (
        <Card 
          elevation={3}
          sx={{ 
            position: 'absolute',
            top: 16,
            right: 16,
            p: 1,
            minWidth: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <IconButton 
              size="small" 
              onClick={getCurrentLocation}
              title="Get my location"
            >
              <MyLocation />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')}
              title="Toggle map type"
            >
              <Layers />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => map && map.setZoom(map.getZoom() + 1)}
              title="Zoom in"
            >
              <ZoomIn />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => map && map.setZoom(map.getZoom() - 1)}
              title="Zoom out"
            >
              <ZoomOut />
            </IconButton>
          </Box>
        </Card>
      )}

      {/* Legend */}
      <Card 
        elevation={3}
        sx={{ 
          position: 'absolute',
          bottom: 16,
          left: 16,
          p: 2,
          maxWidth: 220,
        }}
      >
        <Typography variant="caption" fontWeight={600} sx={{ mb: 1, display: 'block' }}>
          Map Legend
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn sx={{ fontSize: 16, color: '#4caf50' }} />
            <Typography variant="caption">Community Centers</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn sx={{ fontSize: 16, color: '#9c27b0' }} />
            <Typography variant="caption">Religious Centers</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn sx={{ fontSize: 16, color: '#2196f3' }} />
            <Typography variant="caption">Police Stations</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn sx={{ fontSize: 16, color: '#f44336' }} />
            <Typography variant="caption">Medical Centers</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn sx={{ fontSize: 16, color: '#ff9800' }} />
            <Typography variant="caption">Schools</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn sx={{ fontSize: 16, color: '#607d8b' }} />
            <Typography variant="caption">Government Offices</Typography>
          </Box>
          {showIncidents && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 16, color: '#d32f2f' }} />
                <Typography variant="caption">Incident Reports</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 16, color: '#ff5722' }} />
                <Typography variant="caption">Risk Hotspots</Typography>
              </Box>
            </>
          )}
        </Box>
      </Card>

      {/* Location Details Dialog */}
      <Dialog 
        open={dialogOpen || !!selectedLocation} 
        onClose={() => {
          setDialogOpen(false);
          setSelectedLocation(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        {selectedLocation && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{selectedLocation.name}</Typography>
                <IconButton onClick={() => {
                  setDialogOpen(false);
                  setSelectedLocation(null);
                }}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Chip 
                  label={selectedLocation.category}
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                />
                {selectedLocation.verified && (
                  <Chip 
                    label="Verified"
                    color="success"
                    size="small"
                    icon={<Verified />}
                  />
                )}
              </Box>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedLocation.description}
              </Typography>

              {selectedLocation.rating && (
                <Box sx={{ mb: 2 }}>
                  <Rating value={selectedLocation.rating} readOnly size="small" />
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    ({selectedLocation.reviews} reviews)
                  </Typography>
                </Box>
              )}

              {selectedLocation.services && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Services:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedLocation.services.map((service, index) => (
                      <Chip key={index} label={service} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              )}

              {selectedLocation.contact && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Contact:</Typography>
                  <List dense>
                    {selectedLocation.contact.phone && (
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Phone />
                        </ListItemIcon>
                        <ListItemText primary={selectedLocation.contact.phone} />
                      </ListItem>
                    )}
                    {selectedLocation.contact.hours && (
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Schedule />
                        </ListItemIcon>
                        <ListItemText primary={selectedLocation.contact.hours} />
                      </ListItem>
                    )}
                  </List>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => window.open(
                  `https://maps.google.com/maps/dir/?api=1&destination=${selectedLocation.coordinates.lat},${selectedLocation.coordinates.lng}`,
                  '_blank'
                )}
                startIcon={<Directions />}
              >
                Get Directions
              </Button>
              <Button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: selectedLocation.name,
                      text: selectedLocation.description,
                      url: window.location.href
                    });
                  }
                }}
                startIcon={<Share />}
              >
                Share
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
} 