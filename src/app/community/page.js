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
  Rating,
  Slider,
  Switch,
  FormControlLabel,
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineDot,
  TimelineConnector,
  TimelineSeparator,
} from '@mui/material';
import {
  Search,
  Person,
  LocationOn,
  CalendarToday,
  Phone,
  Share,
  Print,
  Download,
  Add,
  FilterList,
  Visibility,
  Campaign,
  Family,
  Emergency,
  PhotoCamera,
  Description,
  Send,
  Close,
  Warning,
  CheckCircle,
  AccessTime,
  Security,
  Shield,
  Group,
  Home,
  School,
  LocalHospital,
  Church,
  Store,
  Restaurant,
  DirectionsBus,
  DirectionsWalk,
  Map,
  MyLocation,
  Layers,
  ExpandMore,
  Info,
  ContactMail,
  Phone as PhoneIcon,
  Email,
  Language,
  Facebook,
  Twitter,
  Instagram,
  Public,
  SupervisorAccount,
  Groups,
  Balance,
  MonetizationOn,
  NotificationsActive,
  Verified,
  Report,
  SOS,
  LocalPolice,
  MedicalServices,
  FireTruck,
  Psychology,
  VolunteerActivism,
  SafetyCheck,
  GpsFixed,
  Navigation,
  Place,
  BusinessCenter,
  AccountBalance,
  MenuBook,
  Work,
  Apartment,
  NightShelter,
  Healing,
  SupportAgent,
  LocalLibrary,
  FitnessCenter,
  ChildCare,
  Elderly,
  Accessible,
  WheelchairPickup,
  Hearing,
  VisibilityOff,
  RecordVoiceOver,
  Support,
  HandHeart,
} from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';
import GoogleMap from '../components/GoogleMap';

