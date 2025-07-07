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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
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
  const [selectedCounty, setSelectedCounty] = useState('all');

  // Kenya Counties with coordinates and population data
  const kenyaCounties = [
    { name: 'Nairobi', lat: -1.2921, lng: 36.8219, population: 4397073, region: 'Central' },
    { name: 'Mombasa', lat: -4.0435, lng: 39.6682, population: 1208333, region: 'Coast' },
    { name: 'Kisumu', lat: -0.1022, lng: 34.7617, population: 1155574, region: 'Nyanza' },
    { name: 'Nakuru', lat: -0.3031, lng: 36.0800, population: 2162202, region: 'Rift Valley' },
    { name: 'Eldoret', lat: 0.5143, lng: 35.2698, population: 1163186, region: 'Rift Valley' },
    { name: 'Kiambu', lat: -1.1719, lng: 36.8356, population: 2417735, region: 'Central' },
    { name: 'Machakos', lat: -1.5177, lng: 37.2634, population: 1421932, region: 'Eastern' },
    { name: 'Meru', lat: 0.0496, lng: 37.6556, population: 1545714, region: 'Eastern' },
    { name: 'Kakamega', lat: 0.2827, lng: 34.7519, population: 1867579, region: 'Western' },
    { name: 'Kilifi', lat: -3.5053, lng: 39.8499, population: 1453787, region: 'Coast' },
    { name: 'Bungoma', lat: 0.5635, lng: 34.5606, population: 1670570, region: 'Western' },
    { name: 'Turkana', lat: 3.1167, lng: 35.5667, population: 926976, region: 'Rift Valley' },
    { name: 'Garissa', lat: -0.4536, lng: 39.6401, population: 841353, region: 'North Eastern' },
    { name: 'Mandera', lat: 3.9366, lng: 41.8569, population: 1025756, region: 'North Eastern' },
    { name: 'Wajir', lat: 1.7471, lng: 40.0629, population: 781263, region: 'North Eastern' },
    { name: 'Marsabit', lat: 2.3284, lng: 37.9899, population: 459785, region: 'Northern' },
    { name: 'Isiolo', lat: 0.3556, lng: 37.5833, population: 268002, region: 'Eastern' },
    { name: 'Samburu', lat: 1.1667, lng: 36.8000, population: 310327, region: 'Rift Valley' },
    { name: 'Trans Nzoia', lat: 1.0217, lng: 35.0003, population: 990341, region: 'Rift Valley' },
    { name: 'West Pokot', lat: 1.4167, lng: 35.1167, population: 621241, region: 'Rift Valley' },
    { name: 'Baringo', lat: 0.4683, lng: 35.9667, population: 666763, region: 'Rift Valley' },
    { name: 'Laikipia', lat: 0.0333, lng: 36.7833, population: 518560, region: 'Central' },
    { name: 'Nyandarua', lat: -0.3667, lng: 36.4167, population: 638289, region: 'Central' },
    { name: 'Nyeri', lat: -0.4167, lng: 36.9500, population: 759164, region: 'Central' },
    { name: 'Kirinyaga', lat: -0.6667, lng: 37.3000, population: 610411, region: 'Central' },
    { name: 'Murang\'a', lat: -0.7167, lng: 37.1500, population: 1056640, region: 'Central' },
    { name: 'Embu', lat: -0.5167, lng: 37.4500, population: 608599, region: 'Eastern' },
    { name: 'Tharaka Nithi', lat: -0.1667, lng: 37.9167, population: 393177, region: 'Eastern' },
    { name: 'Kitui', lat: -1.3667, lng: 38.0167, population: 1136187, region: 'Eastern' },
    { name: 'Makueni', lat: -1.8039, lng: 37.6244, population: 987653, region: 'Eastern' },
    { name: 'Kajiado', lat: -1.8500, lng: 36.7833, population: 1117840, region: 'Rift Valley' },
    { name: 'Kericho', lat: -0.3667, lng: 35.2833, population: 901777, region: 'Rift Valley' },
    { name: 'Bomet', lat: -0.7833, lng: 35.3417, population: 875689, region: 'Rift Valley' },
    { name: 'Narok', lat: -1.0833, lng: 35.8667, population: 1157873, region: 'Rift Valley' },
    { name: 'Nandi', lat: 0.1833, lng: 35.1000, population: 885711, region: 'Rift Valley' },
    { name: 'Elgeyo Marakwet', lat: 0.8833, lng: 35.4500, population: 454480, region: 'Rift Valley' },
    { name: 'Busia', lat: 0.4667, lng: 34.1167, population: 893681, region: 'Western' },
    { name: 'Vihiga', lat: 0.0833, lng: 34.7333, population: 590013, region: 'Western' },
    { name: 'Siaya', lat: 0.0833, lng: 34.2833, population: 993183, region: 'Nyanza' },
    { name: 'Kisii', lat: -0.6833, lng: 34.7667, population: 1266860, region: 'Nyanza' },
    { name: 'Nyamira', lat: -0.5667, lng: 34.9333, population: 605576, region: 'Nyanza' },
    { name: 'Homa Bay', lat: -0.5167, lng: 34.4667, population: 1131950, region: 'Nyanza' },
    { name: 'Migori', lat: -1.0634, lng: 34.4731, population: 1116436, region: 'Nyanza' },
    { name: 'Kwale', lat: -4.1769, lng: 39.4503, population: 866820, region: 'Coast' },
    { name: 'Kilifi', lat: -3.5053, lng: 39.8499, population: 1453787, region: 'Coast' },
    { name: 'Tana River', lat: -1.3000, lng: 40.1167, population: 315943, region: 'Coast' },
    { name: 'Lamu', lat: -2.2717, lng: 40.9020, population: 143920, region: 'Coast' },
    { name: 'Taita Taveta', lat: -3.3167, lng: 38.3667, population: 340671, region: 'Coast' }
  ];

  // County-based incident data generation
  const generateCountyIncidentData = () => {
    const incidentTypes = [
      { type: 'police_brutality', severity: 'high', color: '#d32f2f', urbanBias: 1.5 },
      { type: 'enforced_disappearance', severity: 'critical', color: '#b71c1c', urbanBias: 1.2 },
      { type: 'harassment', severity: 'medium', color: '#f57c00', urbanBias: 1.0 },
      { type: 'arbitrary_arrest', severity: 'high', color: '#e53935', urbanBias: 1.3 },
      { type: 'protest_disruption', severity: 'medium', color: '#ff9800', urbanBias: 1.8 },
      { type: 'extrajudicial_killing', severity: 'critical', color: '#c62828', urbanBias: 0.8 },
      { type: 'torture', severity: 'high', color: '#d32f2f', urbanBias: 0.9 },
      { type: 'illegal_detention', severity: 'high', color: '#e53935', urbanBias: 1.1 },
    ];

    // Generate incidents based on county population and risk factors
    const incidents = [];
    
    kenyaCounties.forEach((county, countyIndex) => {
      // Calculate incident probability based on population and region
      const populationFactor = Math.log(county.population) / 15; // Logarithmic scale
      const regionRiskFactors = {
        'Central': 1.2, // Higher due to political activity
        'Nyanza': 1.3, // Higher due to political tensions
        'Coast': 1.1, // Moderate due to tourism and trade
        'Rift Valley': 1.4, // Higher due to historical conflicts
        'Western': 1.0, // Baseline
        'Eastern': 0.9, // Lower but still significant
        'North Eastern': 1.5, // Higher due to security issues
        'Northern': 1.3, // Higher due to marginalization
      };
      
      const regionFactor = regionRiskFactors[county.region] || 1.0;
      const incidentProbability = populationFactor * regionFactor * 0.3;
      
      // Generate 1-3 incidents per county based on probability
      const incidentCount = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < incidentCount; i++) {
        if (Math.random() < incidentProbability) {
          const incident = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
          
          // Adjust coordinates within county boundaries (approximate)
          const latVariation = (Math.random() - 0.5) * 0.2; // ±0.1 degrees
          const lngVariation = (Math.random() - 0.5) * 0.2;
          
          incidents.push({
            id: `INC${Date.now()}-${countyIndex}-${i}`,
            name: `${incident.type.replace(/_/g, ' ').toUpperCase()} - ${county.name} County`,
            location: county.name,
            county: county.name,
            region: county.region,
            coordinates: { 
              lat: county.lat + latVariation, 
              lng: county.lng + lngVariation 
            },
            type: 'incident',
            category: incident.type,
            severity: incident.severity,
            timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Last 7 days
            description: `Active ${incident.type.replace(/_/g, ' ')} incident reported in ${county.name} County, ${county.region} region`,
            verified: Math.random() > 0.25, // 75% verification rate
            reporterCount: Math.floor(Math.random() * 20) + 1,
            color: incident.color,
            population: county.population,
          });
        }
      }
    });

    return incidents;
  };

  // Generate county-based hotspots
  const generateCountyHotspots = () => {
    const highRiskCounties = [
      { county: 'Nairobi', reason: 'High population density and political activity', riskLevel: 'critical' },
      { county: 'Mombasa', reason: 'Port security and radicalization concerns', riskLevel: 'high' },
      { county: 'Kisumu', reason: 'Political opposition stronghold', riskLevel: 'high' },
      { county: 'Turkana', reason: 'Resource conflicts and marginalization', riskLevel: 'critical' },
      { county: 'Garissa', reason: 'Security threats and extremism', riskLevel: 'critical' },
      { county: 'Mandera', reason: 'Border insecurity and terrorism', riskLevel: 'critical' },
      { county: 'Nakuru', reason: 'Inter-ethnic tensions', riskLevel: 'medium' },
      { county: 'Kakamega', reason: 'Land disputes and political tensions', riskLevel: 'medium' },
      { county: 'Bungoma', reason: 'Cross-border crime', riskLevel: 'medium' },
      { county: 'Kilifi', reason: 'Radicalization and coastal insecurity', riskLevel: 'high' },
    ];

    return highRiskCounties.map((hotspot, index) => {
      const county = kenyaCounties.find(c => c.name === hotspot.county);
      if (!county) return null;

      const riskScores = { critical: 4, high: 3, medium: 2, low: 1 };
      const riskScore = riskScores[hotspot.riskLevel];
      
      return {
        id: `HS${String(index + 1).padStart(3, '0')}`,
        name: `${county.name} County`,
        county: county.name,
        region: county.region,
        coordinates: { 
          lat: county.lat + (Math.random() - 0.5) * 0.05, 
          lng: county.lng + (Math.random() - 0.5) * 0.05 
        },
        riskLevel: hotspot.riskLevel,
        incidentCount: Math.floor(Math.random() * riskScore * 10) + riskScore * 5,
        recentIncidents: Math.floor(Math.random() * riskScore * 3) + 1,
        description: hotspot.reason,
        radius: riskScore * 8000, // Radius based on risk level
        population: county.population,
      };
    }).filter(Boolean);
  };

  // Initialize incident data
  useEffect(() => {
    setIncidentData(generateCountyIncidentData());
    setHotspots(generateCountyHotspots());
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
        setIncidentData(generateCountyIncidentData());
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

              {/* County Filter and Controls */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                {/* County Filter Dropdown */}
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="county-filter-label">Filter by County</InputLabel>
                  <Select
                    labelId="county-filter-label"
                    value={selectedCounty}
                    label="Filter by County"
                    onChange={(e) => setSelectedCounty(e.target.value)}
                    size="small"
                  >
                    <MenuItem value="all">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Map sx={{ fontSize: 16 }} />
                        All Counties (47)
                      </Box>
                    </MenuItem>
                    <Divider />
                    {['Central', 'Coast', 'Eastern', 'North Eastern', 'Northern', 'Nyanza', 'Rift Valley', 'Western'].map(region => (
                      <Box key={region}>
                        <MenuItem disabled sx={{ fontWeight: 600, color: 'primary.main' }}>
                          {region} Region
                        </MenuItem>
                        {kenyaCounties
                          .filter(county => county.region === region)
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map(county => {
                            const countyIncidents = incidentData.filter(inc => inc.county === county.name);
                            const countyHotspots = hotspots.filter(hs => hs.county === county.name);
                            return (
                              <MenuItem key={county.name} value={county.name} sx={{ pl: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                  <Typography variant="body2">{county.name}</Typography>
                                  <Box sx={{ display: 'flex', gap: 1 }}>
                                    {countyIncidents.length > 0 && (
                                      <Chip 
                                        label={countyIncidents.length} 
                                        size="small" 
                                        color="error" 
                                        sx={{ height: 16, fontSize: '0.6rem' }}
                                      />
                                    )}
                                    {countyHotspots.length > 0 && (
                                      <Chip 
                                        label="H" 
                                        size="small" 
                                        color="warning" 
                                        sx={{ height: 16, fontSize: '0.6rem', minWidth: 'auto', width: 16 }}
                                      />
                                    )}
                                  </Box>
                                </Box>
                              </MenuItem>
                            );
                          })}
                      </Box>
                    ))}
                  </Select>
                </FormControl>

                {/* Action Buttons */}
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
                
                {/* Filter Reset */}
                {selectedCounty !== 'all' && (
                  <Button
                    variant="text"
                    onClick={() => setSelectedCounty('all')}
                    size="small"
                    sx={{ ml: 'auto' }}
                  >
                    Clear Filter
                  </Button>
                )}
              </Box>

              {/* County Information Panel */}
              {selectedCounty !== 'all' && (
                <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
                  {(() => {
                    const county = kenyaCounties.find(c => c.name === selectedCounty);
                    const countyIncidents = incidentData.filter(inc => inc.county === selectedCounty);
                    const countyHotspots = hotspots.filter(hs => hs.county === selectedCounty);
                    const criticalIncidents = countyIncidents.filter(inc => inc.severity === 'critical');
                    
                    if (!county) return null;
                    
                    return (
                      <Box>
                        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                          {county.name} County - {county.region} Region
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6} sm={3}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="h5" fontWeight={700} color="primary.main">
                                {county.population.toLocaleString()}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Population
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="h5" fontWeight={700} color="error.main">
                                {countyIncidents.length}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Active Incidents
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="h5" fontWeight={700} color="warning.main">
                                {countyHotspots.length}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Risk Hotspots
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="h5" fontWeight={700} color="error.dark">
                                {criticalIncidents.length}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Critical Cases
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })()}
                </Paper>
              )}

              {/* The Map Component */}
              <Box sx={{ height: 500, borderRadius: 2, overflow: 'hidden', mb: 3 }}>
                <GoogleMap 
                  locations={(() => {
                    // Filter data based on selected county
                    const filteredIncidents = selectedCounty === 'all' 
                      ? incidentData 
                      : incidentData.filter(inc => inc.county === selectedCounty);
                    
                    const filteredHotspots = selectedCounty === 'all' 
                      ? hotspots 
                      : hotspots.filter(hs => hs.county === selectedCounty);
                    
                    return [
                      ...filteredIncidents, 
                      ...filteredHotspots.map(h => ({
                        ...h,
                        type: 'hotspot',
                        name: `${h.name} (${h.riskLevel.toUpperCase()} RISK)`,
                        description: `${h.description} - ${h.incidentCount} total incidents, ${h.recentIncidents} recent`,
                      }))
                    ];
                  })()}
                  center={(() => {
                    // Center map on selected county or Kenya center
                    if (selectedCounty === 'all') {
                      return { lat: -1.2921, lng: 36.8219 }; // Kenya center
                    }
                    const county = kenyaCounties.find(c => c.name === selectedCounty);
                    return county ? { lat: county.lat, lng: county.lng } : { lat: -1.2921, lng: 36.8219 };
                  })()} 
                  zoom={selectedCounty === 'all' ? 6 : 10}
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
                  {selectedCounty === 'all' ? 'Recent Critical Incidents' : `Recent Critical Incidents in ${selectedCounty} County`}
                </Typography>
                <Grid container spacing={2}>
                  {(() => {
                    // Filter incidents based on selected county
                    const filteredIncidents = selectedCounty === 'all' 
                      ? incidentData 
                      : incidentData.filter(inc => inc.county === selectedCounty);
                    
                    const criticalIncidents = filteredIncidents
                      .filter(incident => incident.severity === 'critical' || incident.severity === 'high')
                      .slice(0, 3);
                    
                    if (criticalIncidents.length === 0) {
                      return (
                        <Grid item xs={12}>
                          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
                            <Typography variant="body1" color="text.secondary">
                              {selectedCounty === 'all' 
                                ? 'No critical incidents found.' 
                                : `No critical incidents found in ${selectedCounty} County.`}
                            </Typography>
                          </Paper>
                        </Grid>
                      );
                    }
                    
                    return criticalIncidents.map((incident, index) => (
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
                              <Chip 
                                label={incident.region}
                                color="primary"
                                variant="outlined"
                                size="small"
                              />
                            </Box>
                            
                            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                              {incident.category.replace(/_/g, ' ').toUpperCase()}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                              <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {incident.location} County
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
                    ));
                  })()}
                </Grid>
                
                {(() => {
                  const filteredIncidents = selectedCounty === 'all' 
                    ? incidentData 
                    : incidentData.filter(inc => inc.county === selectedCounty);
                  
                  const criticalCount = filteredIncidents.filter(i => i.severity === 'critical' || i.severity === 'high').length;
                  
                  if (criticalCount > 3) {
                    return (
                      <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Button 
                          variant="outlined" 
                          component={Link} 
                          href="/tracker"
                          startIcon={<Assessment />}
                        >
                          View All {criticalCount} Critical Incidents {selectedCounty !== 'all' ? `in ${selectedCounty}` : ''}
                        </Button>
                      </Box>
                    );
                  }
                  return null;
                })()}
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
