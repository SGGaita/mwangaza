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
  Paper,
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
  IconButton,
  useTheme,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
} from '@mui/material';
import {
  Security,
  CloudUpload,
  Verified,
  Fingerprint,
  Lock,
  Shield,
  Description,
  PhotoCamera,
  Videocam,
  AudioFile,
  InsertDriveFile,
  Download,
  Share,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Warning,
  Error,
  Info,
  Close,
  Add,
  Search,
  FilterList,
  Sort,
  MoreVert,
  Calendar,
  LocationOn,
  Person,
  AccessTime,
  Storage,
  VerifiedUser,
  EnhancedEncryption,
  VpnKey,
  Backup,
  CloudQueue,
  Folder,
  FolderOpen,
  Assignment,
  AssignmentTurnedIn,
  Timeline,
  Assessment,
  Build,
  Code,
  BugReport,
  Science,
  Psychology,
  Gavel,
  AccountBalance,
  Balance,
  ExpandMore,
  GetApp,
  Publish,
  Link,
  ContentCopy,
  QrCode,
  Token,
  Key,
  CorporateFare,
  Dns,
  DataUsage,
  Memory,
  Devices,
  PhoneAndroid,
  Computer,
  CameraAlt,
  RecordVoiceOver,
  VideoLibrary,
  PictureAsPdf,
  TextSnippet,
  Archive,
} from '@mui/icons-material';
import { useState } from 'react';