export default function CommunityPage() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [radiusFilter, setRadiusFilter] = useState(5);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [mapView, setMapView] = useState('all');
  const [emergencyDialogOpen, setEmergencyDialogOpen] = useState(false);
  const [reportSpaceDialogOpen, setReportSpaceDialogOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Sample safe spaces data
  const safeSpaces = [
    {
      id: 'SS001',
      name: 'Uhuru Park Community Center',
      type: 'community_center',
      category: 'Public Space',
      location: 'Central Business District, Nairobi',
      coordinates: { lat: -1.2921, lng: 36.8219 },
      address: 'Uhuru Highway, Nairobi',
      verified: true,
      rating: 4.5,
      reviews: 127,
      description: 'Large community center with 24/7 security, multiple emergency exits, and trained staff.',
      services: ['Security', '24/7 Access', 'Emergency Phone', 'First Aid', 'Rest Areas'],
      contact: {
        phone: '0711 234 567',
        email: 'info@uhurucc.org',
        hours: '24/7'
      },
      safetyFeatures: [
        'CCTV Surveillance',
        'Security Guards',
        'Emergency Alarm System',
        'Well-lit Areas',
        'Multiple Exits'
      ],
      accessibility: ['Wheelchair Accessible', 'Sign Language Support'],
      lastUpdated: '2024-01-30',
      reportedBy: 'Community Volunteer',
      distance: 1.2
    },
    {
      id: 'SS002',
      name: 'St. Mary\'s Church Sanctuary',
      type: 'religious_center',
      category: 'Religious Center',
      location: 'Karen, Nairobi',
      coordinates: { lat: -1.3197, lng: 36.6856 },
      address: 'Karen Road, Karen',
      verified: true,
      rating: 4.8,
      reviews: 89,
      description: 'Peaceful church sanctuary offering refuge and counseling services.',
      services: ['Sanctuary', 'Counseling', 'Prayer Support', 'Food Assistance', 'Safe Shelter'],
      contact: {
        phone: '0722 345 678',
        email: 'sanctuary@stmarys.ke',
        hours: '6:00 AM - 10:00 PM'
      },
      safetyFeatures: [
        'Sacred Sanctuary',
        'Trained Counselors',
        'Community Support',
        'Confidential Services'
      ],
      accessibility: ['Wheelchair Accessible', 'Hearing Aid Compatible'],
      lastUpdated: '2024-01-28',
      reportedBy: 'Church Administrator',
      distance: 3.5
    },
    {
      id: 'SS003',
      name: 'Westgate Police Station',
      type: 'police_station',
      category: 'Law Enforcement',
      location: 'Westlands, Nairobi',
      coordinates: { lat: -1.2676, lng: 36.8072 },
      address: 'Waiyaki Way, Westlands',
      verified: true,
      rating: 3.9,
      reviews: 203,
      description: 'Main police station with victim support unit and emergency response.',
      services: ['Emergency Response', 'Victim Support', 'Legal Assistance', 'Safe Custody'],
      contact: {
        phone: '999',
        emergency: '911',
        hours: '24/7'
      },
      safetyFeatures: [
        'Armed Security',
        'Emergency Response',
        'Victim Support Unit',
        'Legal Protection'
      ],
      accessibility: ['Wheelchair Accessible'],
      lastUpdated: '2024-01-29',
      reportedBy: 'Police Administrator',
      distance: 0.8
    },
    {
      id: 'SS004',
      name: 'Nairobi Women\'s Hospital',
      type: 'hospital',
      category: 'Healthcare Facility',
      location: 'Hurlingham, Nairobi',
      coordinates: { lat: -1.2921, lng: 36.7833 },
      address: 'Argwings Kodhek Road, Hurlingham',
      verified: true,
      rating: 4.6,
      reviews: 156,
      description: 'Specialized healthcare facility with emergency services and trauma counseling.',
      services: ['Emergency Care', 'Trauma Counseling', 'Medical Assistance', 'Safe Recovery'],
      contact: {
        phone: '0703 082 000',
        emergency: '0703 082 911',
        hours: '24/7'
      },
      safetyFeatures: [
        'Medical Emergency Care',
        'Trained Medical Staff',
        'Privacy Protection',
        'Psychological Support'
      ],
      accessibility: ['Wheelchair Accessible', 'Sign Language Support', 'Hearing Aid Compatible'],
      lastUpdated: '2024-01-30',
      reportedBy: 'Hospital Administrator',
      distance: 2.1
    },
    {
      id: 'SS005',
      name: 'Kibera Community Youth Center',
      type: 'community_center',
      category: 'Youth Center',
      location: 'Kibera, Nairobi',
      coordinates: { lat: -1.3133, lng: 36.7833 },
      address: 'Olympic Estate, Kibera',
      verified: true,
      rating: 4.3,
      reviews: 78,
      description: 'Youth-focused community center with mentorship and support programs.',
      services: ['Youth Programs', 'Mentorship', 'Safe Activities', 'Career Guidance'],
      contact: {
        phone: '0734 567 890',
        email: 'info@kiberayouth.org',
        hours: '8:00 AM - 8:00 PM'
      },
      safetyFeatures: [
        'Youth-Friendly Environment',
        'Trained Youth Workers',
        'Peer Support Groups',
        'Community Oversight'
      ],
      accessibility: ['Youth Accessible Programs'],
      lastUpdated: '2024-01-27',
      reportedBy: 'Youth Coordinator',
      distance: 4.2
    }
  ];

  // Emergency contacts data
  const emergencyContacts = [
    {
      service: 'Police Emergency',
      number: '999',
      secondary: '911',
      description: 'Immediate police response',
      icon: <LocalPolice />
    },
    {
      service: 'Medical Emergency',
      number: '999',
      secondary: '0722 206 061',
      description: 'Ambulance and medical emergency',
      icon: <MedicalServices />
    },
    {
      service: 'Fire Emergency',
      number: '999',
      secondary: '0722 206 062',
      description: 'Fire department emergency response',
      icon: <FireTruck />
    },
    {
      service: 'Gender Violence Recovery Centre',
      number: '0719 638 006',
      secondary: '1195',
      description: '24/7 support for gender-based violence',
      icon: <Psychology />
    },
    {
      service: 'Childline Kenya',
      number: '116',
      secondary: '0800 720 553',
      description: 'Child protection and support',
      icon: <ChildCare />
    },
    {
      service: 'Kenya Red Cross',
      number: '1199',
      secondary: '0715 073 499',
      description: 'Emergency assistance and support',
      icon: <VolunteerActivism />
    }
  ];

  // Community alerts data
  const communityAlerts = [
    {
      id: 'ALERT001',
      type: 'safety_warning',
      title: 'Increased Security Presence - CBD Area',
      location: 'Central Business District',
      severity: 'medium',
      timestamp: '2024-01-30T14:30:00Z',
      description: 'Enhanced security patrols in CBD following recent incidents. Citizens advised to remain vigilant.',
      reporter: 'Community Safety Officer',
      verified: true
    },
    {
      id: 'ALERT002',
      type: 'safe_space_update',
      title: 'New Safe Space - Eastleigh Community Hall',
      location: 'Eastleigh',
      severity: 'low',
      timestamp: '2024-01-30T10:15:00Z',
      description: 'Eastleigh Community Hall now verified as safe space with 24/7 access and security.',
      reporter: 'Community Volunteer',
      verified: true
    },
    {
      id: 'ALERT003',
      type: 'emergency_resource',
      title: 'Mobile Clinic Available - Mathare',
      location: 'Mathare',
      severity: 'medium',
      timestamp: '2024-01-29T16:45:00Z',
      description: 'Free mobile medical clinic available at Mathare Community Center until 6 PM.',
      reporter: 'Healthcare Volunteer',
      verified: true
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'community_center': return <Group />;
      case 'religious_center': return <Church />;
      case 'police_station': return <LocalPolice />;
      case 'hospital': return <LocalHospital />;
      case 'school': return <School />;
      case 'government_office': return <AccountBalance />;
      default: return <Security />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'community_center': return 'primary';
      case 'religious_center': return 'secondary';
      case 'police_station': return 'error';
      case 'hospital': return 'success';
      case 'school': return 'warning';
      case 'government_office': return 'info';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const filteredSpaces = safeSpaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         space.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || space.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = typeFilter === 'all' || space.type === typeFilter;
    const matchesRadius = space.distance <= radiusFilter;
    
    return matchesSearch && matchesLocation && matchesType && matchesRadius;
  });

  const SafeSpaceCard = ({ space }) => (
    <Card sx={{ 
      height: '100%', 
      '&:hover': { 
        boxShadow: theme.shadows[8],
        transform: 'translateY(-2px)'
      },
      transition: 'all 0.3s ease',
      position: 'relative'
    }}>
      {space.verified && (
        <Chip 
          label="VERIFIED" 
          color="success" 
          size="small" 
          icon={<Verified />}
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        />
      )}
      
      <CardContent>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Box sx={{ mr: 2 }}>
            {getTypeIcon(space.type)}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              {space.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {space.category}
            </Typography>
            <Chip 
              label={space.type.replace('_', ' ').toUpperCase()} 
              color={getTypeColor(space.type)} 
              size="small" 
              sx={{ mb: 2 }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={space.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {space.rating} ({space.reviews} reviews)
          </Typography>
        </Box>

        <List dense>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <LocationOn sx={{ fontSize: 16 }} />
            </ListItemIcon>
            <ListItemText 
              primary={space.location}
              secondary={`${space.distance} km away`}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <AccessTime sx={{ fontSize: 16 }} />
            </ListItemIcon>
            <ListItemText 
              primary={space.contact.hours}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <PhoneIcon sx={{ fontSize: 16 }} />
            </ListItemIcon>
            <ListItemText 
              primary={space.contact.phone}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        </List>

        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
          "{space.description}"
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Key Services:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {space.services.slice(0, 3).map((service, index) => (
              <Chip key={index} label={service} size="small" variant="outlined" />
            ))}
            {space.services.length > 3 && (
              <Chip label={`+${space.services.length - 3} more`} size="small" variant="outlined" />
            )}
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          onClick={() => setSelectedSpace(space)}
          startIcon={<Visibility />}
        >
          View Details
        </Button>
        <Box>
          <IconButton size="small" color="primary" href={`tel:${space.contact.phone}`}>
            <PhoneIcon />
          </IconButton>
          <IconButton size="small" color="primary">
            <Navigation />
          </IconButton>
          <IconButton size="small" color="primary">
            <Share />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );

  const EmergencyButton = ({ contact }) => (
    <Card sx={{ 
      textAlign: 'center', 
      p: 2,
      '&:hover': { 
        boxShadow: theme.shadows[4],
        transform: 'scale(1.02)'
      },
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }}>
      <Box sx={{ color: 'error.main', mb: 1 }}>
        {contact.icon}
      </Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
        {contact.service}
      </Typography>
      <Typography variant="h4" color="error.main" fontWeight={700} sx={{ mb: 1 }}>
        {contact.number}
      </Typography>
      {contact.secondary && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Alt: {contact.secondary}
        </Typography>
      )}
      <Typography variant="caption" color="text.secondary">
        {contact.description}
      </Typography>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield sx={{ mr: 2, fontSize: 48, color: 'success.main' }} />
          Ulinzi wa Jamii
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Community Protection & Safe Spaces Network
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.7 }}>
          Find verified safe spaces, connect with community protection networks, and access emergency resources. 
          Building safer communities through collective action and mutual support.
        </Typography>
      </Box>

      {/* Emergency Alert Banner */}
      <Alert severity="error" sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontWeight={600}>
            In immediate danger? Emergency services are available 24/7.
          </Typography>
          <Button 
            variant="contained" 
            color="error" 
            startIcon={<Emergency />}
            onClick={() => setEmergencyDialogOpen(true)}
            sx={{ ml: 2 }}
          >
            Emergency Contacts
          </Button>
        </Box>
      </Alert>

      {/* Main Content */}
      <Box sx={{ mt: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab 
            label="Safe Spaces Map" 
            icon={<Map />}
            iconPosition="start"
            sx={{ minHeight: 48 }}
          />
          <Tab 
            label="Community Watch" 
            icon={<Groups />}
            iconPosition="start"
            sx={{ minHeight: 48 }}
          />
          <Tab 
            label="Emergency Resources" 
            icon={<Emergency />}
            iconPosition="start"
            sx={{ minHeight: 48 }}
          />
        </Tabs>

        {/* Safe Spaces Map Tab */}
        {activeTab === 0 && (
          <Box sx={{ mt: 4 }}>
            {/* Map Section */}
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight={600}>
                  Interactive Safe Spaces Map
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    startIcon={<Add />}
                    onClick={() => setDetailsOpen(true)}
                  >
                    Add Location
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small"
                    startIcon={<MyLocation />}
                  >
                    My Location
                  </Button>
                </Box>
              </Box>

              {/* Google Map Component */}
              <GoogleMap
                locations={safeSpaces}
                center={{ lat: -1.2921, lng: 36.8219 }} // Nairobi center
                zoom={11}
                height={500}
                showControls={true}
                showSafeSpaces={true}
                showIncidents={false}
                onLocationClick={(location) => {
                  setSelectedSpace(location);
                  setDetailsOpen(true);
                }}
              />

              {/* Map Statistics */}
              <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
                    <Typography variant="h4" fontWeight={700} color="success.contrastText">
                      {safeSpaces.length}
                    </Typography>
                    <Typography variant="body2" color="success.contrastText">
                      Verified Safe Spaces
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.light' }}>
                    <Typography variant="h4" fontWeight={700} color="info.contrastText">
                      24/7
                    </Typography>
                    <Typography variant="body2" color="info.contrastText">
                      Emergency Access
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light' }}>
                    <Typography variant="h4" fontWeight={700} color="warning.contrastText">
                      4.2★
                    </Typography>
                    <Typography variant="body2" color="warning.contrastText">
                      Average Rating
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                    <Typography variant="h4" fontWeight={700} color="primary.contrastText">
                      98%
                    </Typography>
                    <Typography variant="body2" color="primary.contrastText">
                      Community Verified
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>

            {/* Search and Filter Controls */}
            <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Search safe spaces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={typeFilter}
                      label="Type"
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Types</MenuItem>
                      <MenuItem value="community_center">Community Centers</MenuItem>
                      <MenuItem value="religious_center">Religious Centers</MenuItem>
                      <MenuItem value="police_station">Police Stations</MenuItem>
                      <MenuItem value="hospital">Medical Centers</MenuItem>
                      <MenuItem value="school">Educational</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Distance</InputLabel>
                    <Select
                      value={radiusFilter}
                      label="Distance"
                      onChange={(e) => setRadiusFilter(e.target.value)}
                    >
                      <MenuItem value="all">Any Distance</MenuItem>
                      <MenuItem value="1">Within 1 km</MenuItem>
                      <MenuItem value="5">Within 5 km</MenuItem>
                      <MenuItem value="10">Within 10 km</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<FilterList />}
                  >
                    Filter
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Safe Spaces Grid */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Safe Spaces Directory
              <Chip 
                label={`${filteredSpaces.length} spaces`} 
                sx={{ ml: 2 }} 
                color="success"
              />
            </Typography>

            <Grid container spacing={3}>
              {filteredSpaces.map((space) => (
                <Grid item xs={12} md={6} lg={4} key={space.id}>
                  <SafeSpaceCard space={space} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Community Watch Network
            </Typography>
            
            {/* Community Alerts */}
            <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Recent Community Alerts
              </Typography>
              
              {communityAlerts.map((alert) => (
                <Alert 
                  key={alert.id}
                  severity={getSeverityColor(alert.severity)}
                  sx={{ mb: 2 }}
                  action={
                    <IconButton size="small">
                      <Share />
                    </IconButton>
                  }
                >
                  <Typography variant="h6" fontWeight={600}>
                    {alert.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {alert.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      {alert.location} • {new Date(alert.timestamp).toLocaleString()}
                    </Typography>
                    {alert.verified && (
                      <Chip label="Verified" size="small" color="success" icon={<Verified />} />
                    )}
                  </Box>
                </Alert>
              ))}
            </Paper>

            {/* Community Statistics */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Card sx={{ textAlign: 'center', p: 3 }}>
                  <Shield sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                  <Typography variant="h3" color="success.main" fontWeight={700}>
                    {safeSpaces.length}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Verified Safe Spaces
                  </Typography>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Card sx={{ textAlign: 'center', p: 3 }}>
                  <Groups sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h3" color="primary.main" fontWeight={700}>
                    234
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Community Volunteers
                  </Typography>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Card sx={{ textAlign: 'center', p: 3 }}>
                  <NotificationsActive sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                  <Typography variant="h3" color="warning.main" fontWeight={700}>
                    {communityAlerts.length}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Active Alerts
                  </Typography>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Card sx={{ textAlign: 'center', p: 3 }}>
                  <SafetyCheck sx={{ fontSize: 48, color: 'info.main', mb: 2 }} />
                  <Typography variant="h3" color="info.main" fontWeight={700}>
                    98%
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Safety Coverage
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Emergency Resources & Contacts
            </Typography>
            
            <Grid container spacing={3}>
              {emergencyContacts.map((contact, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <EmergencyButton contact={contact} />
                </Grid>
              ))}
            </Grid>

            {/* Emergency Preparedness Guide */}
            <Paper elevation={2} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Emergency Preparedness Guide
              </Typography>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography fontWeight={600}>Personal Safety Planning</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Create a personal safety plan including trusted contacts, safe routes, and emergency procedures. 
                    Share your plan with trusted family members or friends.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography fontWeight={600}>Digital Safety & Privacy</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Protect your digital footprint, use secure communication methods, and understand your privacy rights 
                    when reporting incidents or seeking help.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography fontWeight={600}>Community Support Networks</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Build connections with neighbors, community groups, and local organizations. 
                    Strong community networks provide mutual support and collective safety.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography fontWeight={600}>Emergency Communication</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Know how to quickly contact emergency services, communicate your location clearly, 
                    and use alternative communication methods when primary channels are unavailable.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Box>
        )}
      </Box>

      {/* Safe Space Details Dialog */}
      <Dialog 
        open={!!selectedSpace} 
        onClose={() => setSelectedSpace(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedSpace && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 2 }}>
                  {getTypeIcon(selectedSpace.type)}
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={600}>
                    {selectedSpace.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedSpace.category}
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={() => setSelectedSpace(null)}>
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Contact Information</Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><LocationOn /></ListItemIcon>
                      <ListItemText 
                        primary={selectedSpace.address}
                        secondary={`${selectedSpace.distance} km away`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><PhoneIcon /></ListItemIcon>
                      <ListItemText primary={selectedSpace.contact.phone} />
                    </ListItem>
                    {selectedSpace.contact.email && (
                      <ListItem>
                        <ListItemIcon><Email /></ListItemIcon>
                        <ListItemText primary={selectedSpace.contact.email} />
                      </ListItem>
                    )}
                    <ListItem>
                      <ListItemIcon><AccessTime /></ListItemIcon>
                      <ListItemText primary={selectedSpace.contact.hours} />
                    </ListItem>
                  </List>

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Services Available</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedSpace.services.map((service, index) => (
                      <Chip key={index} label={service} color="primary" variant="outlined" />
                    ))}
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Safety Features</Typography>
                  <List>
                    {selectedSpace.safetyFeatures.map((feature, index) => (
                      <ListItem key={index}>
                        <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Accessibility</Typography>
                  <List>
                    {selectedSpace.accessibility.map((feature, index) => (
                      <ListItem key={index}>
                        <ListItemIcon><Accessible color="info" /></ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Description</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedSpace.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={selectedSpace.rating} precision={0.1} readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {selectedSpace.rating} stars ({selectedSpace.reviews} reviews)
                  </Typography>
                  {selectedSpace.verified && (
                    <Chip 
                      label="Verified" 
                      color="success" 
                      size="small" 
                      icon={<Verified />}
                      sx={{ ml: 2 }}
                    />
                  )}
                </Box>
              </Box>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setSelectedSpace(null)}>Close</Button>
              <Button variant="outlined" startIcon={<Navigation />}>
                Get Directions
              </Button>
              <Button variant="outlined" startIcon={<Share />}>Share</Button>
              <Button 
                variant="contained" 
                startIcon={<PhoneIcon />} 
                href={`tel:${selectedSpace.contact.phone}`}
                color="success"
              >
                Call Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Emergency Contacts Dialog */}
      <Dialog 
        open={emergencyDialogOpen} 
        onClose={() => setEmergencyDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: 'error.main', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Emergency sx={{ mr: 1 }} />
            Emergency Contacts
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            {emergencyContacts.map((contact, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ p: 2, textAlign: 'center' }}>
                  <Box sx={{ color: 'error.main', mb: 1 }}>
                    {contact.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600}>
                    {contact.service}
                  </Typography>
                  <Typography variant="h4" color="error.main" fontWeight={700}>
                    {contact.number}
                  </Typography>
                  {contact.secondary && (
                    <Typography variant="body2" color="text.secondary">
                      Alt: {contact.secondary}
                    </Typography>
                  )}
                  <Button 
                    variant="contained" 
                    color="error" 
                    fullWidth 
                    sx={{ mt: 1 }}
                    href={`tel:${contact.number}`}
                  >
                    Call Now
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setEmergencyDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Report Safe Space Dialog */}
      <Dialog 
        open={reportSpaceDialogOpen} 
        onClose={() => setReportSpaceDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Report a Safe Space</DialogTitle>
        
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Help grow our community safety network by reporting verified safe spaces.
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Space Name" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select defaultValue="">
                  <MenuItem value="community_center">Community Center</MenuItem>
                  <MenuItem value="religious_center">Religious Center</MenuItem>
                  <MenuItem value="police_station">Police Station</MenuItem>
                  <MenuItem value="hospital">Hospital</MenuItem>
                  <MenuItem value="school">School</MenuItem>
                  <MenuItem value="government_office">Government Office</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Phone Number" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" required />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Description" 
                multiline 
                rows={3}
                placeholder="Describe the safety features and services available"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setReportSpaceDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<Send />}>
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 