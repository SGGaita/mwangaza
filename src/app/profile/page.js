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
  Switch,
  FormControlLabel,
  LinearProgress,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Breadcrumbs,
  Tooltip,
} from '@mui/material';
import {
  Person,
  Edit,
  Security,
  Settings,
  History,
  Notifications,
  Language,
  Visibility,
  VisibilityOff,
  Shield,
  Lock,
  Key,
  Verified,
  Email,
  Phone,
  LocationOn,
  Work,
  School,
  CalendarToday,
  Save,
  Cancel,
  Delete,
  Download,
  Upload,
  Share,
  Report,
  Help,
  Feedback,
  ExitToApp,
  PhotoCamera,
  Add,
  Remove,
  CheckCircle,
  Warning,
  Error,
  Info,
  Close,
  Home,
  NavigateNext,
  AccountCircle,
  PrivacyTip,
  VpnKey,
  DeviceHub,
  Smartphone,
  Computer,
  Tablet,
  AccessTime,
  TrendingUp,
  Assessment,
  Group,
  VolunteerActivism,
  Gavel,
  LocalPolice,
  MedicalServices,
  ExpandMore,
  DarkMode,
  LightMode,
  Translate,
  VolumeUp,
  VolumeOff,
  NotificationsActive,
  NotificationsOff,
  Public,
  PublicOff,
  CloudSync,
  CloudOff,
} from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+254 700 000 000',
    location: 'Nairobi, Kenya',
    organization: 'Kenya Human Rights Commission',
    role: 'Human Rights Advocate',
    joinDate: '2024-01-15',
    bio: 'Passionate about human rights advocacy and social justice in Kenya. Working to ensure accountability and transparency in governance.',
    avatar: null
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'limited',
    showLocation: false,
    showOrganization: true,
    emailNotifications: true,
    smsAlerts: true,
    anonymousReporting: true,
    dataBackup: true,
    twoFactorAuth: false
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    theme: 'light',
    notifications: true,
    sounds: true,
    autoSync: true,
    defaultPrivacy: 'anonymous'
  });

  // Sample activity data
  const activityHistory = [
    {
      id: 1,
      type: 'report',
      title: 'Submitted incident report',
      description: 'Police brutality case in Mathare',
      date: '2024-01-30T10:30:00Z',
      status: 'submitted',
      icon: <Report />
    },
    {
      id: 2,
      type: 'evidence',
      title: 'Uploaded evidence',
      description: 'Video evidence for case #EV001',
      date: '2024-01-29T15:45:00Z',
      status: 'verified',
      icon: <Upload />
    },
    {
      id: 3,
      type: 'update',
      title: 'Case update received',
      description: 'Investigation progress on case #RPT-2024-001',
      date: '2024-01-28T09:15:00Z',
      status: 'info',
      icon: <Info />
    },
    {
      id: 4,
      type: 'security',
      title: 'Security settings updated',
      description: 'Two-factor authentication enabled',
      date: '2024-01-27T14:20:00Z',
      status: 'success',
      icon: <Security />
    },
    {
      id: 5,
      type: 'profile',
      title: 'Profile completed',
      description: 'Added organization and role information',
      date: '2024-01-26T11:00:00Z',
      status: 'success',
      icon: <Person />
    }
  ];

  // Security devices
  const connectedDevices = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      type: 'mobile',
      location: 'Nairobi, Kenya',
      lastActive: '2024-01-30T18:30:00Z',
      current: true,
      icon: <Smartphone />
    },
    {
      id: 2,
      name: 'MacBook Pro',
      type: 'desktop',
      location: 'Nairobi, Kenya',
      lastActive: '2024-01-30T16:15:00Z',
      current: false,
      icon: <Computer />
    },
    {
      id: 3,
      name: 'iPad Air',
      type: 'tablet',
      location: 'Nairobi, Kenya',
      lastActive: '2024-01-29T20:45:00Z',
      current: false,
      icon: <Tablet />
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileUpdate = () => {
    setEditMode(false);
    // Handle profile update logic
  };

  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePreferenceChange = (setting, value) => {
    setPreferences(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const getActivityIcon = (type, status) => {
    const iconProps = {
      color: status === 'success' ? 'success' : 
             status === 'submitted' ? 'primary' :
             status === 'verified' ? 'success' :
             status === 'info' ? 'info' : 'default'
    };
    
    switch (type) {
      case 'report': return <Report {...iconProps} />;
      case 'evidence': return <Upload {...iconProps} />;
      case 'update': return <Info {...iconProps} />;
      case 'security': return <Security {...iconProps} />;
      case 'profile': return <Person {...iconProps} />;
      default: return <Info {...iconProps} />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <Home sx={{ mr: 0.5, fontSize: 20 }} />
            Mwangaza
          </Typography>
        </Link>
        <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountCircle sx={{ mr: 0.5, fontSize: 20 }} />
          Profile
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Person sx={{ mr: 2, fontSize: 48, color: 'primary.main' }} />
          Wasifu Wangu
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          My Profile & Settings
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}>
          Manage your account settings, privacy preferences, and view your activity history.
        </Typography>
      </Box>

      {/* Profile Overview Card */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              sx={{ 
                width: 120, 
                height: 120, 
                bgcolor: 'primary.dark',
                fontSize: 48,
                border: '4px solid',
                borderColor: 'primary.contrastText'
              }}
            >
              {profileData.firstName[0]}{profileData.lastName[0]}
            </Avatar>
          </Grid>
          
          <Grid item xs>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
              {profileData.role}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip 
                icon={<Work />} 
                label={profileData.organization} 
                color="default"
                sx={{ bgcolor: 'primary.contrastText', color: 'primary.main' }}
              />
              <Chip 
                icon={<LocationOn />} 
                label={profileData.location} 
                color="default"
                sx={{ bgcolor: 'primary.contrastText', color: 'primary.main' }}
              />
              <Chip 
                icon={<CalendarToday />} 
                label={`Joined ${new Date(profileData.joinDate).toLocaleDateString()}`} 
                color="default"
                sx={{ bgcolor: 'primary.contrastText', color: 'primary.main' }}
              />
            </Box>
            <Typography variant="body1" sx={{ maxWidth: 600, opacity: 0.9 }}>
              {profileData.bio}
            </Typography>
          </Grid>
          
          <Grid item>
            <Button 
              variant="contained" 
              color="inherit"
              startIcon={<Edit />}
              onClick={() => setEditMode(true)}
              sx={{ mr: 2 }}
            >
              Edit Profile
            </Button>
            <Button 
              variant="outlined" 
              color="inherit"
              startIcon={<PhotoCamera />}
            >
              Change Photo
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Paper elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            label="Personal Info" 
            icon={<Person />} 
            iconPosition="start"
          />
          <Tab 
            label="Privacy & Security" 
            icon={<Security />} 
            iconPosition="start"
          />
          <Tab 
            label="Preferences" 
            icon={<Settings />} 
            iconPosition="start"
          />
          <Tab 
            label="Activity History" 
            icon={<History />} 
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Personal Information
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    label="First Name" 
                    value={profileData.firstName}
                    disabled={!editMode}
                    onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    label="Last Name" 
                    value={profileData.lastName}
                    disabled={!editMode}
                    onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Email Address" 
                    value={profileData.email}
                    disabled={!editMode}
                    type="email"
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    label="Phone Number" 
                    value={profileData.phone}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    label="Location" 
                    value={profileData.location}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    label="Organization" 
                    value={profileData.organization}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: <Work sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                    onChange={(e) => setProfileData(prev => ({ ...prev, organization: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    label="Role" 
                    value={profileData.role}
                    disabled={!editMode}
                    onChange={(e) => setProfileData(prev => ({ ...prev, role: e.target.value }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Bio" 
                    value={profileData.bio}
                    disabled={!editMode}
                    multiline
                    rows={4}
                    placeholder="Tell us about yourself and your work in human rights..."
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  />
                </Grid>
              </Grid>
              
              {editMode && (
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    startIcon={<Save />}
                    onClick={handleProfileUpdate}
                  >
                    Save Changes
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<Cancel />}
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Account Statistics
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Report color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Reports Submitted" 
                    secondary="12 incidents documented"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Upload color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Evidence Uploaded" 
                    secondary="28 files secured"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Group color="info" /></ListItemIcon>
                  <ListItemText 
                    primary="Community Impact" 
                    secondary="3 cases resolved"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Shield color="warning" /></ListItemIcon>
                  <ListItemText 
                    primary="Security Score" 
                    secondary="95% protected"
                  />
                </ListItem>
              </List>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="outlined" startIcon={<Download />} fullWidth>
                  Export Data
                </Button>
                <Button variant="outlined" startIcon={<Help />} fullWidth>
                  Get Support
                </Button>
                <Button variant="outlined" startIcon={<Feedback />} fullWidth>
                  Send Feedback
                </Button>
                <Button variant="outlined" color="error" startIcon={<Delete />} fullWidth>
                  Delete Account
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <PrivacyTip sx={{ mr: 1 }} />
                Privacy Settings
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Profile Visibility" 
                    secondary="Control who can see your profile information"
                  />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select 
                      value={privacySettings.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    >
                      <MenuItem value="public">Public</MenuItem>
                      <MenuItem value="limited">Limited</MenuItem>
                      <MenuItem value="private">Private</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Show Location" 
                    secondary="Display your location in reports and profile"
                  />
                  <Switch 
                    checked={privacySettings.showLocation}
                    onChange={(e) => handlePrivacyChange('showLocation', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Show Organization" 
                    secondary="Display your organization in public listings"
                  />
                  <Switch 
                    checked={privacySettings.showOrganization}
                    onChange={(e) => handlePrivacyChange('showOrganization', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Anonymous Reporting" 
                    secondary="Use anonymous mode by default for incident reports"
                  />
                  <Switch 
                    checked={privacySettings.anonymousReporting}
                    onChange={(e) => handlePrivacyChange('anonymousReporting', e.target.checked)}
                  />
                </ListItem>
              </List>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <Security sx={{ mr: 1 }} />
                Security Settings
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Two-Factor Authentication" 
                    secondary="Add an extra layer of security to your account"
                  />
                  <Switch 
                    checked={privacySettings.twoFactorAuth}
                    onChange={(e) => handlePrivacyChange('twoFactorAuth', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Email Notifications" 
                    secondary="Receive security alerts and updates via email"
                  />
                  <Switch 
                    checked={privacySettings.emailNotifications}
                    onChange={(e) => handlePrivacyChange('emailNotifications', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="SMS Alerts" 
                    secondary="Receive critical alerts via SMS"
                  />
                  <Switch 
                    checked={privacySettings.smsAlerts}
                    onChange={(e) => handlePrivacyChange('smsAlerts', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Automatic Backup" 
                    secondary="Automatically backup your data and evidence"
                  />
                  <Switch 
                    checked={privacySettings.dataBackup}
                    onChange={(e) => handlePrivacyChange('dataBackup', e.target.checked)}
                  />
                </ListItem>
              </List>
              
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button variant="outlined" startIcon={<Key />}>
                  Change Password
                </Button>
                <Button variant="outlined" startIcon={<Download />}>
                  Backup Data
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <DeviceHub sx={{ mr: 1 }} />
                Connected Devices
              </Typography>
              
              <List>
                {connectedDevices.map((device) => (
                  <ListItem key={device.id} sx={{ mb: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                    <ListItemIcon>
                      {device.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {device.name}
                          {device.current && (
                            <Chip label="Current" size="small" color="success" sx={{ ml: 1 }} />
                          )}
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {device.location}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Last active: {formatDate(device.lastActive)}
                          </Typography>
                        </>
                      }
                    />
                    {!device.current && (
                      <IconButton color="error" size="small">
                        <Close />
                      </IconButton>
                    )}
                  </ListItem>
                ))}
              </List>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Monitor your account security by reviewing connected devices. 
                  Remove any devices you don't recognize.
                </Typography>
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeTab === 2 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <Settings sx={{ mr: 1 }} />
                App Preferences
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Language" 
                    secondary="Choose your preferred language"
                  />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select 
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="sw">Kiswahili</MenuItem>
                      <MenuItem value="ki">Kikuyu</MenuItem>
                      <MenuItem value="lu">Luo</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Theme" 
                    secondary="Choose between light and dark mode"
                  />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select 
                      value={preferences.theme}
                      onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="auto">Auto</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Notifications" 
                    secondary="Enable push notifications for updates"
                  />
                  <Switch 
                    checked={preferences.notifications}
                    onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Sound Effects" 
                    secondary="Play sounds for actions and alerts"
                  />
                  <Switch 
                    checked={preferences.sounds}
                    onChange={(e) => handlePreferenceChange('sounds', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Auto Sync" 
                    secondary="Automatically sync data across devices"
                  />
                  <Switch 
                    checked={preferences.autoSync}
                    onChange={(e) => handlePreferenceChange('autoSync', e.target.checked)}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <Shield sx={{ mr: 1 }} />
                Default Privacy
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  Set your default privacy level for new reports and submissions.
                </Typography>
              </Alert>
              
              <FormControl component="fieldset">
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Default Reporting Mode
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={preferences.defaultPrivacy === 'anonymous'}
                        onChange={(e) => handlePreferenceChange('defaultPrivacy', e.target.checked ? 'anonymous' : 'identified')}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">
                          Anonymous by Default
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          New reports will be submitted anonymously unless you choose otherwise
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
              </FormControl>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Data & Storage
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemIcon><Assessment color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Storage Used" 
                    secondary="2.3 GB of 10 GB available"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CloudSync color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Cloud Sync" 
                    secondary="Last synced 5 minutes ago"
                  />
                </ListItem>
              </List>
              
              <LinearProgress 
                variant="determinate" 
                value={23} 
                sx={{ mt: 2, height: 8, borderRadius: 4 }}
              />
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeTab === 3 && (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            <History sx={{ mr: 1 }} />
            Activity History
          </Typography>
          
          <Timeline>
            {activityHistory.map((activity, index) => (
              <TimelineItem key={activity.id}>
                <TimelineOppositeContent color="text.secondary" sx={{ py: 2 }}>
                  {formatDate(activity.date)}
                </TimelineOppositeContent>
                
                <TimelineSeparator>
                  <TimelineDot color={
                    activity.status === 'success' ? 'success' :
                    activity.status === 'submitted' ? 'primary' :
                    activity.status === 'verified' ? 'success' :
                    activity.status === 'info' ? 'info' : 'grey'
                  }>
                    {getActivityIcon(activity.type, activity.status)}
                  </TimelineDot>
                  {index < activityHistory.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                
                <TimelineContent sx={{ py: 2 }}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                      {activity.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {activity.description}
                    </Typography>
                    <Chip 
                      label={activity.status.toUpperCase()} 
                      size="small" 
                      color={
                        activity.status === 'success' ? 'success' :
                        activity.status === 'submitted' ? 'primary' :
                        activity.status === 'verified' ? 'success' :
                        activity.status === 'info' ? 'info' : 'default'
                      }
                    />
                  </Card>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="outlined" startIcon={<Download />}>
              Export Activity Log
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
} 