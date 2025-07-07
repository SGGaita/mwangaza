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
  LinearProgress,
  Tab,
  Tabs,
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineDot,
  TimelineConnector,
  TimelineSeparator,
  InputAdornment,
  IconButton,
  useTheme,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  Gavel,
  AccountBalance,
  Assignment,
  TrendingUp,
  Schedule,
  Update,
  Star,
  Flag,
  School,
  Work,
  Home,
  Security,
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
  HowToVote,
} from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';

export default function TrackerPage() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedOfficial, setSelectedOfficial] = useState(null);

  // Sample cases data
  const cases = [
    {
      id: 'CASE001',
      title: 'Police Brutality Investigation - Mathare',
      category: 'police_brutality',
      status: 'under_investigation',
      priority: 'high',
      dateReported: '2024-01-15',
      lastUpdate: '2024-01-25',
      officialInvolved: 'Inspector James Mwangi',
      station: 'Mathare Police Station',
      progress: 60,
      stage: 'Evidence Collection',
      description: 'Investigation into alleged excessive force during arrest',
      updates: [
        { date: '2024-01-25', stage: 'Evidence Collection', description: 'Witness statements collected from 3 individuals' },
        { date: '2024-01-20', stage: 'Initial Investigation', description: 'IPOA opened formal investigation' },
        { date: '2024-01-15', stage: 'Case Reported', description: 'Initial report filed through Mwangaza platform' }
      ],
      outcome: null,
      publicInterest: 'high'
    },
    {
      id: 'CASE002',
      title: 'Corruption Case - County Procurement',
      category: 'corruption',
      status: 'court_proceedings',
      priority: 'critical',
      dateReported: '2024-01-10',
      lastUpdate: '2024-01-28',
      officialInvolved: 'County Director Mary Wanjiku',
      department: 'Nairobi County',
      progress: 80,
      stage: 'Court Hearings',
      description: 'Irregular procurement of medical supplies worth KSh 50M',
      updates: [
        { date: '2024-01-28', stage: 'Court Hearings', description: 'Prosecution presented financial evidence' },
        { date: '2024-01-22', stage: 'Case Filed', description: 'DPP filed charges in High Court' },
        { date: '2024-01-18', stage: 'DCI Investigation', description: 'Investigation completed, evidence forwarded to DPP' },
        { date: '2024-01-10', stage: 'Case Reported', description: 'Whistleblower report received' }
      ],
      outcome: null,
      publicInterest: 'critical'
    },
    {
      id: 'CASE003',
      title: 'Missing Person Case - David Kiprotich',
      category: 'enforced_disappearance',
      status: 'resolved',
      priority: 'medium',
      dateReported: '2024-01-20',
      lastUpdate: '2024-01-30',
      officialInvolved: 'Multiple departments',
      department: 'National Police Service',
      progress: 100,
      stage: 'Case Closed',
      description: 'Missing teenager found safe after community search',
      updates: [
        { date: '2024-01-30', stage: 'Case Closed', description: 'David found safe with relatives in Mombasa' },
        { date: '2024-01-25', stage: 'Active Search', description: 'Community volunteers joined search efforts' },
        { date: '2024-01-20', stage: 'Case Reported', description: 'Missing person report filed' }
      ],
      outcome: 'Person found safe',
      publicInterest: 'medium'
    }
  ];

  // Sample public officials data
  const publicOfficials = [
    {
      id: 'OFF001',
      name: 'Inspector James Mwangi',
      position: 'Police Inspector',
      department: 'National Police Service',
      station: 'Mathare Police Station',
      badgeNumber: 'NPS001234',
      yearsOfService: 12,
      casesInvolved: 3,
      pendingCases: 1,
      resolvedCases: 2,
      rating: 2.5,
      complaints: [
        { type: 'Excessive Force', count: 2, status: 'Under Investigation' },
        { type: 'Misconduct', count: 1, status: 'Resolved' }
      ],
      contactInfo: {
        phone: '0722 123 456',
        email: 'j.mwangi@nps.go.ke',
        office: 'Mathare Police Station'
      },
      photo: '/api/placeholder/150/150'
    },
    {
      id: 'OFF002',
      name: 'County Director Mary Wanjiku',
      position: 'Director of Procurement',
      department: 'Nairobi County Government',
      office: 'County Headquarters',
      employeeNumber: 'NCG2019001',
      yearsOfService: 8,
      casesInvolved: 2,
      pendingCases: 1,
      resolvedCases: 1,
      rating: 1.8,
      complaints: [
        { type: 'Corruption', count: 1, status: 'Court Proceedings' },
        { type: 'Conflict of Interest', count: 1, status: 'Under Review' }
      ],
      contactInfo: {
        phone: '0733 456 789',
        email: 'm.wanjiku@nairobi.go.ke',
        office: 'Nairobi County Headquarters, Level 8'
      },
      photo: '/api/placeholder/150/150'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'under_investigation': return 'warning';
      case 'court_proceedings': return 'info';
      case 'resolved': return 'success';
      case 'dismissed': return 'error';
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

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'police_brutality': return <Security />;
      case 'corruption': return <MonetizationOn />;
      case 'enforced_disappearance': return <Person />;
      case 'electoral_violations': return <HowToVote />;
      default: return <Assignment />;
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.officialInvolved.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || case_.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const CaseCard = ({ case_ }) => (
    <Card sx={{ 
      height: '100%', 
      '&:hover': { 
        boxShadow: theme.shadows[8],
        transform: 'translateY(-2px)'
      },
      transition: 'all 0.3s ease',
      position: 'relative'
    }}>
      {case_.priority === 'critical' && (
        <Chip 
          label="CRITICAL" 
          color="error" 
          size="small" 
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        />
      )}
      
      <CardContent>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Box sx={{ mr: 2 }}>
            {getCategoryIcon(case_.category)}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              {case_.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Case ID: {case_.id}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip 
                label={case_.status.replace('_', ' ').toUpperCase()} 
                color={getStatusColor(case_.status)} 
                size="small" 
              />
              <Chip 
                label={case_.priority.toUpperCase()} 
                color={getPriorityColor(case_.priority)} 
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
              primary={`Reported: ${new Date(case_.dateReported).toLocaleDateString()}`}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Update sx={{ fontSize: 16 }} />
            </ListItemIcon>
            <ListItemText 
              primary={`Last Update: ${new Date(case_.lastUpdate).toLocaleDateString()}`}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Person sx={{ fontSize: 16 }} />
            </ListItemIcon>
            <ListItemText 
              primary={case_.officialInvolved}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        </List>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Progress: {case_.stage}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={case_.progress} 
            sx={{ height: 8, borderRadius: 4 }}
            color={getStatusColor(case_.status)}
          />
          <Typography variant="caption" color="text.secondary">
            {case_.progress}% Complete
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          onClick={() => setSelectedCase(case_)}
          startIcon={<Visibility />}
        >
          View Details
        </Button>
        <Box>
          <IconButton size="small" color="primary">
            <Share />
          </IconButton>
          <IconButton size="small" color="primary">
            <NotificationsActive />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );

  const OfficialCard = ({ official }) => (
    <Card sx={{ 
      height: '100%', 
      '&:hover': { 
        boxShadow: theme.shadows[8],
        transform: 'translateY(-2px)'
      },
      transition: 'all 0.3s ease'
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Avatar 
            src={official.photo} 
            sx={{ width: 60, height: 60, mr: 2 }}
          >
            <Person />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {official.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {official.position}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {official.department}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Star sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
              <Typography variant="body2">
                {official.rating.toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" color="primary.main" fontWeight={600}>
              {official.casesInvolved}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Cases
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" color="warning.main" fontWeight={600}>
              {official.pendingCases}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Pending
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" color="success.main" fontWeight={600}>
              {official.resolvedCases}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Resolved
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Active Complaints:
        </Typography>
        {official.complaints.map((complaint, index) => (
          <Chip 
            key={index}
            label={`${complaint.type} (${complaint.count})`}
            size="small"
            color={complaint.status === 'Under Investigation' ? 'warning' : 'default'}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </CardContent>

      <CardActions>
        <Button 
          size="small" 
          onClick={() => setSelectedOfficial(official)}
          startIcon={<Visibility />}
        >
          View Profile
        </Button>
        <Button size="small" startIcon={<ContactMail />}>
          Contact
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Balance sx={{ mr: 2, fontSize: 48, color: 'primary.main' }} />
          Kufuatilia Uwazi
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Accountability & Case Tracker
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.7 }}>
          Monitor case progress, track accountability measures, and follow judicial outcomes. 
          Transparency through every step of the justice process.
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            label="Case Tracker" 
            icon={<Assignment />} 
            iconPosition="start"
          />
          <Tab 
            label="Public Officials" 
            icon={<SupervisorAccount />} 
            iconPosition="start"
          />
          <Tab 
            label="Judicial Outcomes" 
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
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Search Cases
            </Typography>
            
            <Grid container spacing={2} alignItems="end">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search by case title, ID, or official..."
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
                    <MenuItem value="under_investigation">Under Investigation</MenuItem>
                    <MenuItem value="court_proceedings">Court Proceedings</MenuItem>
                    <MenuItem value="resolved">Resolved</MenuItem>
                    <MenuItem value="dismissed">Dismissed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select 
                    value={categoryFilter} 
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    <MenuItem value="police_brutality">Police Brutality</MenuItem>
                    <MenuItem value="corruption">Corruption</MenuItem>
                    <MenuItem value="enforced_disappearance">Enforced Disappearance</MenuItem>
                    <MenuItem value="electoral_violations">Electoral Violations</MenuItem>
                  </Select>
                </FormControl>
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

          {/* Cases Grid */}
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Active Cases
            <Chip 
              label={`${filteredCases.length} cases`} 
              sx={{ ml: 2 }} 
              color="primary"
            />
          </Typography>

          <Grid container spacing={3}>
            {filteredCases.map((case_) => (
              <Grid item xs={12} md={6} lg={4} key={case_.id}>
                <CaseCard case_={case_} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {activeTab === 1 && (
        <>
          {/* Public Officials Grid */}
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Public Officials Database
            <Chip 
              label={`${publicOfficials.length} officials`} 
              sx={{ ml: 2 }} 
              color="primary"
            />
          </Typography>

          <Grid container spacing={3}>
            {publicOfficials.map((official) => (
              <Grid item xs={12} md={6} lg={4} key={official.id}>
                <OfficialCard official={official} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Judicial Outcomes & Statistics
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Gavel sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h3" color="primary.main" fontWeight={700}>
                  12
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Cases in Court
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                <Typography variant="h3" color="success.main" fontWeight={700}>
                  8
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Successful Prosecutions
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <AccessTime sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                <Typography variant="h3" color="warning.main" fontWeight={700}>
                  15
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Pending Investigations
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <TrendingUp sx={{ fontSize: 48, color: 'info.main', mb: 2 }} />
                <Typography variant="h3" color="info.main" fontWeight={700}>
                  67%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Resolution Rate
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Case Details Dialog */}
      <Dialog 
        open={!!selectedCase} 
        onClose={() => setSelectedCase(null)}
        maxWidth="lg"
        fullWidth
      >
        {selectedCase && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" fontWeight={600}>
                {selectedCase.title}
              </Typography>
              <IconButton onClick={() => setSelectedCase(null)}>
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>Case Timeline</Typography>
                  <Timeline>
                    {selectedCase.updates.map((update, index) => (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot color="primary" />
                          {index < selectedCase.updates.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="h6" component="span">
                            {update.stage}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(update.date).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2">
                            {update.description}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>Case Details</Typography>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Case ID" 
                        secondary={selectedCase.id}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Status" 
                        secondary={
                          <Chip 
                            label={selectedCase.status.replace('_', ' ').toUpperCase()} 
                            color={getStatusColor(selectedCase.status)} 
                            size="small" 
                          />
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Priority" 
                        secondary={
                          <Chip 
                            label={selectedCase.priority.toUpperCase()} 
                            color={getPriorityColor(selectedCase.priority)} 
                            size="small" 
                          />
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Official Involved" 
                        secondary={selectedCase.officialInvolved}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Progress" 
                        secondary={
                          <Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={selectedCase.progress} 
                              sx={{ mb: 1 }}
                            />
                            <Typography variant="caption">
                              {selectedCase.progress}% Complete
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setSelectedCase(null)}>Close</Button>
              <Button variant="outlined" startIcon={<NotificationsActive />}>
                Follow Case
              </Button>
              <Button variant="outlined" startIcon={<Share />}>Share</Button>
              <Button variant="contained" startIcon={<Download />}>
                Download Report
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Official Details Dialog */}
      <Dialog 
        open={!!selectedOfficial} 
        onClose={() => setSelectedOfficial(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedOfficial && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" fontWeight={600}>
                Official Profile
              </Typography>
              <IconButton onClick={() => setSelectedOfficial(null)}>
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar 
                      src={selectedOfficial.photo} 
                      sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
                    >
                      <Person sx={{ fontSize: 80 }} />
                    </Avatar>
                    <Typography variant="h5" fontWeight={600}>
                      {selectedOfficial.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {selectedOfficial.position}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedOfficial.department}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>Professional Information</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Years of Service</Typography>
                      <Typography variant="body1" fontWeight={600}>{selectedOfficial.yearsOfService} years</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Rating</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star sx={{ color: 'warning.main', mr: 0.5 }} />
                        <Typography variant="body1" fontWeight={600}>
                          {selectedOfficial.rating.toFixed(1)}/5.0
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>Contact Information</Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><PhoneIcon /></ListItemIcon>
                      <ListItemText primary={selectedOfficial.contactInfo.phone} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Email /></ListItemIcon>
                      <ListItemText primary={selectedOfficial.contactInfo.email} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><LocationOn /></ListItemIcon>
                      <ListItemText primary={selectedOfficial.contactInfo.office} />
                    </ListItem>
                  </List>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>Case Statistics</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="h4" color="primary.main" fontWeight={600}>
                        {selectedOfficial.casesInvolved}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Cases
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h4" color="warning.main" fontWeight={600}>
                        {selectedOfficial.pendingCases}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pending
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h4" color="success.main" fontWeight={600}>
                        {selectedOfficial.resolvedCases}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Resolved
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setSelectedOfficial(null)}>Close</Button>
              <Button variant="outlined" startIcon={<Email />}>
                Send Email
              </Button>
              <Button variant="contained" startIcon={<Flag />} color="warning">
                File Complaint
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
} 