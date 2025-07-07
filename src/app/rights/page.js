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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Chip,
  Paper,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Gavel,
  ExpandMore,
  CheckCircle,
  Warning,
  Info,
  Phone,
  Email,
  LocationOn,
  Search,
  Chat,
  Send,
  Security,
  Balance,
  AccountBalance,
  Group,
  Shield,
  School,
  Emergency,
  Download,
  Share,
} from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';

export default function RightsPage() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'bot',
      message: 'Hujambo! I am your legal rights assistant. Ask me anything about your constitutional rights in Kenya.',
      timestamp: new Date()
    }
  ]);

  const constitutionalRights = [
    {
      title: 'Right to Life',
      article: 'Article 26',
      description: 'Every person has the right to life. The State shall not deprive any person of life intentionally, except to the extent authorized by this Constitution or other written law.',
      category: 'Fundamental Rights',
      icon: <Security color="error" />,
      keyPoints: [
        'Right to life is supreme and cannot be limited',
        'State has duty to protect life',
        'Death penalty abolished in Kenya',
        'Right includes protection from extrajudicial killings'
      ]
    },
    {
      title: 'Right to Human Dignity',
      article: 'Article 28',
      description: 'Every person has inherent dignity and the right to have that dignity respected and protected.',
      category: 'Fundamental Rights',
      icon: <Balance color="primary" />,
      keyPoints: [
        'Inherent dignity of all persons',
        'Protection from degrading treatment',
        'Right to be treated with respect',
        'Includes protection of reputation'
      ]
    },
    {
      title: 'Freedom from Torture',
      article: 'Article 29',
      description: 'Every person has the right to freedom and security of the person, which includes not being subjected to torture.',
      category: 'Security Rights',
      icon: <Shield color="error" />,
      keyPoints: [
        'Absolute prohibition against torture',
        'Protection from cruel, inhuman treatment',
        'Right to security of person',
        'Prohibition against disappearances'
      ]
    },
    {
      title: 'Right to Fair Trial',
      article: 'Article 50',
      description: 'Every person has the right to a fair hearing before a court or tribunal.',
      category: 'Justice Rights',
      icon: <AccountBalance color="info" />,
      keyPoints: [
        'Right to be heard by competent court',
        'Presumption of innocence',
        'Right to legal representation',
        'Right to interpreter if needed'
      ]
    },
    {
      title: 'Freedom of Expression',
      article: 'Article 33',
      description: 'Every person has the right to freedom of expression, including freedom of the press and media.',
      category: 'Civil Rights',
      icon: <Group color="success" />,
      keyPoints: [
        'Freedom of speech and expression',
        'Freedom of press and media',
        'Right to receive information',
        'Academic freedom'
      ]
    },
    {
      title: 'Freedom of Assembly',
      article: 'Article 37',
      description: 'Every person has the right to peacefully assemble, demonstrate, picket and petition.',
      category: 'Civil Rights',
      icon: <Group color="warning" />,
      keyPoints: [
        'Right to peaceful assembly',
        'Right to demonstrate peacefully',
        'Right to picket',
        'Right to petition government'
      ]
    }
  ];

  const legalAidProviders = [
    {
      name: 'Kenya Human Rights Commission (KHRC)',
      type: 'Human Rights Organization',
      phone: '020 2092 000',
      email: 'admin@khrc.or.ke',
      website: 'https://www.khrc.or.ke',
      services: ['Human rights litigation', 'Legal aid', 'Documentation', 'Advocacy'],
      location: 'Nairobi'
    },
    {
      name: 'Independent Policing Oversight Authority (IPOA)',
      type: 'Government Agency',
      phone: '0800 720 711',
      email: 'info@ipoa.go.ke',
      website: 'https://ipoa.go.ke',
      services: ['Police misconduct complaints', 'Investigations', 'Legal assistance'],
      location: 'Nationwide'
    },
    {
      name: 'Law Society of Kenya (LSK)',
      type: 'Professional Body',
      phone: '020 2719 091',
      email: 'info@lsk.or.ke',
      website: 'https://www.lsk.or.ke',
      services: ['Legal aid referrals', 'Pro bono services', 'Legal advice'],
      location: 'Nationwide'
    },
    {
      name: 'Kituo Cha Sheria',
      type: 'Legal Aid Organization',
      phone: '020 387 4299',
      email: 'info@kituochasheria.or.ke',
      website: 'https://kituochasheria.or.ke',
      services: ['Free legal aid', 'Community education', 'Paralegal training'],
      location: 'Multiple locations'
    }
  ];

  const emergencyContacts = [
    { name: 'Police Emergency', number: '999', description: 'For immediate police assistance' },
    { name: 'Ambulance/Medical Emergency', number: '999', description: 'For medical emergencies' },
    { name: 'IPOA Hotline', number: '0800 720 711', description: 'Report police misconduct' },
    { name: 'Gender Violence Recovery Centre', number: '0719 638 006', description: 'Support for gender-based violence' },
    { name: 'Kenya Red Cross', number: '1199', description: 'Disaster response and emergency aid' }
  ];

  const filteredRights = constitutionalRights.filter(right =>
    right.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    right.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    right.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, {
      type: 'user',
      message: chatInput,
      timestamp: new Date()
    }]);

    // Simulate bot response (in real app, this would call an AI service)
    setTimeout(() => {
      let botResponse = "I understand your question about ";
      
      if (chatInput.toLowerCase().includes('arrest')) {
        botResponse = "When arrested, you have the right to: 1) Remain silent, 2) Be informed of the reason for arrest, 3) Contact a lawyer, 4) Be brought before court within 24 hours, 5) Not be tortured or mistreated. Would you like more details about any of these rights?";
      } else if (chatInput.toLowerCase().includes('police')) {
        botResponse = "Regarding police interactions: You have the right to be treated with dignity, ask for their identification, remain silent, and report misconduct to IPOA (0800 720 711). Never resist arrest physically, but you can challenge it legally later.";
      } else if (chatInput.toLowerCase().includes('demonstration') || chatInput.toLowerCase().includes('protest')) {
        botResponse = "You have the constitutional right to peaceful assembly under Article 37. This includes demonstrations, pickets, and petitions. However, the assembly must be peaceful and cannot violate others' rights. Notify authorities in advance when possible.";
      } else {
        botResponse = "That's an important legal question. I recommend consulting with a qualified lawyer for specific legal advice. You can contact Kenya Human Rights Commission (020 2092 000) or Law Society of Kenya for legal aid referrals.";
      }

      setChatMessages(prev => [...prev, {
        type: 'bot',
        message: botResponse,
        timestamp: new Date()
      }]);
    }, 1000);

    setChatInput('');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Gavel sx={{ mr: 2, fontSize: 48, color: 'primary.main' }} />
          Jua Haki Yako
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Know Your Rights & Legal Aid Platform
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.7 }}>
          Understanding your constitutional rights is the first step toward justice. 
          Access comprehensive legal information, connect with legal aid providers, 
          and get immediate assistance through our AI-powered legal chatbot.
        </Typography>
      </Box>

      {/* Search Rights */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Search Your Rights
        </Typography>
        <TextField
          fullWidth
          placeholder="Search for specific rights, keywords, or legal topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Paper>

      <Grid container spacing={4}>
        {/* Constitutional Rights */}
        <Grid item xs={12} lg={8}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Constitutional Rights
          </Typography>
          
          <Grid container spacing={3}>
            {filteredRights.map((right, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%', '&:hover': { boxShadow: theme.shadows[8] } }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {right.icon}
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {right.title}
                        </Typography>
                        <Chip size="small" label={right.article} color="primary" />
                        <Chip size="small" label={right.category} variant="outlined" sx={{ ml: 1 }} />
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                      {right.description}
                    </Typography>
                    
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="body2" fontWeight={600}>
                          Key Points
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List dense>
                          {right.keyPoints.map((point, idx) => (
                            <ListItem key={idx}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                              </ListItemIcon>
                              <ListItemText 
                                primary={point}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* AI Legal Chatbot */}
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <Chat sx={{ mr: 1 }} />
              Legal Rights Assistant
            </Typography>
            
            <Box sx={{ height: 300, overflowY: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2, mb: 2 }}>
              {chatMessages.map((msg, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    mb: 1 
                  }}>
                    <Paper 
                      sx={{ 
                        p: 1.5, 
                        maxWidth: '80%',
                        backgroundColor: msg.type === 'user' ? 'primary.main' : 'grey.100',
                        color: msg.type === 'user' ? 'white' : 'text.primary'
                      }}
                    >
                      <Typography variant="body2">
                        {msg.message}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              ))}
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ask about your rights..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
              />
              <IconButton onClick={handleChatSubmit} color="primary">
                <Send />
              </IconButton>
            </Box>
            
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                This AI assistant provides general legal information. For specific legal advice, consult a qualified lawyer.
              </Typography>
            </Alert>
          </Paper>

          {/* Emergency Contacts */}
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <Emergency sx={{ mr: 1, color: 'error.main' }} />
              Emergency Contacts
            </Typography>
            
            <List>
              {emergencyContacts.map((contact, index) => (
                <ListItem key={index} divider={index < emergencyContacts.length - 1}>
                  <ListItemIcon>
                    <Phone color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {contact.name}
                        </Typography>
                        <Chip size="small" label={contact.number} color="error" />
                      </Box>
                    }
                    secondary={contact.description}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Quick Actions */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Actions
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Security />}
                  component={Link}
                  href="/report"
                  color="error"
                >
                  Report Rights Violation
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => window.open('/documents/constitutional-rights-guide.pdf', '_blank')}
                >
                  Download Rights Guide
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Share />}
                >
                  Share Rights Info
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Legal Aid Providers */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Legal Aid Providers
        </Typography>
        
        <Grid container spacing={3}>
          {legalAidProviders.map((provider, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: theme.shadows[8] } }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    {provider.name}
                  </Typography>
                  <Chip size="small" label={provider.type} color="primary" sx={{ mb: 2 }} />
                  
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Phone sx={{ fontSize: 16 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={provider.phone}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Email sx={{ fontSize: 16 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={provider.email}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <LocationOn sx={{ fontSize: 16 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={provider.location}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                  
                  <Typography variant="body2" fontWeight={600} sx={{ mt: 2, mb: 1 }}>
                    Services:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {provider.services.map((service, idx) => (
                      <Chip key={idx} size="small" label={service} variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<Phone />}>
                    Call
                  </Button>
                  <Button size="small" startIcon={<Email />}>
                    Email
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Legal Resources */}
      <Box sx={{ mt: 6 }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3, background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`, color: 'white' }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Legal Resources & Documents
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <School sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  Constitution of Kenya
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  Complete text of Kenya's 2010 Constitution with Bill of Rights
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: 'white', color: 'primary.main' }}>
                  Download PDF
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Gavel sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  Legal Forms & Templates
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  Downloadable legal forms for common procedures and complaints
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: 'white', color: 'primary.main' }}>
                  Browse Forms
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Group sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  Community Education
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  Rights awareness materials in multiple languages
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: 'white', color: 'primary.main' }}>
                  View Materials
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
} 