export default function EvidencePage() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Sample evidence data
  const evidenceItems = [
    {
      id: 'EV001',
      name: 'Police_Brutality_Video.mp4',
      type: 'video',
      size: '45.2 MB',
      uploadDate: '2024-01-30',
      location: 'Mathare, Nairobi',
      verified: true,
      encrypted: true,
      hash: 'a1b2c3d4e5f6...',
      metadata: {
        duration: '02:45',
        resolution: '1920x1080',
        camera: 'iPhone 14 Pro',
        gps: '-1.2921, 36.8219',
        timestamp: '2024-01-29T15:30:22Z'
      },
      verificationStatus: 'verified',
      tamperScore: 100,
      tags: ['police brutality', 'excessive force', 'witness account']
    },
    {
      id: 'EV002',
      name: 'Witness_Statement_Audio.mp3',
      type: 'audio',
      size: '12.8 MB',
      uploadDate: '2024-01-29',
      location: 'Kibera, Nairobi',
      verified: true,
      encrypted: true,
      hash: 'b2c3d4e5f6a1...',
      metadata: {
        duration: '08:15',
        format: 'MP3 320kbps',
        device: 'Samsung Galaxy S23',
        timestamp: '2024-01-28T20:15:45Z'
      },
      verificationStatus: 'verified',
      tamperScore: 98,
      tags: ['witness statement', 'harassment', 'intimidation']
    },
    {
      id: 'EV003',
      name: 'Detention_Photos.zip',
      type: 'archive',
      size: '128.5 MB',
      uploadDate: '2024-01-28',
      location: 'Central Police Station',
      verified: false,
      encrypted: true,
      hash: 'c3d4e5f6a1b2...',
      metadata: {
        files: 15,
        format: 'ZIP Archive',
        compression: 'Standard'
      },
      verificationStatus: 'pending',
      tamperScore: null,
      tags: ['detention', 'conditions', 'human rights']
    }
  ];

  // Evidence types configuration
  const evidenceTypes = [
    { type: 'video', icon: <Videocam />, color: 'primary', label: 'Video Evidence' },
    { type: 'audio', icon: <AudioFile />, color: 'success', label: 'Audio Recording' },
    { type: 'image', icon: <PhotoCamera />, color: 'warning', label: 'Photo Evidence' },
    { type: 'document', icon: <Description />, color: 'info', label: 'Document' },
    { type: 'archive', icon: <Archive />, color: 'secondary', label: 'Archive' }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getTypeIcon = (type) => {
    const typeConfig = evidenceTypes.find(t => t.type === type);
    return typeConfig ? typeConfig.icon : <InsertDriveFile />;
  };

  const getTypeColor = (type) => {
    const typeConfig = evidenceTypes.find(t => t.type === type);
    return typeConfig ? typeConfig.color : 'default';
  };

  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getTamperScoreColor = (score) => {
    if (score >= 95) return 'success';
    if (score >= 80) return 'warning';
    return 'error';
  };

  const filteredEvidence = evidenceItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const EvidenceCard = ({ item }) => (
    <Card sx={{ 
      '&:hover': { 
        boxShadow: theme.shadows[8],
        transform: 'translateY(-2px)'
      },
      transition: 'all 0.3s ease',
      position: 'relative'
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 2, color: `${getTypeColor(item.type)}.main` }}>
              {getTypeIcon(item.type)}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.size} • {item.uploadDate}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {item.encrypted && (
              <Chip icon={<Lock />} label="Encrypted" size="small" color="success" />
            )}
            {item.verified && (
              <Chip icon={<Verified />} label="Verified" size="small" color="primary" />
            )}
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <LocationOn sx={{ fontSize: 14, mr: 0.5 }} />
            {item.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hash: {item.hash}
          </Typography>
        </Box>

        {item.tamperScore !== null && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Security sx={{ fontSize: 14, mr: 0.5 }} />
              Integrity Score: {item.tamperScore}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={item.tamperScore} 
              color={getTamperScoreColor(item.tamperScore)}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {item.tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      </CardContent>

      <CardActions>
        <Button size="small" startIcon={<Visibility />}>
          View Details
        </Button>
        <Button size="small" startIcon={<Download />}>
          Download
        </Button>
        <Button size="small" startIcon={<Share />}>
          Share
        </Button>
        <IconButton size="small">
          <MoreVert />
        </IconButton>
      </CardActions>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Security sx={{ mr: 2, fontSize: 48, color: 'primary.main' }} />
          Utunzaji wa Ushahidi
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Digital Forensics & Evidence Preservation Toolkit
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.7 }}>
          Secure evidence vault with end-to-end encryption, metadata verification, and tamper detection. 
          Preserve digital evidence with forensic-grade security and authentication.
        </Typography>
      </Box>

      {/* Security Notice */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          🔒 Maximum Security Evidence Vault
        </Typography>
        <Typography variant="body2">
          All evidence is encrypted end-to-end, verified with cryptographic hashes, and stored with complete metadata preservation. 
          Chain of custody is maintained through blockchain verification.
        </Typography>
      </Alert>

      {/* Tabs */}
      <Paper elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            label="Evidence Vault" 
            icon={<Storage />} 
            iconPosition="start"
          />
          <Tab 
            label="Upload & Verify" 
            icon={<CloudUpload />} 
            iconPosition="start"
          />
          <Tab 
            label="Forensic Tools" 
            icon={<Science />} 
            iconPosition="start"
          />
          <Tab 
            label="Legal Export" 
            icon={<Gavel />} 
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {activeTab === 0 && (
        <>
          {/* Search and Filters */}
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search evidence by name or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Filter by Type</InputLabel>
                  <Select 
                    value={filterType} 
                    onChange={(e) => setFilterType(e.target.value)}
                    label="Filter by Type"
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="video">Video Evidence</MenuItem>
                    <MenuItem value="audio">Audio Recording</MenuItem>
                    <MenuItem value="image">Photo Evidence</MenuItem>
                    <MenuItem value="document">Documents</MenuItem>
                    <MenuItem value="archive">Archives</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value="date">Upload Date</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="size">File Size</MenuItem>
                    <MenuItem value="verification">Verification Status</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={2}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  startIcon={<Add />}
                  onClick={() => setUploadDialogOpen(true)}
                  sx={{ height: 56 }}
                >
                  Upload Evidence
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Evidence Statistics */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Storage sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" color="primary.main" fontWeight={700}>
                  {evidenceItems.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Evidence Items
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Verified sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" color="success.main" fontWeight={700}>
                  {evidenceItems.filter(item => item.verified).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Verified Items
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <EnhancedEncryption sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" color="warning.main" fontWeight={700}>
                  100%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Encrypted
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Assessment sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h4" color="info.main" fontWeight={700}>
                  97%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg. Integrity
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Evidence Grid */}
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Evidence Vault
            <Chip 
              label={`${filteredEvidence.length} items`} 
              sx={{ ml: 2 }} 
              color="primary"
            />
          </Typography>

          <Grid container spacing={3}>
            {filteredEvidence.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item.id}>
                <EvidenceCard item={item} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Upload & Verification Center
          </Typography>
          
          {/* Upload Section */}
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              mb: 4, 
              borderRadius: 3,
              textAlign: 'center',
              border: '2px dashed',
              borderColor: 'primary.main',
              bgcolor: 'primary.light',
              color: 'primary.contrastText'
            }}
          >
            <CloudUpload sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
              Secure Evidence Upload
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Drag and drop files here or click to browse. All uploads are automatically encrypted and verified.
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              color="inherit"
              startIcon={<Add />}
              onClick={() => setUploadDialogOpen(true)}
            >
              Select Files to Upload
            </Button>
          </Paper>

          {/* Upload Guidelines */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
                  Supported File Types
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Videocam color="primary" /></ListItemIcon>
                    <ListItemText primary="Video: MP4, AVI, MOV, WMV (max 500MB)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><AudioFile color="success" /></ListItemIcon>
                    <ListItemText primary="Audio: MP3, WAV, M4A, OGG (max 100MB)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><PhotoCamera color="warning" /></ListItemIcon>
                    <ListItemText primary="Images: JPG, PNG, HEIC, RAW (max 50MB)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Description color="info" /></ListItemIcon>
                    <ListItemText primary="Documents: PDF, DOC, TXT (max 25MB)" />
                  </ListItem>
                </List>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <Security sx={{ mr: 1, color: 'primary.main' }} />
                  Security Features
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Lock color="success" /></ListItemIcon>
                    <ListItemText primary="End-to-end AES-256 encryption" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Fingerprint color="success" /></ListItemIcon>
                    <ListItemText primary="SHA-256 hash verification" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Timeline color="success" /></ListItemIcon>
                    <ListItemText primary="Blockchain timestamp proof" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Shield color="success" /></ListItemIcon>
                    <ListItemText primary="Tamper detection algorithms" />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Forensic Analysis Tools
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Science sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Metadata Analyzer
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Extract and analyze comprehensive metadata from digital evidence
                </Typography>
                <Button variant="outlined" fullWidth>
                  Launch Tool
                </Button>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Fingerprint sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Hash Verifier
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Verify file integrity and detect any tampering or modifications
                </Typography>
                <Button variant="outlined" fullWidth>
                  Verify Files
                </Button>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Timeline sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Timeline Builder
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Create chronological timeline of evidence and events
                </Typography>
                <Button variant="outlined" fullWidth>
                  Build Timeline
                </Button>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Assessment sx={{ fontSize: 48, color: 'info.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Authenticity Report
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Generate comprehensive authenticity and integrity reports
                </Typography>
                <Button variant="outlined" fullWidth>
                  Generate Report
                </Button>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Code sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Blockchain Proof
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Create immutable blockchain proof of evidence existence
                </Typography>
                <Button variant="outlined" fullWidth>
                  Create Proof
                </Button>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <BugReport sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Tamper Detection
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Advanced algorithms to detect any evidence manipulation
                </Typography>
                <Button variant="outlined" fullWidth>
                  Scan Evidence
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 3 && (
        <Box>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Legal Export & Documentation
          </Typography>
          
          <Alert severity="warning" sx={{ mb: 4 }}>
            <Typography fontWeight={600} sx={{ mb: 1 }}>
              ⚖️ Legal Evidence Package
            </Typography>
            <Typography variant="body2">
              Export evidence packages that meet legal admissibility standards with complete chain of custody documentation.
            </Typography>
          </Alert>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Evidence Package Builder
                </Typography>
                
                <Stepper orientation="vertical">
                  <Step active={true}>
                    <StepLabel>
                      <Typography variant="h6">Select Evidence Items</Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Choose evidence items to include in the legal package
                      </Typography>
                      <Button variant="outlined" size="small">
                        Select Evidence
                      </Button>
                    </StepContent>
                  </Step>
                  
                  <Step active={true}>
                    <StepLabel>
                      <Typography variant="h6">Chain of Custody</Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Document complete chain of custody information
                      </Typography>
                      <Button variant="outlined" size="small">
                        Add Custody Info
                      </Button>
                    </StepContent>
                  </Step>
                  
                  <Step active={true}>
                    <StepLabel>
                      <Typography variant="h6">Generate Package</Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Create legally-compliant evidence package with all documentation
                      </Typography>
                      <Button variant="contained" size="small" startIcon={<GetApp />}>
                        Export Package
                      </Button>
                    </StepContent>
                  </Step>
                </Stepper>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: 'fit-content' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Package Contents
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon><AssignmentTurnedIn color="success" /></ListItemIcon>
                    <ListItemText primary="Evidence files (encrypted)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Fingerprint color="success" /></ListItemIcon>
                    <ListItemText primary="Hash verification report" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Timeline color="success" /></ListItemIcon>
                    <ListItemText primary="Chain of custody log" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Assessment color="success" /></ListItemIcon>
                    <ListItemText primary="Authenticity certificate" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Security color="success" /></ListItemIcon>
                    <ListItemText primary="Technical metadata" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Gavel color="success" /></ListItemIcon>
                    <ListItemText primary="Legal compliance report" />
                  </ListItem>
                </List>
                
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  startIcon={<Download />}
                >
                  Download Template
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Upload Dialog */}
      <Dialog 
        open={uploadDialogOpen} 
        onClose={() => setUploadDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Upload Evidence</DialogTitle>
        
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Upload digital evidence for secure storage and verification. All files are automatically encrypted and verified.
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Evidence Title" 
                required 
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Evidence Type</InputLabel>
                <Select defaultValue="">
                  <MenuItem value="video">Video Evidence</MenuItem>
                  <MenuItem value="audio">Audio Recording</MenuItem>
                  <MenuItem value="image">Photo Evidence</MenuItem>
                  <MenuItem value="document">Document</MenuItem>
                  <MenuItem value="archive">Archive/Multiple Files</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Location" required />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Description" 
                multiline 
                rows={3}
                placeholder="Describe the evidence and circumstances"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Tags (comma-separated)" 
                placeholder="e.g., police brutality, excessive force, witness"
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<CloudUpload />}>
            Upload & Encrypt
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 