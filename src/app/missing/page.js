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
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  IconButton,
  useTheme,
  Tab,
  Tabs,
  Badge,
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
  Height,
  FitnessCenter,
  Palette,
  School,
  Work,
  Home,
  DirectionsCar,
  Map,
  People,
  Security,
} from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';
import GoogleMap from '../components/GoogleMap';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';

export default function MissingPage() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [reportStep, setReportStep] = useState(0);

  // Sample missing persons data with coordinates
  const missingPersons = [
    {
      id: 'MP001',
      name: 'Jane Wanjiku',
      age: 24,
      gender: 'Female',
      lastSeen: '2024-01-15',
      location: 'Westlands, Nairobi',
      coordinates: { lat: -1.2676, lng: 36.8072 },
      status: 'missing',
      photo: '/api/placeholder/150/150',
      description: 'Last seen wearing a blue dress and white sneakers. Has a small scar on left cheek.',
      height: '5\'4"',
      build: 'Medium',
      hairColor: 'Black',
      eyeColor: 'Brown',
      reportedBy: 'Family Member',
      contactPhone: '0722 123 456',
      caseNumber: 'OB/45/2024',
      rewards: 'KSh 50,000',
      circumstances: 'Left home for work but never arrived at office',
      priority: 'high'
    },
    {
      id: 'MP002',
      name: 'David Kiprotich',
      age: 16,
      gender: 'Male',
      lastSeen: '2024-01-20',
      location: 'Kibera, Nairobi',
      coordinates: { lat: -1.3133, lng: 36.7892 },
      status: 'found',
      photo: '/api/placeholder/150/150',
      description: 'School uniform - Starehe Boys Centre. Quiet personality, loves football.',
      height: '5\'6"',
      build: 'Slim',
      hairColor: 'Black',
      eyeColor: 'Brown',
      reportedBy: 'School',
      contactPhone: '0733 456 789',
      caseNumber: 'OB/52/2024',
      circumstances: 'Did not return home after school',
      priority: 'critical'
    },
    {
      id: 'MP003',
      name: 'Mary Akinyi',
      age: 35,
      gender: 'Female',
      lastSeen: '2024-01-18',
      location: 'Kisumu Central',
      coordinates: { lat: -0.0917, lng: 34.7680 },
      status: 'investigating',
      photo: '/api/placeholder/150/150',
      description: 'Wearing traditional kitenge dress. Works as a teacher.',
      height: '5\'2"',
      build: 'Medium',
      hairColor: 'Black',
      eyeColor: 'Brown',
      reportedBy: 'Colleague',
      contactPhone: '0744 789 012',
      caseNumber: 'OB/48/2024',
      circumstances: 'Failed to show up for important meeting',
      priority: 'medium'
    }
  ];

  // Statistics data for charts
  const statusData = [
    { name: 'Missing', value: 245, color: '#f44336' },
    { name: 'Found', value: 156, color: '#4caf50' },
    { name: 'Investigating', value: 89, color: '#ff9800' },
  ];

  const ageGroupData = [
    { name: '0-12', cases: 45 },
    { name: '13-17', cases: 123 },
    { name: '18-30', cases: 178 },
    { name: '31-50', cases: 98 },
    { name: '51+', cases: 46 },
  ];

  const monthlyData = [
    { month: 'Jan', reported: 32, found: 28 },
    { month: 'Feb', reported: 28, found: 25 },
    { month: 'Mar', reported: 45, found: 38 },
    { month: 'Apr', reported: 38, found: 35 },
    { month: 'May', reported: 41, found: 32 },
    { month: 'Jun', reported: 35, found: 31 },
  ];

  const reportingSteps = [
    { label: 'Personal Details', icon: <Person /> },
    { label: 'Physical Description', icon: <PhotoCamera /> },
    { label: 'Last Seen Information', icon: <LocationOn /> },
    { label: 'Additional Details', icon: <Description /> }
  ];

  const filteredPersons = missingPersons.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         person.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         person.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || person.status === statusFilter;
    const matchesLocation = !locationFilter || person.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'missing': return 'error';
      case 'found': return 'success';
      case 'investigating': return 'warning';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const PersonCard = ({ person }) => (
    <Card sx={{ 
      height: '100%', 
      '&:hover': { 
        boxShadow: theme.shadows[8],
        transform: 'translateY(-2px)'
      },
      transition: 'all 0.3s ease',
      position: 'relative'
    }}>
      {person.priority === 'critical' && (
        <Chip 
          label="URGENT" 
          color="error" 
          size="small" 
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        />
      )}
      
      <CardContent>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Avatar 
            src={person.photo} 
            sx={{ width: 80, height: 80, mr: 2 }}
          >
            <Person />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {person.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {person.age} years old • {person.gender}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Chip 
                label={person.status.toUpperCase()} 
                color={getStatusColor(person.status)} 
                size="small" 
              />
              <Chip 
                label={person.priority.toUpperCase()} 
                color={getPriorityColor(person.priority)} 
                size="small" 
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>

        <List dense>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CalendarToday sx={{ fontSize: 16 }} />
            </ListItemIcon>
            <ListItemText 
              primary={`Last seen: ${new Date(person.lastSeen).toLocaleDateString()}`}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <LocationOn sx={{ fontSize: 16 }} />
            </ListItemIcon>
            <ListItemText 
              primary={person.location}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Security sx={{ fontSize: 16 }} />
            </ListItemIcon>
            <ListItemText 
              primary={`Case #: ${person.caseNumber}`}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        </List>

        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
          "{person.description}"
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          onClick={() => setSelectedPerson(person)}
          startIcon={<Visibility />}
        >
          View Details
        </Button>
        <Box>
          <IconButton size="small" color="primary">
            <Share />
          </IconButton>
          <IconButton size="small" color="primary">
            <Print />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );

  const PersonDetailsDialog = () => (
    <Dialog 
      open={!!selectedPerson} 
      onClose={() => setSelectedPerson(null)}
      maxWidth="md"
      fullWidth
    >
      {selectedPerson && (
        <>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight={600}>
              {selectedPerson.name} - Case Details
            </Typography>
            <IconButton onClick={() => setSelectedPerson(null)}>
              <Close />
            </IconButton>
          </DialogTitle>
          
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar 
                    src={selectedPerson.photo} 
                    sx={{ width: 200, height: 200, mx: 'auto', mb: 2 }}
                  >
                    <Person sx={{ fontSize: 100 }} />
                  </Avatar>
                  
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
                    <Chip 
                      label={selectedPerson.status.toUpperCase()} 
                      color={getStatusColor(selectedPerson.status)} 
                    />
                    <Chip 
                      label={selectedPerson.priority.toUpperCase()} 
                      color={getPriorityColor(selectedPerson.priority)} 
                      variant="outlined"
                    />
                  </Box>

                  {selectedPerson.rewards && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight={600}>
                        Reward: {selectedPerson.rewards}
                      </Typography>
                    </Alert>
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>Personal Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Full Name</Typography>
                    <Typography variant="body1" fontWeight={600}>{selectedPerson.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Age</Typography>
                    <Typography variant="body1" fontWeight={600}>{selectedPerson.age} years</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Gender</Typography>
                    <Typography variant="body1" fontWeight={600}>{selectedPerson.gender}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Height</Typography>
                    <Typography variant="body1" fontWeight={600}>{selectedPerson.height}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Build</Typography>
                    <Typography variant="body1" fontWeight={600}>{selectedPerson.build}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Hair Color</Typography>
                    <Typography variant="body1" fontWeight={600}>{selectedPerson.hairColor}</Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>Last Seen Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Date</Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {new Date(selectedPerson.lastSeen).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Location</Typography>
                    <Typography variant="body1" fontWeight={600}>{selectedPerson.location}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Circumstances</Typography>
                    <Typography variant="body1">{selectedPerson.circumstances}</Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>Case Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Case Number</Typography>
                    <Typography variant="body1" fontWeight={600}>{selectedPerson.caseNumber}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Reported By</Typography>
                    <Typography variant="body1" fontWeight={600}>{selectedPerson.reportedBy}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Contact Information</Typography>
                    <Typography variant="body1" fontWeight={600}>{selectedPerson.contactPhone}</Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" color="text.secondary">Description</Typography>
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    "{selectedPerson.description}"
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={() => setSelectedPerson(null)}>Close</Button>
            <Button variant="outlined" startIcon={<Share />}>Share</Button>
            <Button variant="outlined" startIcon={<Print />}>Print Flyer</Button>
            <Button variant="contained" startIcon={<Phone />} color="error">
              Report Sighting
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );

  const ReportMissingDialog = () => (
    <Dialog 
      open={reportDialogOpen} 
      onClose={() => setReportDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Report Missing Person
      </DialogTitle>
      
      <DialogContent>
        <Stepper activeStep={reportStep} alternativeLabel sx={{ mb: 4 }}>
          {reportingSteps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel icon={step.icon}>
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {reportStep === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Full Name" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Age" type="number" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select defaultValue="">
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Nationality" defaultValue="Kenyan" />
            </Grid>
          </Grid>
        )}

        {reportStep === 1 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Height" placeholder="e.g., 5'6&quot;" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Build</InputLabel>
                <Select defaultValue="">
                  <MenuItem value="Slim">Slim</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Heavy">Heavy</MenuItem>
                  <MenuItem value="Athletic">Athletic</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Hair Color" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Eye Color" />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Distinguishing Marks" 
                multiline 
                rows={3}
                placeholder="Scars, tattoos, birthmarks, etc."
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" startIcon={<PhotoCamera />} fullWidth>
                Upload Photo
              </Button>
            </Grid>
          </Grid>
        )}

        {reportStep === 2 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Last Seen Date" 
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Last Seen Location" required />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Clothing Description" 
                multiline 
                rows={2}
                placeholder="What were they wearing when last seen?"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Circumstances" 
                multiline 
                rows={3}
                placeholder="Describe the circumstances of disappearance"
                required
              />
            </Grid>
          </Grid>
        )}

        {reportStep === 3 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Your Name" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Relationship" required placeholder="e.g., Parent, Sibling, Friend" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Phone Number" required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email Address" type="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Additional Information" 
                multiline 
                rows={3}
                placeholder="Any other relevant details"
              />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info">
                <Typography variant="body2">
                  This report will be immediately shared with local authorities and the public database. 
                  Please ensure all information is accurate.
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={() => setReportDialogOpen(false)}>Cancel</Button>
        {reportStep > 0 && (
          <Button onClick={() => setReportStep(reportStep - 1)}>Back</Button>
        )}
        {reportStep < reportingSteps.length - 1 ? (
          <Button 
            variant="contained" 
            onClick={() => setReportStep(reportStep + 1)}
          >
            Next
          </Button>
        ) : (
          <Button variant="contained" startIcon={<Send />} color="error">
            Submit Report
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Search sx={{ mr: 2, fontSize: 48, color: 'warning.main' }} />
          Wapotea
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Missing Persons & Abduction Tracker
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.7 }}>
          Our comprehensive database helps families find their loved ones through community collaboration, 
          official partnerships, and real-time alerts. Every missing person matters.
        </Typography>
      </Box>

      {/* Emergency Alert */}
      <Alert severity="error" sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontWeight={600}>
            Missing someone? Time is critical. Report immediately and alert the community.
          </Typography>
          <Button 
            variant="contained" 
            color="error" 
            startIcon={<Emergency />}
            onClick={() => setReportDialogOpen(true)}
          >
            Report Missing Person
          </Button>
        </Box>
      </Alert>

      {/* Search and Filters */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Search Missing Persons Database
        </Typography>
        
        <Grid container spacing={2} alignItems="end">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by name, location, or case number..."
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
              <InputLabel>Status</InputLabel>
              <Select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Cases</MenuItem>
                <MenuItem value="missing">Missing</MenuItem>
                <MenuItem value="found">Found</MenuItem>
                <MenuItem value="investigating">Under Investigation</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Filter by location"
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<FilterList />}
              sx={{ height: 56 }}
            >
              More Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Statistics Dashboard */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 3, bgcolor: 'error.light' }}>
            <Typography variant="h3" fontWeight={700} color="error.contrastText">
              {statusData.find(s => s.name === 'Missing')?.value || 0}
            </Typography>
            <Typography color="error.contrastText">Currently Missing</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 3, bgcolor: 'success.light' }}>
            <Typography variant="h3" fontWeight={700} color="success.contrastText">
              {statusData.find(s => s.name === 'Found')?.value || 0}
            </Typography>
            <Typography color="success.contrastText">Successfully Found</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 3, bgcolor: 'warning.light' }}>
            <Typography variant="h3" fontWeight={700} color="warning.contrastText">
              {statusData.find(s => s.name === 'Investigating')?.value || 0}
            </Typography>
            <Typography color="warning.contrastText">Under Investigation</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 3, bgcolor: 'info.light' }}>
            <Typography variant="h3" fontWeight={700} color="info.contrastText">
              {statusData.reduce((sum, s) => sum + s.value, 0)}
            </Typography>
            <Typography color="info.contrastText">Total Cases</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Charts and Map Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Status Distribution Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Cases by Status
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Age Group Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Cases by Age Group
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ageGroupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="cases" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Monthly Trends Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Monthly Trends
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="reported" 
                  stroke="#f44336" 
                  name="Reported"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="found" 
                  stroke="#4caf50" 
                  name="Found"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Interactive Map */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={600}>
            Missing Persons Location Map
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="outlined" 
              size="small"
              startIcon={<Add />}
              onClick={() => setReportDialogOpen(true)}
            >
              Report Missing Person
            </Button>
            <Button 
              variant="outlined" 
              size="small"
              startIcon={<Map />}
            >
              View Full Map
            </Button>
          </Box>
        </Box>

        <GoogleMap
          locations={missingPersons.map(person => ({
            ...person,
            type: person.status === 'missing' ? 'incident' : 'safe_space',
            category: person.status.charAt(0).toUpperCase() + person.status.slice(1),
            verified: person.status === 'found',
          }))}
          center={{ lat: -1.2921, lng: 36.8219 }}
          zoom={10}
          height={400}
          showControls={true}
          showSafeSpaces={false}
          showIncidents={true}
          onLocationClick={(location) => {
            const person = missingPersons.find(p => p.id === location.id);
            if (person) {
              setSelectedPerson(person);
            }
          }}
        />
      </Paper>

      {/* Missing Persons Grid */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Missing Persons Database
        <Chip 
          label={`${filteredPersons.length} cases`} 
          sx={{ ml: 2 }} 
          color="primary"
        />
      </Typography>

      <Grid container spacing={3}>
        {filteredPersons.map((person) => (
          <Grid item xs={12} md={6} lg={4} key={person.id}>
            <PersonCard person={person} />
          </Grid>
        ))}
      </Grid>

      {filteredPersons.length === 0 && (
        <Paper sx={{ p: 6, textAlign: 'center', mt: 4 }}>
          <Search sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No missing persons found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Paper>
      )}

      {/* Community Support Section */}
      <Box sx={{ mt: 6 }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3, background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`, color: 'white' }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            How You Can Help
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Visibility sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  Keep Your Eyes Open
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Check our database regularly and be aware of missing persons in your area
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Share sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  Share Information
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Share missing person alerts on social media and with your networks
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Phone sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  Report Sightings
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  If you see someone, contact authorities and families immediately
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Dialogs */}
      <PersonDetailsDialog />
      <ReportMissingDialog />
    </Container>
  );
} 