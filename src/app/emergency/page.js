'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  Paper,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  InputAdornment,
  IconButton,
  useTheme,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Fab,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Emergency,
  LocalPolice,
  MedicalServices,
  FireTruck,
  Psychology,
  ChildCare,
  VolunteerActivism,
  Phone as PhoneIcon,
  LocationOn,
  Share,
  Warning,
  CheckCircle,
  Info,
  Send,
  Close,
  MyLocation,
  Navigation,
  Speed,
  Shield,
  Person,
  AccessTime,
  Language,
  Hearing,
  Accessible,
  VolumeUp,
  Sms,
  Email,
  WhatsApp,
  Telegram,
  Add,
  Remove,
  PlayArrow,
  Pause,
  Stop,
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  PhotoCamera,
  FlashOn,
  FlashOff,
  Report,
  Security,
  ExpandMore,
  CallEnd,
  Vibration,
  NotificationsActive,
  NotificationsOff,
  Brightness4,
  BrightnessHigh,
  VolumeOff,
  Settings,
  Help,
  Map,
  Directions,
  Home,
  Work,
  School,
  LocalHospital,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EmergencyPage() {
  const theme = useTheme();
  const [sosActive, setSosActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [quickCallDialogOpen, setQuickCallDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [sosDialogOpen, setSosDialogOpen] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [flashlight, setFlashlight] = useState(false);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);

  // Emergency services data
  const emergencyServices = [
    {
      id: 'police',
      name: 'Police Emergency',
      number: '999',
      secondary: '911',
      description: 'Immediate police response for crimes, violence, and threats',
      icon: <LocalPolice />,
      color: 'error',
      priority: 'critical'
    },
    {
      id: 'medical',
      name: 'Medical Emergency',
      number: '999',
      secondary: '0722 206 061',
      description: 'Ambulance and medical emergency response',
      icon: <MedicalServices />,
      color: 'success',
      priority: 'critical'
    },
    {
      id: 'fire',
      name: 'Fire Emergency',
      number: '999',
      secondary: '0722 206 062',
      description: 'Fire department emergency response',
      icon: <FireTruck />,
      color: 'warning',
      priority: 'critical'
    },
    {
      id: 'gvrc',
      name: 'Gender Violence Recovery',
      number: '0719 638 006',
      secondary: '1195',
      description: '24/7 support for gender-based violence',
      icon: <Psychology />,
      color: 'secondary',
      priority: 'high'
    },
    {
      id: 'childline',
      name: 'Childline Kenya',
      number: '116',
      secondary: '0800 720 553',
      description: 'Child protection and support services',
      icon: <ChildCare />,
      color: 'primary',
      priority: 'high'
    },
    {
      id: 'redcross',
      name: 'Kenya Red Cross',
      number: '1199',
      secondary: '0715 073 499',
      description: 'Emergency assistance and disaster response',
      icon: <VolunteerActivism />,
      color: 'info',
      priority: 'medium'
    }
  ];

  // Quick actions data
  const quickActions = [
    {
      id: 'location',
      name: 'Share Location',
      description: 'Share your current location with emergency contacts',
      icon: <MyLocation />,
      action: () => getCurrentLocation()
    },
    {
      id: 'flashlight',
      name: 'Emergency Flashlight',
      description: 'Turn on phone flashlight for visibility',
      icon: flashlight ? <FlashOff /> : <FlashOn />,
      action: () => toggleFlashlight()
    },
    {
      id: 'sound',
      name: 'Emergency Sound',
      description: 'Play loud emergency sound to attract attention',
      icon: sound ? <VolumeOff /> : <VolumeUp />,
      action: () => toggleSound()
    },
    {
      id: 'silent',
      name: 'Silent Mode',
      description: 'Activate silent emergency mode for discrete help',
      icon: <NotificationsOff />,
      action: () => activateSilentMode()
    }
  ];

  // Emergency guidance steps
  const emergencySteps = [
    {
      label: 'Assess the Situation',
      description: 'Stay calm and quickly assess if you are in immediate danger',
      details: 'Look around for exits, safe spaces, and potential threats. Your safety is the top priority.'
    },
    {
      label: 'Call for Help',
      description: 'Contact emergency services immediately',
      details: 'Call 999 for police, medical, or fire emergencies. Be ready to provide your location and situation details.'
    },
    {
      label: 'Share Your Location',
      description: 'Make sure others know where you are',
      details: 'Share your GPS location with trusted contacts. Use the location sharing feature in this app.'
    },
    {
      label: 'Follow Instructions',
      description: 'Listen carefully to emergency dispatcher instructions',
      details: 'Stay on the line unless instructed otherwise. Follow any safety instructions given by authorities.'
    },
    {
      label: 'Stay Safe',
      description: 'Remain in a safe location until help arrives',
      details: 'If possible, move to a secure location. Keep emergency contacts informed of your status.'
    }
  ];

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setLocationLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported');
      setLocationLoading(false);
    }
  };

  const toggleFlashlight = () => {
    setFlashlight(!flashlight);
    // In a real app, this would control the device flashlight
  };

  const toggleSound = () => {
    setSound(!sound);
    // In a real app, this would play/stop emergency sounds
  };

  const activateSilentMode = () => {
    setEmergencyMode(true);
    // In a real app, this would send silent alerts to emergency contacts
  };

  const activateSOS = () => {
    setSosActive(true);
    setSosDialogOpen(true);
    getCurrentLocation();
    // In a real app, this would trigger multiple emergency protocols
  };

  const EmergencyServiceCard = ({ service }) => (
    <Card sx={{ 
      height: '100%',
      position: 'relative',
      '&:hover': { 
        boxShadow: theme.shadows[8],
        transform: 'translateY(-2px)'
      },
      transition: 'all 0.3s ease',
      border: service.priority === 'critical' ? `2px solid ${theme.palette.error.main}` : 'none'
    }}>
      {service.priority === 'critical' && (
        <Chip 
          label="CRITICAL" 
          color="error" 
          size="small" 
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        />
      )}
      
      <CardContent sx={{ textAlign: 'center', pb: 1 }}>
        <Box sx={{ color: `${service.color}.main`, mb: 2 }}>
          {service.icon}
        </Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          {service.name}
        </Typography>
        <Typography variant="h3" color={`${service.color}.main`} fontWeight={700} sx={{ mb: 1 }}>
          {service.number}
        </Typography>
        {service.secondary && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Alt: {service.secondary}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {service.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center', pt: 0 }}>
        <Button 
          variant="contained" 
          color={service.color}
          fullWidth
          size="large"
          startIcon={<PhoneIcon />}
          href={`tel:${service.number}`}
          sx={{ mb: 1 }}
        >
          Call Now
        </Button>
      </CardActions>
    </Card>
  );

  const QuickActionCard = ({ action }) => (
    <Card sx={{ 
      textAlign: 'center',
      '&:hover': { 
        boxShadow: theme.shadows[4],
        transform: 'scale(1.02)'
      },
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }}>
      <CardContent onClick={action.action}>
        <Box sx={{ color: 'primary.main', mb: 2, fontSize: 40 }}>
          {action.icon}
        </Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          {action.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {action.description}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* SOS Floating Action Button */}
      <Fab
        color="error"
        size="large"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          animation: sosActive ? 'pulse 1s infinite' : 'none',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' },
            '100%': { transform: 'scale(1)' }
          }
        }}
        onClick={activateSOS}
      >
        <Emergency sx={{ fontSize: 32 }} />
      </Fab>

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Emergency sx={{ mr: 2, fontSize: 48, color: 'error.main' }} />
          Dharura
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Emergency Response Center
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.7 }}>
          Quick access to emergency services, safety tools, and immediate assistance. 
          Your safety is our priority - help is just one tap away.
        </Typography>
      </Box>

      {/* Emergency Alert */}
      <Alert severity="error" sx={{ mb: 4 }}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          🆘 IN IMMEDIATE DANGER? CALL 999 NOW!
        </Typography>
        <Typography variant="body2">
          For life-threatening emergencies, call emergency services immediately. 
          This page provides additional support and resources.
        </Typography>
      </Alert>

      {/* Emergency Services Grid */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: 'error.main' }}>
        Emergency Services
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {emergencyServices.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <EmergencyServiceCard service={service} />
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Quick Emergency Actions
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.id}>
            <QuickActionCard action={action} />
          </Grid>
        ))}
      </Grid>

      {/* Location Status */}
      {location && (
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3, bgcolor: 'success.light' }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <LocationOn sx={{ mr: 1 }} />
            Your Current Location
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Latitude: {location.latitude.toFixed(6)}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Longitude: {location.longitude.toFixed(6)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Accuracy: ±{Math.round(location.accuracy)} meters
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" startIcon={<Share />} sx={{ mr: 2 }}>
              Share Location
            </Button>
            <Button variant="outlined" startIcon={<Navigation />}>
              Open in Maps
            </Button>
          </Box>
        </Paper>
      )}

      {/* Emergency Guidance */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Emergency Response Guide
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Stepper orientation="vertical">
          {emergencySteps.map((step, index) => (
            <Step key={index} active={true}>
              <StepLabel>
                <Typography variant="h6" fontWeight={600}>
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {step.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.details}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Safety Tips */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Safety Tips & Preparedness
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Shield sx={{ mr: 1, color: 'primary.main' }} />
              Personal Safety
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary="Always share your location with trusted contacts" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary="Keep emergency numbers easily accessible" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary="Trust your instincts and remove yourself from danger" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary="Stay calm and follow official instructions" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 1, color: 'secondary.main' }} />
              Emergency Contacts
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary="Set up emergency contacts in your phone" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary="Include family, friends, and workplace contacts" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary="Keep physical copies of important numbers" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary="Know your nearest hospital and police station" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* SOS Dialog */}
      <Dialog 
        open={sosDialogOpen} 
        onClose={() => setSosDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: 'error.main', color: 'white', textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Emergency sx={{ mr: 1, fontSize: 32 }} />
            SOS ACTIVATED
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress color="error" size={80} sx={{ mb: 3 }} />
          <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
            Emergency Response Initiated
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Your location is being shared with emergency contacts.
            Emergency services have been notified.
          </Typography>
          
          {location && (
            <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: 'grey.100' }}>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                Your Location:
              </Typography>
              <Typography variant="body2">
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </Typography>
            </Paper>
          )}
          
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Stay calm and wait for help to arrive. Keep your phone accessible.
            </Typography>
          </Alert>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            variant="contained" 
            color="error" 
            size="large"
            startIcon={<PhoneIcon />}
            href="tel:999"
            sx={{ mr: 2 }}
          >
            Call 999
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => setSosDialogOpen(false)}
          >
            Cancel SOS
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 