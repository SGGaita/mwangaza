'use client';

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
  LinearProgress,
  CircularProgress,
  IconButton,
  Badge,
  Avatar,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Security,
  Gavel,
  Search,
  Assessment,
  Shield,
  Group,
  Emergency,
  Lock,
  Visibility,
  Speed,
  ArrowForward,
  CheckCircle,
  Warning,
  Phone,
  LocationOn,
  TrendingUp,
  TrendingDown,
  Refresh,
  FiberManualRecord,
  Person,
  CalendarToday,
  Analytics,
  Error,
  Info,
  NotificationImportant,
  Map,
  MyLocation,
  PriorityHigh,
  Report,
  Place,
  Timeline,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import GoogleMap from './components/GoogleMap';

export default function HomePage() {
  const theme = useTheme();
  const [realtimeStats, setRealtimeStats] = useState({
    totalCases: 1247,
    activeCases: 834,
    resolvedCases: 289,
    criticalCases: 124,
    onlineUsers: 156,
    recentReports: 8
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemStatus, setSystemStatus] = useState('operational');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [showLiveMap, setShowLiveMap] = useState(true);
  const [incidentData, setIncidentData] = useState([]);
  const [hotspots, setHotspots] = useState([]);

  // Mock incident data for the live map
  const generateIncidentData = () => {
    const locations = [
      { name: 'Nairobi CBD', lat: -1.2864, lng: 36.8172 },
      { name: 'Kisumu', lat: -0.1022, lng: 34.7617 },
      { name: 'Mombasa', lat: -4.0435, lng: 39.6682 },
      { name: 'Nakuru', lat: -0.3031, lng: 36.0800 },
      { name: 'Eldoret', lat: 0.5143, lng: 35.2698 },
      { name: 'Thika', lat: -1.0332, lng: 37.0692 },
      { name: 'Machakos', lat: -1.5177, lng: 37.2634 },
      { name: 'Meru', lat: 0.0496, lng: 37.6556 },
    ];

    const incidentTypes = [
      { type: 'police_brutality', severity: 'high', color: '#d32f2f' },
      { type: 'enforced_disappearance', severity: 'critical', color: '#b71c1c' },
      { type: 'harassment', severity: 'medium', color: '#f57c00' },
      { type: 'arbitrary_arrest', severity: 'high', color: '#e53935' },
      { type: 'protest_disruption', severity: 'medium', color: '#ff9800' },
    ];

    return locations.map((location, index) => {
      const incident = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
      return {
        id: `INC${Date.now()}-${index}`,
        name: `${incident.type.replace('_', ' ').toUpperCase()} - ${location.name}`,
        location: location.name,
        coordinates: { 
          lat: location.lat + (Math.random() - 0.5) * 0.1, 
          lng: location.lng + (Math.random() - 0.5) * 0.1 
        },
        type: 'incident',
        category: incident.type,
        severity: incident.severity,
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        description: `Active ${incident.type.replace('_', ' ')} incident reported in ${location.name} area`,
        verified: Math.random() > 0.3,
        reporterCount: Math.floor(Math.random() * 15) + 1,
        color: incident.color,
      };
    });
  };

  // Generate hotspot data
  const generateHotspots = () => {
    return [
      {
        id: 'HS001',
        name: 'Nairobi Central',
        coordinates: { lat: -1.2921, lng: 36.8219 },
        riskLevel: 'high',
        incidentCount: 23,
        recentIncidents: 5,
        description: 'High concentration of human rights violations',
        radius: 15000, // in meters
      },
      {
        id: 'HS002',
        name: 'Kisumu Town',
        coordinates: { lat: -0.1022, lng: 34.7617 },
        riskLevel: 'medium',
        incidentCount: 12,
        recentIncidents: 3,
        description: 'Moderate risk area with recent incidents',
        radius: 10000,
      },
      {
        id: 'HS003',
        name: 'Mathare Slums',
        coordinates: { lat: -1.2647, lng: 36.8611 },
        riskLevel: 'critical',
        incidentCount: 31,
        recentIncidents: 8,
        description: 'Critical risk zone - heightened alert',
        radius: 8000,
      },
    ];
  };

  // Initialize incident data
  useEffect(() => {
    setIncidentData(generateIncidentData());
    setHotspots(generateHotspots());
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeStats(prev => ({
        ...prev,
        onlineUsers: Math.floor(Math.random() * 50) + 120,
        recentReports: Math.floor(Math.random() * 5) + 5,
        activeCases: prev.activeCases + Math.floor(Math.random() * 3) - 1,
      }));
      setLastUpdate(new Date());
      
      // Update incident data occasionally
      if (Math.random() > 0.8) {
        setIncidentData(generateIncidentData());
      }
      
      // Simulate new activity
      if (Math.random() > 0.7) {
        const activities = [
          { type: 'report', message: 'New incident reported in Nairobi County', time: new Date(), severity: 'high' },
          { type: 'missing', message: 'Missing person alert updated in Kisumu', time: new Date(), severity: 'medium' },
          { type: 'case', message: 'Case status updated: Investigation ongoing', time: new Date(), severity: 'low' },
          { type: 'evidence', message: 'New evidence uploaded to secure vault', time: new Date(), severity: 'medium' },
          { type: 'community', message: 'Safe space verified in Mombasa area', time: new Date(), severity: 'low' },
        ];
        
        setRecentActivity(prev => {
          const newActivity = activities[Math.floor(Math.random() * activities.length)];
          return [newActivity, ...prev.slice(0, 4)]; // Keep only last 5 items
        });
      }
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setRealtimeStats(prev => ({
        ...prev,
        totalCases: prev.totalCases + Math.floor(Math.random() * 3),
        onlineUsers: Math.floor(Math.random() * 50) + 120,
        recentReports: Math.floor(Math.random() * 10) + 3,
      }));
      setLastUpdate(new Date());
      setLoading(false);
    }, 1000);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'report': return <Security color="error" />;
      case 'missing': return <Search color="warning" />;
      case 'case': return <Assessment color="info" />;
      case 'evidence': return <Group color="primary" />;
      case 'community': return <Shield color="success" />;
      default: return <Info />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const modules = [
    {
      title: 'Ripoti Tukio',
      subtitle: 'Incident Reporting & Documentation Hub',
      description: 'Securely and anonymously report human rights violations with encrypted forms, multimedia evidence upload, and geolocation mapping.',
      icon: <Security sx={{ fontSize: 48 }} />,
      href: '/report',
      features: ['Encrypted submissions', 'Anonymous reporting', 'Multimedia evidence', 'GPS location'],
      color: theme.palette.error.main,
    },
    {
      title: 'Jua Haki Yako',
      subtitle: 'Know Your Rights & Legal Aid',
      description: 'Access interactive rights guide, AI-powered legal chatbot, and directory of pro-bono lawyers and legal aid organizations.',
      icon: <Gavel sx={{ fontSize: 48 }} />,
      href: '/rights',
      features: ['Interactive chatbot', 'Legal directory', 'Emergency alerts', 'Document templates'],
      color: theme.palette.primary.main,
    },
    {
      title: 'Wapotea',
      subtitle: 'Missing Persons & Abduction Tracker',
      description: 'Report missing persons, access public database, generate community alerts, and connect with support networks.',
      icon: <Search sx={{ fontSize: 48 }} />,
      href: '/missing',
      features: ['Public database', 'Community alerts', 'Sharing tools', 'Family support'],
      color: theme.palette.warning.main,
    },
    {
      title: 'Kufuatilia Kesi',
      subtitle: 'Accountability & Case Tracker',
      description: 'Track progress of reported incidents, monitor public officials, access judicial outcomes, and view data analytics.',
      icon: <Assessment sx={{ fontSize: 48 }} />,
      href: '/tracker',
      features: ['Case monitoring', 'Officials database', 'Judicial outcomes', 'Data trends'],
      color: theme.palette.info.main,
    },
    {
      title: 'Ulinzi wa Jamii',
      subtitle: 'Community Protection & Safe Spaces',
      description: 'Interactive safe spaces map, community watch system, emergency resources, and real-time alerts.',
      icon: <Shield sx={{ fontSize: 48 }} />,
      href: '/community',
      features: ['Safe spaces map', 'Community alerts', 'Watch groups', 'Emergency resources'],
      color: theme.palette.success.main,
    },
    {
      title: 'Dalili za Kidijitali',
      subtitle: 'Digital Forensics & Evidence Toolkit',
      description: 'Secure evidence vault, metadata verification, tamper detection, and digital security guidance.',
      icon: <Group sx={{ fontSize: 48 }} />,
      href: '/evidence',
      features: ['Evidence vault', 'Metadata tools', 'Tamper detection', 'Security guides'],
      color: theme.palette.secondary.main,
    },
  ];

  const securityFeatures = [
    'End-to-end encryption for all data',
    'Anonymous reporting options',
    'Secure cloud storage',
    'Regular security audits',
    'Decentralized architecture',
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: theme.palette.primary.contrastText,
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ mb: 3 }}>
                <Chip
                  label="🚀 BETA VERSION"
                  sx={{
                    backgroundColor: theme.palette.warning.main,
                    color: theme.palette.warning.contrastText,
                    mb: 3,
                    fontWeight: 600,
                  }}
                />
              </Box>
              
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 3,
                  background: 'linear-gradient(45deg, #FFD700, #FFFFFF)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Mwangaza
              </Typography>
              
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  mb: 3,
                  opacity: 0.9,
                  fontWeight: 500,
                }}
              >
                Digital Civic Platform for Accountability & Justice in Kenya
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  mb: 4,
                  opacity: 0.8,
                  lineHeight: 1.7,
                  maxWidth: '600px',
                }}
              >
                Empowering Kenyan citizens to document human rights abuses, advocate for accountability, 
                and foster community resilience through secure, accessible, and user-friendly digital tools.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/report"
                  startIcon={<Security />}
                  sx={{
                    backgroundColor: theme.palette.error.main,
                    '&:hover': {
                      backgroundColor: theme.palette.error.dark,
                    },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Report Incident
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="/rights"
                  startIcon={<Gavel />}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Know Your Rights
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {/* Large Logo */}
                <Box
                  sx={{
                    width: { xs: 200, md: 300 },
                    height: { xs: 200, md: 300 },
                    mx: 'auto',
                    background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2))',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { xs: '4rem', md: '6rem' },
                    border: '3px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  ✋⭐
                </Box>
                
                <Typography
                  variant="body1"
                  sx={{
                    mt: 3,
                    opacity: 0.8,
                    fontStyle: 'italic',
                    fontSize: '1.1rem',
                  }}
                >
                  "Mwangaza" - Light, Clarity, Illumination
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Real-time Statistics Bar */}
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 2 }}>
        <Paper elevation={6} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FiberManualRecord sx={{ color: 'success.main', fontSize: 12 }} />
              <Typography variant="h6" fontWeight={600}>
                Live Platform Statistics
              </Typography>
              <Chip 
                label="LIVE" 
                color="success" 
                size="small" 
                sx={{ fontSize: '0.7rem', height: 20 }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </Typography>
              <IconButton size="small" onClick={handleRefresh} disabled={loading}>
                {loading ? <CircularProgress size={16} /> : <Refresh />}
              </IconButton>
            </Box>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3} md={2}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                  {realtimeStats.totalCases.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Cases
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  {realtimeStats.activeCases.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Active Cases
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={700} color="success.main">
                  {realtimeStats.resolvedCases.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Resolved
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={700} color="error.main">
                  {realtimeStats.criticalCases}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Critical
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Box sx={{ textAlign: 'center' }}>
                <Badge badgeContent={realtimeStats.onlineUsers} color="success" max={999}>
                  <Person color="action" />
                </Badge>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Online Now
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Box sx={{ textAlign: 'center' }}>
                <Badge badgeContent={realtimeStats.recentReports} color="error">
                  <NotificationImportant color="action" />
                </Badge>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Recent Reports
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Emergency Alert */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Alert
          severity="error"
          icon={<Emergency />}
          sx={{
            borderRadius: 2,
            boxShadow: theme.shadows[4],
            mb: 4,
          }}
          action={
            <Button
              component={Link}
              href="/emergency"
              color="inherit"
              size="small"
              endIcon={<ArrowForward />}
            >
              Emergency
            </Button>
          }
        >
          <Typography fontWeight={600}>
            In immediate danger? Use our emergency alert system to notify trusted contacts instantly.
          </Typography>
        </Alert>
      </Container>

      {/* Recent Activity Feed */}
      {recentActivity.length > 0 && (
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Analytics color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Recent Platform Activity
              </Typography>
              <Chip label="LIVE" color="primary" size="small" />
            </Box>
            
            <List sx={{ py: 0 }}>
              {recentActivity.map((activity, index) => (
                <ListItem key={index} sx={{ px: 0, py: 1 }}>
                  <ListItemIcon>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'transparent' }}>
                      {getActivityIcon(activity.type)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.message}
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <CalendarToday sx={{ fontSize: 12 }} />
                        <Typography variant="caption">
                          {activity.time.toLocaleTimeString()}
                        </Typography>
                        <Chip 
                          label={activity.severity} 
                          color={getSeverityColor(activity.severity)} 
                          size="small" 
                          sx={{ height: 16, fontSize: '0.6rem' }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button 
                component={Link} 
                href="/analytics" 
                variant="outlined" 
                size="small"
                startIcon={<Analytics />}
              >
                View Full Analytics
              </Button>
            </Box>
          </Paper>
        </Container>
      )}

      {/* Live Incidents & Hotspots Map */}
      {showLiveMap && (
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Paper elevation={6} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            {/* Map Header */}
            <Box sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
              color: 'white',
              p: 3,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PriorityHigh />
                    <Typography variant="h5" fontWeight={700}>
                      Live Incidents & Hotspots
                    </Typography>
                  </Box>
                  <Chip 
                    label="LIVE" 
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 600,
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': { opacity: 1 },
                        '50%': { opacity: 0.7 },
                        '100%': { opacity: 1 }
                      }
                    }}
                  />
                </Box>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={showLiveMap}
                      onChange={(e) => setShowLiveMap(e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: 'white',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        },
                      }}
                    />
                  }
                  label="Show Live Map"
                  sx={{ color: 'white' }}
                />
              </Box>
              
              {/* Live Statistics */}
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={700}>
                      {incidentData.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Active Incidents
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={700}>
                      {hotspots.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Risk Hotspots
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={700}>
                      {incidentData.filter(i => i.severity === 'critical' || i.severity === 'high').length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      High Priority
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={700}>
                      {incidentData.filter(i => i.verified).length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Verified Reports
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Map Content */}
            <Box sx={{ p: 3 }}>
              <Alert severity="warning" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  <strong>Real-time incident monitoring:</strong> This map shows live reports of human rights violations across Kenya. 
                  Information is updated every 15 seconds. Red markers indicate critical incidents requiring immediate attention.
                </Typography>
              </Alert>

              {/* Map Controls */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<Report />}
                  component={Link}
                  href="/report"
                  color="error"
                >
                  Report Incident
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<MyLocation />}
                  onClick={() => {
                    // Get user location and center map
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        // This would center the map on user location
                        console.log('User location:', position.coords);
                      });
                    }
                  }}
                >
                  My Location
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Timeline />}
                  component={Link}
                  href="/analytics"
                >
                  View Analytics
                </Button>
              </Box>

              {/* The Map Component */}
              <Box sx={{ height: 500, borderRadius: 2, overflow: 'hidden', mb: 3 }}>
                <GoogleMap 
                  locations={[...incidentData, ...hotspots.map(h => ({
                    ...h,
                    type: 'hotspot',
                    name: `${h.name} (${h.riskLevel.toUpperCase()} RISK)`,
                    description: `${h.description} - ${h.incidentCount} total incidents, ${h.recentIncidents} recent`,
                  }))]}
                  center={{ lat: -1.2921, lng: 36.8219 }} // Kenya center
                  zoom={7}
                  height={500}
                  showControls={true}
                  showIncidents={true}
                  onLocationClick={(location) => {
                    console.log('Selected location:', location);
                  }}
                />
              </Box>

              {/* Recent Incidents List */}
              <Box>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Recent Critical Incidents
                </Typography>
                <Grid container spacing={2}>
                  {incidentData
                    .filter(incident => incident.severity === 'critical' || incident.severity === 'high')
                    .slice(0, 3)
                    .map((incident, index) => (
                      <Grid item xs={12} md={4} key={incident.id}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                              <Chip 
                                label={incident.severity.toUpperCase()}
                                color={incident.severity === 'critical' ? 'error' : 'warning'}
                                size="small"
                              />
                              {incident.verified && (
                                <Chip 
                                  label="VERIFIED"
                                  color="success"
                                  size="small"
                                />
                              )}
                            </Box>
                            
                            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                              {incident.category.replace('_', ' ').toUpperCase()}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                              <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {incident.location}
                              </Typography>
                            </Box>
                            
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {incident.description}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="caption" color="text.secondary">
                                {incident.reporterCount} reports
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {incident.timestamp.toLocaleTimeString()}
                              </Typography>
                            </Box>
                          </CardContent>
                          <CardActions sx={{ pt: 0 }}>
                            <Button size="small" color="primary">
                              View Details
                            </Button>
                            <Button size="small" color="error">
                              Report Related
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
                
                {incidentData.filter(i => i.severity === 'critical' || i.severity === 'high').length > 3 && (
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      component={Link} 
                      href="/tracker"
                      startIcon={<Assessment />}
                    >
                      View All {incidentData.filter(i => i.severity === 'critical' || i.severity === 'high').length} Critical Incidents
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        </Container>
      )}

      {/* Platform Modules */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 700 }}>
            Platform Modules
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Six comprehensive modules designed to empower citizens, document injustices, 
            and promote transparency and accountability
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {modules.map((module, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                      color: module.color,
                    }}
                  >
                    {module.icon}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6" fontWeight={700}>
                        {module.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {module.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {module.description}
                  </Typography>
                  
                  <List dense>
                    {module.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle sx={{ fontSize: 18, color: module.color }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{ fontSize: '0.9rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    component={Link}
                    href={module.href}
                    variant="contained"
                    fullWidth
                    endIcon={<ArrowForward />}
                    sx={{
                      backgroundColor: module.color,
                      '&:hover': {
                        backgroundColor: module.color,
                        filter: 'brightness(0.9)',
                      },
                    }}
                  >
                    Access Module
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Security & Privacy Section */}
      <Box sx={{ backgroundColor: theme.palette.grey[50], py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
                Security & Privacy First
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7, fontSize: '1.1rem' }}>
                Your safety and privacy are our top priorities. Mwangaza implements 
                military-grade security measures to protect your identity and data.
              </Typography>
              
              <List>
                {securityFeatures.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Lock sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <Lock sx={{ fontSize: 64, mb: 2, opacity: 0.9 }} />
                <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                  End-to-End Encrypted
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                  All your reports, messages, and evidence are encrypted 
                  before leaving your device. Only you have the keys.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Chip label="AES-256 Encryption" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
                  <Chip label="Zero Knowledge" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
                  <Chip label="Anonymous Mode" variant="outlined" sx={{ color: 'white', borderColor: 'white' }} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          elevation={6}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 3,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
            color: 'white',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
            Join the Movement for Justice
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
            Together, we can build a more transparent, accountable, and just Kenya. 
            Every voice matters. Every report counts.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/report"
              startIcon={<Security />}
              sx={{
                backgroundColor: 'white',
                color: theme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                },
                px: 4,
                py: 1.5,
              }}
            >
              Start Reporting
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/community"
              startIcon={<Shield />}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                px: 4,
                py: 1.5,
              }}
            >
              Join Community
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
