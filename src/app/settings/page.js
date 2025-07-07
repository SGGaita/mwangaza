'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Switch,
  FormControlLabel,
  Divider,
  Breadcrumbs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Slider,
  RadioGroup,
  Radio,
  FormLabel,
} from '@mui/material';
import {
  Settings,
  Security,
  Notifications,
  Language,
  Palette,
  Storage,
  Backup,
  Shield,
  Lock,
  Key,
  Email,
  Phone,
  Visibility,
  VolumeUp,
  VolumeOff,
  DarkMode,
  LightMode,
  Translate,
  NotificationsActive,
  NotificationsOff,
  CloudSync,
  CloudOff,
  Download,
  Upload,
  RestoreFromTrash,
  DeleteForever,
  Warning,
  Info,
  CheckCircle,
  Error,
  Home,
  NavigateNext,
  ExpandMore,
  Save,
  RestorePage,
  AccountCircle,
  PrivacyTip,
  DeviceHub,
  Update,
  Build,
  BugReport,
  Feedback,
  Help,
  Contact,
  LocationOn,
  Public,
  PublicOff,
  Assignment,
  Timeline,
  Assessment,
  Computer,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Sync,
  SyncDisabled,
  AccessTime,
  Autorenew,
  PowerSettingsNew,
  Logout,
  ExitToApp,
  Close,
} from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    language: 'en',
    theme: 'light',
    autoSave: true,
    lowBandwidth: false,
    offlineMode: false,
    autoUpdate: true,
    analytics: false,
    crashReports: true,
    betaFeatures: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    biometricAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    deviceTrust: true,
    encryptionLevel: 'high',
    anonymousMode: true,
    secureDelete: true,
    vpnRequired: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: 'minimal',
    shareUsage: false,
    personalizedAds: false,
    locationTracking: 'reports_only',
    profileVisibility: 'limited',
    activityLogging: true,
    dataRetention: 365,
    autoDelete: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsAlerts: true,
    emergencyAlerts: true,
    caseUpdates: true,
    securityAlerts: true,
    systemUpdates: false,
    newsletter: false,
    soundEnabled: true,
    vibrationEnabled: true,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00'
  });

  const [storageSettings, setStorageSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    cloudSync: true,
    localStorage: true,
    cacheSize: 500,
    mediaCaching: true,
    offlineCapacity: 1000,
    compressionLevel: 'medium'
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleGeneralChange = (setting, value) => {
    setGeneralSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSecurityChange = (setting, value) => {
    setSecuritySettings(prev => ({ ...prev, [setting]: value }));
  };

  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleNotificationChange = (setting, value) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleStorageChange = (setting, value) => {
    setStorageSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleResetSettings = () => {
    // Reset all settings to defaults
    setResetDialogOpen(false);
  };

  const handleExportSettings = () => {
    // Export settings
    setExportDialogOpen(false);
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
          <Settings sx={{ mr: 0.5, fontSize: 20 }} />
          Settings
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Settings sx={{ mr: 2, fontSize: 48, color: 'primary.main' }} />
          Mipangilio
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          System Settings & Configuration
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.7 }}>
          Customize your Mwangaza experience with security, privacy, and performance settings tailored for human rights documentation.
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              Quick Actions
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Manage your account and system preferences efficiently
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="inherit"
                startIcon={<Download />}
                onClick={() => setExportDialogOpen(true)}
              >
                Export
              </Button>
              <Button 
                variant="outlined" 
                color="inherit"
                startIcon={<RestorePage />}
                onClick={() => setResetDialogOpen(true)}
              >
                Reset
              </Button>
            </Box>
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
          <Tab label="General" icon={<Settings />} iconPosition="start" />
          <Tab label="Security" icon={<Security />} iconPosition="start" />
          <Tab label="Privacy" icon={<PrivacyTip />} iconPosition="start" />
          <Tab label="Notifications" icon={<Notifications />} iconPosition="start" />
          <Tab label="Storage" icon={<Storage />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* General Settings Tab */}
      {activeTab === 0 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Language & Region
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText primary="Language" secondary="Choose your preferred language" />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select 
                      value={generalSettings.language}
                      onChange={(e) => handleGeneralChange('language', e.target.value)}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="sw">Kiswahili</MenuItem>
                      <MenuItem value="ki">Kikuyu</MenuItem>
                      <MenuItem value="lu">Luo</MenuItem>
                      <MenuItem value="ka">Kalenjin</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                
                <ListItem>
                  <ListItemText primary="Theme" secondary="Choose interface appearance" />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select 
                      value={generalSettings.theme}
                      onChange={(e) => handleGeneralChange('theme', e.target.value)}
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="auto">Auto</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Performance & Data
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Auto Save" 
                    secondary="Automatically save your work" 
                  />
                  <Switch 
                    checked={generalSettings.autoSave}
                    onChange={(e) => handleGeneralChange('autoSave', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Low Bandwidth Mode" 
                    secondary="Optimize for slower connections" 
                  />
                  <Switch 
                    checked={generalSettings.lowBandwidth}
                    onChange={(e) => handleGeneralChange('lowBandwidth', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Offline Mode" 
                    secondary="Enable offline functionality" 
                  />
                  <Switch 
                    checked={generalSettings.offlineMode}
                    onChange={(e) => handleGeneralChange('offlineMode', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Auto Updates" 
                    secondary="Automatically install updates" 
                  />
                  <Switch 
                    checked={generalSettings.autoUpdate}
                    onChange={(e) => handleGeneralChange('autoUpdate', e.target.checked)}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                System Information
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon><Computer /></ListItemIcon>
                  <ListItemText 
                    primary="App Version" 
                    secondary="v1.0.0 (Build 2024.01.30)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Update /></ListItemIcon>
                  <ListItemText 
                    primary="Last Update" 
                    secondary="January 30, 2024"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Storage /></ListItemIcon>
                  <ListItemText 
                    primary="Storage Used" 
                    secondary="2.3 GB of 10 GB"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Sync /></ListItemIcon>
                  <ListItemText 
                    primary="Sync Status" 
                    secondary="Last synced 5 minutes ago"
                  />
                </ListItem>
              </List>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Development & Support
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Anonymous Analytics" 
                    secondary="Help improve the platform" 
                  />
                  <Switch 
                    checked={generalSettings.analytics}
                    onChange={(e) => handleGeneralChange('analytics', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Crash Reports" 
                    secondary="Send error reports automatically" 
                  />
                  <Switch 
                    checked={generalSettings.crashReports}
                    onChange={(e) => handleGeneralChange('crashReports', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Beta Features" 
                    secondary="Access experimental features" 
                  />
                  <Switch 
                    checked={generalSettings.betaFeatures}
                    onChange={(e) => handleGeneralChange('betaFeatures', e.target.checked)}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Security Settings Tab */}
      {activeTab === 1 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Authentication
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Two-Factor Authentication" 
                    secondary="Extra security layer for your account" 
                  />
                  <Switch 
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Biometric Authentication" 
                    secondary="Use fingerprint or face recognition" 
                  />
                  <Switch 
                    checked={securitySettings.biometricAuth}
                    onChange={(e) => handleSecurityChange('biometricAuth', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Session Timeout" 
                    secondary="Auto logout after inactivity (minutes)" 
                  />
                  <FormControl size="small" sx={{ minWidth: 80 }}>
                    <Select 
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                    >
                      <MenuItem value={15}>15</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                      <MenuItem value={60}>60</MenuItem>
                      <MenuItem value={120}>120</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Password Expiry" 
                    secondary="Force password change (days)" 
                  />
                  <FormControl size="small" sx={{ minWidth: 80 }}>
                    <Select 
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => handleSecurityChange('passwordExpiry', e.target.value)}
                    >
                      <MenuItem value={30}>30</MenuItem>
                      <MenuItem value={60}>60</MenuItem>
                      <MenuItem value={90}>90</MenuItem>
                      <MenuItem value={180}>180</MenuItem>
                      <MenuItem value={0}>Never</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Data Protection
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Anonymous Mode" 
                    secondary="Default to anonymous reporting" 
                  />
                  <Switch 
                    checked={securitySettings.anonymousMode}
                    onChange={(e) => handleSecurityChange('anonymousMode', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Secure Delete" 
                    secondary="Permanently erase deleted data" 
                  />
                  <Switch 
                    checked={securitySettings.secureDelete}
                    onChange={(e) => handleSecurityChange('secureDelete', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Encryption Level" 
                    secondary="Data encryption strength" 
                  />
                  <FormControl size="small" sx={{ minWidth: 100 }}>
                    <Select 
                      value={securitySettings.encryptionLevel}
                      onChange={(e) => handleSecurityChange('encryptionLevel', e.target.value)}
                    >
                      <MenuItem value="standard">Standard</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="maximum">Maximum</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Security Status
              </Typography>
              
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  Your security score: 95% - Excellent protection level
                </Typography>
              </Alert>
              
              <List>
                <ListItem>
                  <ListItemIcon><Shield color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Encryption Active" 
                    secondary="All data encrypted with AES-256"
                  />
                  <CheckCircle color="success" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Lock color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Strong Password" 
                    secondary="Password meets security requirements"
                  />
                  <CheckCircle color="success" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Key color="warning" /></ListItemIcon>
                  <ListItemText 
                    primary="Two-Factor Auth" 
                    secondary="Enable for additional security"
                  />
                  <Warning color="warning" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><DeviceHub color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Trusted Devices" 
                    secondary="3 devices registered"
                  />
                  <CheckCircle color="success" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Privacy Settings Tab */}
      {activeTab === 2 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Data Collection
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Data Collection Level" 
                    secondary="How much data we collect" 
                  />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select 
                      value={privacySettings.dataCollection}
                      onChange={(e) => handlePrivacyChange('dataCollection', e.target.value)}
                    >
                      <MenuItem value="none">None</MenuItem>
                      <MenuItem value="minimal">Minimal</MenuItem>
                      <MenuItem value="standard">Standard</MenuItem>
                      <MenuItem value="full">Full</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Share Usage Statistics" 
                    secondary="Help improve the platform" 
                  />
                  <Switch 
                    checked={privacySettings.shareUsage}
                    onChange={(e) => handlePrivacyChange('shareUsage', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Location Tracking" 
                    secondary="When to track your location" 
                  />
                  <FormControl size="small" sx={{ minWidth: 140 }}>
                    <Select 
                      value={privacySettings.locationTracking}
                      onChange={(e) => handlePrivacyChange('locationTracking', e.target.value)}
                    >
                      <MenuItem value="never">Never</MenuItem>
                      <MenuItem value="reports_only">Reports Only</MenuItem>
                      <MenuItem value="always">Always</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Profile & Activity
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Profile Visibility" 
                    secondary="Who can see your profile" 
                  />
                  <FormControl size="small" sx={{ minWidth: 100 }}>
                    <Select 
                      value={privacySettings.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    >
                      <MenuItem value="private">Private</MenuItem>
                      <MenuItem value="limited">Limited</MenuItem>
                      <MenuItem value="public">Public</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Activity Logging" 
                    secondary="Log your platform activity" 
                  />
                  <Switch 
                    checked={privacySettings.activityLogging}
                    onChange={(e) => handlePrivacyChange('activityLogging', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Data Retention" 
                    secondary="Keep data for (days)" 
                  />
                  <FormControl size="small" sx={{ minWidth: 80 }}>
                    <Select 
                      value={privacySettings.dataRetention}
                      onChange={(e) => handlePrivacyChange('dataRetention', e.target.value)}
                    >
                      <MenuItem value={30}>30</MenuItem>
                      <MenuItem value={90}>90</MenuItem>
                      <MenuItem value={365}>365</MenuItem>
                      <MenuItem value={730}>730</MenuItem>
                      <MenuItem value={0}>Forever</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Privacy Overview
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  Your privacy level: High - Minimal data collection with strong protection
                </Typography>
              </Alert>
              
              <List>
                <ListItem>
                  <ListItemIcon><Shield color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Anonymous Reporting" 
                    secondary="Identity protection enabled"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Lock color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Data Encryption" 
                    secondary="All personal data encrypted"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><PublicOff color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Limited Visibility" 
                    secondary="Profile not publicly visible"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Assignment color="info" /></ListItemIcon>
                  <ListItemText 
                    primary="GDPR Compliant" 
                    secondary="Full data rights protection"
                  />
                </ListItem>
              </List>
              
              <Box sx={{ mt: 3 }}>
                <Button variant="outlined" fullWidth startIcon={<Download />}>
                  Download Privacy Report
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Notifications Tab */}
      {activeTab === 3 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Notification Channels
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Push Notifications" 
                    secondary="In-app notifications" 
                  />
                  <Switch 
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Email Notifications" 
                    secondary="Email alerts and updates" 
                  />
                  <Switch 
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="SMS Alerts" 
                    secondary="Critical alerts via SMS" 
                  />
                  <Switch 
                    checked={notificationSettings.smsAlerts}
                    onChange={(e) => handleNotificationChange('smsAlerts', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Sound Effects" 
                    secondary="Play notification sounds" 
                  />
                  <Switch 
                    checked={notificationSettings.soundEnabled}
                    onChange={(e) => handleNotificationChange('soundEnabled', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Vibration" 
                    secondary="Vibrate on notifications" 
                  />
                  <Switch 
                    checked={notificationSettings.vibrationEnabled}
                    onChange={(e) => handleNotificationChange('vibrationEnabled', e.target.checked)}
                  />
                </ListItem>
              </List>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Quiet Hours
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Enable Quiet Hours" 
                    secondary="Limit notifications during specified times" 
                  />
                  <Switch 
                    checked={notificationSettings.quietHours}
                    onChange={(e) => handleNotificationChange('quietHours', e.target.checked)}
                  />
                </ListItem>
                
                {notificationSettings.quietHours && (
                  <>
                    <ListItem>
                      <ListItemText primary="Start Time" />
                      <TextField
                        type="time"
                        size="small"
                        value={notificationSettings.quietStart}
                        onChange={(e) => handleNotificationChange('quietStart', e.target.value)}
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemText primary="End Time" />
                      <TextField
                        type="time"
                        size="small"
                        value={notificationSettings.quietEnd}
                        onChange={(e) => handleNotificationChange('quietEnd', e.target.value)}
                      />
                    </ListItem>
                  </>
                )}
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Content Types
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Emergency Alerts" 
                    secondary="Critical safety notifications" 
                  />
                  <Switch 
                    checked={notificationSettings.emergencyAlerts}
                    onChange={(e) => handleNotificationChange('emergencyAlerts', e.target.checked)}
                    color="error"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Case Updates" 
                    secondary="Progress on your reports" 
                  />
                  <Switch 
                    checked={notificationSettings.caseUpdates}
                    onChange={(e) => handleNotificationChange('caseUpdates', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Security Alerts" 
                    secondary="Account security notifications" 
                  />
                  <Switch 
                    checked={notificationSettings.securityAlerts}
                    onChange={(e) => handleNotificationChange('securityAlerts', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="System Updates" 
                    secondary="App and system notifications" 
                  />
                  <Switch 
                    checked={notificationSettings.systemUpdates}
                    onChange={(e) => handleNotificationChange('systemUpdates', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Newsletter" 
                    secondary="Platform news and updates" 
                  />
                  <Switch 
                    checked={notificationSettings.newsletter}
                    onChange={(e) => handleNotificationChange('newsletter', e.target.checked)}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Storage Tab */}
      {activeTab === 4 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Backup & Sync
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Auto Backup" 
                    secondary="Automatically backup your data" 
                  />
                  <Switch 
                    checked={storageSettings.autoBackup}
                    onChange={(e) => handleStorageChange('autoBackup', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Backup Frequency" 
                    secondary="How often to backup" 
                  />
                  <FormControl size="small" sx={{ minWidth: 100 }}>
                    <Select 
                      value={storageSettings.backupFrequency}
                      onChange={(e) => handleStorageChange('backupFrequency', e.target.value)}
                    >
                      <MenuItem value="hourly">Hourly</MenuItem>
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Cloud Sync" 
                    secondary="Sync data across devices" 
                  />
                  <Switch 
                    checked={storageSettings.cloudSync}
                    onChange={(e) => handleStorageChange('cloudSync', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Local Storage" 
                    secondary="Store data locally on device" 
                  />
                  <Switch 
                    checked={storageSettings.localStorage}
                    onChange={(e) => handleStorageChange('localStorage', e.target.checked)}
                  />
                </ListItem>
              </List>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Cache & Performance
              </Typography>
              
              <List>
                <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ListItemText 
                    primary="Cache Size (MB)" 
                    secondary="Amount of data to cache locally" 
                  />
                  <Slider
                    value={storageSettings.cacheSize}
                    onChange={(e, value) => handleStorageChange('cacheSize', value)}
                    min={100}
                    max={2000}
                    step={100}
                    marks
                    valueLabelDisplay="auto"
                    sx={{ width: '100%', mt: 2 }}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Media Caching" 
                    secondary="Cache images and videos" 
                  />
                  <Switch 
                    checked={storageSettings.mediaCaching}
                    onChange={(e) => handleStorageChange('mediaCaching', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Compression Level" 
                    secondary="Balance between quality and size" 
                  />
                  <FormControl size="small" sx={{ minWidth: 100 }}>
                    <Select 
                      value={storageSettings.compressionLevel}
                      onChange={(e) => handleStorageChange('compressionLevel', e.target.value)}
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Storage Overview
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon><Storage color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Total Storage" 
                    secondary="2.3 GB used of 10 GB available"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Backup color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Last Backup" 
                    secondary="2 hours ago - All data secured"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CloudSync color="info" /></ListItemIcon>
                  <ListItemText 
                    primary="Sync Status" 
                    secondary="Up to date across all devices"
                  />
                </ListItem>
              </List>
              
              <LinearProgress 
                variant="determinate" 
                value={23} 
                sx={{ mt: 2, mb: 3, height: 8, borderRadius: 4 }}
              />
              
              <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                <Button variant="outlined" startIcon={<Backup />} fullWidth>
                  Backup Now
                </Button>
                <Button variant="outlined" startIcon={<RestoreFromTrash />} fullWidth>
                  Clear Cache
                </Button>
                <Button variant="outlined" color="error" startIcon={<DeleteForever />} fullWidth>
                  Reset Storage
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Reset Dialog */}
      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)}>
        <DialogTitle>Reset Settings</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to reset all settings to their default values? This action cannot be undone.
          </Typography>
          <Alert severity="warning">
            This will reset all your preferences, security settings, and notifications.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleResetSettings} color="error" variant="contained">
            Reset All Settings
          </Button>
        </DialogActions>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)}>
        <DialogTitle>Export Settings</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Export your current settings configuration to a file for backup or transfer to another device.
          </Typography>
          <Alert severity="info">
            The exported file will contain all your preferences but not sensitive security data.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleExportSettings} variant="contained" startIcon={<Download />}>
            Export Settings
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 