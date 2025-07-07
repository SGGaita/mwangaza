'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  InputAdornment,
  Avatar,
  Breadcrumbs,
  Pagination,
  Badge,
  IconButton,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardActions,
} from '@mui/material';
import {
  Person,
  Search,
  FilterList,
  LocationOn,
  CalendarToday,
  Warning,
  Info,
  Share,
  Print,
  Download,
  Visibility,
  VisibilityOff,
  Home,
  People,
  Cancel,
  CheckCircle,
  Schedule,
  Category,
  SortByAlpha,
  DateRange,
  Face,
  PersonSearch,
  Report,
  Emergency,
  Close,
  NavigateNext,
  Male,
  Female,
  PersonOutline,
  ContactSupport,
  Security,
  Place,
  Timeline,
  LocalPolice,
  Gavel,
  Assignment,
  Bookmark,
  BookmarkBorder,
  Flag,
  FlagOutlined,
} from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';

export default function VictimsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  const [selectedVictim, setSelectedVictim] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSensitiveContent, setShowSensitiveContent] = useState(false);

  // Sample victim data with realistic Kenyan information
  const victims = [
    {
      id: 1,
      name: 'James Kiprotich Mwangi',
      age: 28,
      gender: 'Male',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      category: 'enforced_disappearance',
      status: 'missing',
      date: '2024-01-15',
      location: 'Nairobi Central, Nairobi County',
      description: 'Human rights activist who disappeared after attending a peaceful demonstration against corruption. Last seen being taken by unidentified individuals near City Hall.',
      lastSeen: 'January 15, 2024 at 6:30 PM',
      reportedBy: 'Family Members',
      caseNumber: 'VIC-2024-001',
      investigating: 'IPOA',
      priority: 'high',
      tags: ['activist', 'demonstration', 'corruption'],
      familyContact: '+254 700 123 456',
      physicalDescription: 'Height: 5\'8", Medium build, Dark complexion, Short black hair',
      clothing: 'Blue jeans, white t-shirt, black jacket',
      circumstances: 'Was attending a peaceful anti-corruption demonstration when approached by three unidentified men in civilian clothes who forced him into a white vehicle.'
    },
    {
      id: 2,
      name: 'Grace Njeri Wanjiku',
      age: 34,
      gender: 'Female',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b9651a75?w=300&h=300&fit=crop&crop=face',
      category: 'extrajudicial_killing',
      status: 'deceased',
      date: '2024-01-10',
      location: 'Mathare, Nairobi County',
      description: 'Mother of three killed during police operation in Mathare. Witnesses report she was shot while trying to protect her children during a raid.',
      lastSeen: 'January 10, 2024 at 11:45 PM',
      reportedBy: 'Community Members',
      caseNumber: 'VIC-2024-002',
      investigating: 'IPOA',
      priority: 'critical',
      tags: ['police_brutality', 'mother', 'raid'],
      familyContact: '+254 700 234 567',
      physicalDescription: 'Height: 5\'4", Slim build, Medium complexion, Long braided hair',
      clothing: 'Floral dress, brown sandals',
      circumstances: 'Was at home with her three children when police conducted a night raid. Shot while attempting to shield her youngest child.'
    },
    {
      id: 3,
      name: 'David Otieno Ochieng',
      age: 22,
      gender: 'Male',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      category: 'abduction',
      status: 'found',
      date: '2024-01-08',
      location: 'Kisumu City, Kisumu County',
      description: 'University student abducted on his way home from campus. Found after 72 hours with signs of torture. Currently recovering in hospital.',
      lastSeen: 'January 8, 2024 at 7:00 PM',
      reportedBy: 'University Friends',
      caseNumber: 'VIC-2024-003',
      investigating: 'Kenya Police',
      priority: 'medium',
      tags: ['student', 'torture', 'recovered'],
      familyContact: '+254 700 345 678',
      physicalDescription: 'Height: 5\'10", Athletic build, Dark complexion, Short hair',
      clothing: 'University uniform, black shoes, blue backpack',
      circumstances: 'Was walking home from Maseno University when intercepted by unknown individuals in a black car. Found 72 hours later in Ahero with injuries.'
    },
    {
      id: 4,
      name: 'Mary Wambui Kariuki',
      age: 45,
      gender: 'Female',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      category: 'enforced_disappearance',
      status: 'missing',
      date: '2023-12-20',
      location: 'Nakuru Town, Nakuru County',
      description: 'Civil society leader and land rights advocate. Disappeared after receiving threats related to her work exposing illegal land grabbing.',
      lastSeen: 'December 20, 2023 at 2:00 PM',
      reportedBy: 'Human Rights Organization',
      caseNumber: 'VIC-2023-025',
      investigating: 'DCI',
      priority: 'high',
      tags: ['land_rights', 'advocate', 'threats'],
      familyContact: '+254 700 456 789',
      physicalDescription: 'Height: 5\'5", Medium build, Light complexion, Gray hair',
      clothing: 'Business suit, black handbag, reading glasses',
      circumstances: 'Left her office to meet with community members about land disputes. Her car was found abandoned near Lake Nakuru.'
    },
    {
      id: 5,
      name: 'Samuel Kipkoech Rotich',
      age: 19,
      gender: 'Male',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      category: 'extrajudicial_killing',
      status: 'deceased',
      date: '2023-12-15',
      location: 'Eldoret Town, Uasin Gishu County',
      description: 'College student shot during protests against police brutality. Video evidence shows he was unarmed and trying to help another injured protester.',
      lastSeen: 'December 15, 2023 at 3:30 PM',
      reportedBy: 'Fellow Students',
      caseNumber: 'VIC-2023-024',
      investigating: 'IPOA',
      priority: 'critical',
      tags: ['student', 'protest', 'unarmed'],
      familyContact: '+254 700 567 890',
      physicalDescription: 'Height: 5\'9", Tall and lean, Dark complexion, Short hair',
      clothing: 'Red t-shirt, black jeans, white sneakers',
      circumstances: 'Was participating in peaceful protest when police opened fire. Shot while trying to carry wounded protester to safety.'
    },
    {
      id: 6,
      name: 'Ruth Nyokabi Muthoni',
      age: 26,
      gender: 'Female',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
      category: 'abduction',
      status: 'investigating',
      date: '2023-11-28',
      location: 'Meru Town, Meru County',
      description: 'Journalist investigating corruption in county government. Abducted from her home by unknown individuals. Family received ransom demands.',
      lastSeen: 'November 28, 2023 at 10:00 PM',
      reportedBy: 'Media House',
      caseNumber: 'VIC-2023-022',
      investigating: 'DCI',
      priority: 'high',
      tags: ['journalist', 'corruption', 'ransom'],
      familyContact: '+254 700 678 901',
      physicalDescription: 'Height: 5\'6", Medium build, Medium complexion, Long hair',
      clothing: 'Pajamas (taken from home)',
      circumstances: 'Abducted from her apartment at night by four armed men. Neighbors heard screams but were too afraid to intervene.'
    },
    {
      id: 7,
      name: 'Peter Kamau Gathii',
      age: 31,
      gender: 'Male',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
      category: 'enforced_disappearance',
      status: 'missing',
      date: '2023-11-15',
      location: 'Thika Town, Kiambu County',
      description: 'Environmental activist documenting illegal logging in Aberdare Forest. Vanished after reporting threats from unknown individuals.',
      lastSeen: 'November 15, 2023 at 9:00 AM',
      reportedBy: 'Environmental Group',
      caseNumber: 'VIC-2023-020',
      investigating: 'DCI',
      priority: 'high',
      tags: ['environment', 'logging', 'activist'],
      familyContact: '+254 700 789 012',
      physicalDescription: 'Height: 5\'11", Lean build, Medium complexion, Beard',
      clothing: 'Khaki field jacket, brown boots, camera bag',
      circumstances: 'Was conducting field research in Aberdare Forest. His vehicle was found empty with signs of struggle.'
    },
    {
      id: 8,
      name: 'Esther Akinyi Oduya',
      age: 29,
      gender: 'Female',
      photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop&crop=face',
      category: 'extrajudicial_killing',
      status: 'deceased',
      date: '2023-10-22',
      location: 'Kibera, Nairobi County',
      description: 'Community health worker killed during protests over access to clean water. Shot by police while providing first aid to injured protesters.',
      lastSeen: 'October 22, 2023 at 2:15 PM',
      reportedBy: 'Health Organization',
      caseNumber: 'VIC-2023-018',
      investigating: 'IPOA',
      priority: 'critical',
      tags: ['health_worker', 'water_rights', 'protest'],
      familyContact: '+254 700 890 123',
      physicalDescription: 'Height: 5\'3", Petite build, Dark complexion, Short hair',
      clothing: 'White medical coat, red cross badge, stethoscope',
      circumstances: 'Was treating wounded protesters when police fired live ammunition into the crowd. Shot while kneeling beside an injured person.'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', count: victims.length },
    { value: 'enforced_disappearance', label: 'Enforced Disappearances', count: victims.filter(v => v.category === 'enforced_disappearance').length },
    { value: 'extrajudicial_killing', label: 'Extrajudicial Killings', count: victims.filter(v => v.category === 'extrajudicial_killing').length },
    { value: 'abduction', label: 'Abductions', count: victims.filter(v => v.category === 'abduction').length }
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'missing', label: 'Missing' },
    { value: 'deceased', label: 'Deceased' },
    { value: 'found', label: 'Found' },
    { value: 'investigating', label: 'Under Investigation' }
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'nairobi', label: 'Nairobi County' },
    { value: 'kisumu', label: 'Kisumu County' },
    { value: 'nakuru', label: 'Nakuru County' },
    { value: 'eldoret', label: 'Uasin Gishu County' },
    { value: 'meru', label: 'Meru County' }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleViewDetails = (victim) => {
    setSelectedVictim(victim);
    setDialogOpen(true);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'enforced_disappearance': return 'warning';
      case 'extrajudicial_killing': return 'error';
      case 'abduction': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'missing': return 'warning';
      case 'deceased': return 'error';
      case 'found': return 'success';
      case 'investigating': return 'info';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const formatCategory = (category) => {
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const VictimCard = ({ victim }) => (
    <Card sx={{ 
      height: '100%',
      position: 'relative',
      '&:hover': { 
        boxShadow: 8,
        transform: 'translateY(-2px)'
      },
      transition: 'all 0.3s ease',
      border: victim.priority === 'critical' ? `2px solid #d32f2f` : 'none'
    }}>
      {victim.priority === 'critical' && (
        <Chip 
          label="URGENT" 
          color="error" 
          size="small" 
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        />
      )}
      
      <CardMedia
        component="img"
        height="200"
        image={victim.photo}
        alt={victim.name}
        sx={{ 
          filter: showSensitiveContent ? 'none' : 'blur(5px)',
          cursor: 'pointer'
        }}
        onClick={() => setShowSensitiveContent(!showSensitiveContent)}
      />
      
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          {victim.name}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip 
            label={formatCategory(victim.category)} 
            color={getCategoryColor(victim.category)}
            size="small"
          />
          <Chip 
            label={formatStatus(victim.status)} 
            color={getStatusColor(victim.status)}
            size="small"
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Person sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {victim.gender}, Age {victim.age}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CalendarToday sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {new Date(victim.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOn sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {victim.location}
          </Typography>
        </Box>
        
        <Typography variant="body2" sx={{ 
          mb: 2, 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>
          {victim.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Case: {victim.caseNumber}
          </Typography>
        </Box>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
        <Button 
          variant="contained" 
          size="small"
          onClick={() => handleViewDetails(victim)}
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

  const filteredVictims = victims.filter(victim => {
    const matchesSearch = victim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         victim.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         victim.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || victim.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || victim.status === filterStatus;
    const matchesLocation = filterLocation === 'all' || 
                           victim.location.toLowerCase().includes(filterLocation.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  const sortedVictims = [...filteredVictims].sort((a, b) => {
    switch (sortBy) {
      case 'date_desc':
        return new Date(b.date) - new Date(a.date);
      case 'date_asc':
        return new Date(a.date) - new Date(b.date);
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const itemsPerPage = 12;
  const totalPages = Math.ceil(sortedVictims.length / itemsPerPage);
  const paginatedVictims = sortedVictims.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          <People sx={{ mr: 0.5, fontSize: 20 }} />
          Victims Memorial
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <People sx={{ mr: 2, fontSize: 48, color: 'error.main' }} />
          Kumbukumbu ya Wahanga
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Victims Memorial - Honoring Lives Lost and Missing
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.7 }}>
          A comprehensive database documenting cases of enforced disappearances, extrajudicial killings, 
          and abductions in Kenya. Every life matters, every story deserves to be told.
        </Typography>
      </Box>

      {/* Content Warning */}
      <Alert severity="warning" sx={{ mb: 4 }}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          ⚠️ Sensitive Content Warning
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          This page contains information about human rights violations that may be disturbing. 
          Images are blurred by default for sensitivity.
        </Typography>
        <Button 
          size="small" 
          onClick={() => setShowSensitiveContent(!showSensitiveContent)}
          startIcon={showSensitiveContent ? <VisibilityOff /> : <Visibility />}
        >
          {showSensitiveContent ? 'Hide' : 'Show'} Images
        </Button>
      </Alert>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category.value}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h3" fontWeight={700} color={
                category.value === 'enforced_disappearance' ? 'warning.main' :
                category.value === 'extrajudicial_killing' ? 'error.main' :
                category.value === 'abduction' ? 'info.main' : 'primary.main'
              }>
                {category.count}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {category.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Search and Filters */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by name, location, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                label="Category"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {statuses.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Location</InputLabel>
              <Select
                value={filterLocation}
                label="Location"
                onChange={(e) => setFilterLocation(e.target.value)}
              >
                {locations.map((location) => (
                  <MenuItem key={location.value} value={location.value}>
                    {location.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="date_desc">Newest First</MenuItem>
                <MenuItem value="date_asc">Oldest First</MenuItem>
                <MenuItem value="name_asc">Name A-Z</MenuItem>
                <MenuItem value="name_desc">Name Z-A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Results Summary */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          {filteredVictims.length} victim{filteredVictims.length !== 1 ? 's' : ''} found
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<Download />} size="small">
            Export List
          </Button>
          <Button variant="outlined" startIcon={<Print />} size="small">
            Print
          </Button>
        </Box>
      </Box>

      {/* Victims Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {paginatedVictims.map((victim) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={victim.id}>
            <VictimCard victim={victim} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {/* Victim Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedVictim && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1 }} />
                {selectedVictim.name}
              </Box>
              <IconButton onClick={() => setDialogOpen(false)}>
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="300"
                      image={selectedVictim.photo}
                      alt={selectedVictim.name}
                      sx={{ 
                        filter: showSensitiveContent ? 'none' : 'blur(5px)'
                      }}
                    />
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" fontWeight={600}>
                        {selectedVictim.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedVictim.gender}, Age {selectedVictim.age}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Chip 
                          label={formatCategory(selectedVictim.category)} 
                          color={getCategoryColor(selectedVictim.category)}
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Chip 
                          label={formatStatus(selectedVictim.status)} 
                          color={getStatusColor(selectedVictim.status)}
                          sx={{ mb: 1 }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Case Information
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon><Assignment /></ListItemIcon>
                      <ListItemText 
                        primary="Case Number" 
                        secondary={selectedVictim.caseNumber}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CalendarToday /></ListItemIcon>
                      <ListItemText 
                        primary="Date of Incident" 
                        secondary={new Date(selectedVictim.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><LocationOn /></ListItemIcon>
                      <ListItemText 
                        primary="Location" 
                        secondary={selectedVictim.location}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><LocalPolice /></ListItemIcon>
                      <ListItemText 
                        primary="Investigating Authority" 
                        secondary={selectedVictim.investigating}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Flag /></ListItemIcon>
                      <ListItemText 
                        primary="Priority Level" 
                        secondary={
                          <Chip 
                            label={selectedVictim.priority.toUpperCase()} 
                            color={getPriorityColor(selectedVictim.priority)}
                            size="small"
                          />
                        }
                      />
                    </ListItem>
                  </List>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Description
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedVictim.description}
                  </Typography>
                  
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Circumstances
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedVictim.circumstances}
                  </Typography>
                  
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Physical Description
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {selectedVictim.physicalDescription}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Last seen wearing:</strong> {selectedVictim.clothing}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {selectedVictim.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
              <Button variant="contained" startIcon={<Share />}>
                Share Case
              </Button>
              <Button variant="contained" startIcon={<Print />}>
                Print Details
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
} 