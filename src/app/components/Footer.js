'use client';

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Phone,
  Email,
  Security,
  Gavel,
  Shield,
  GitHub,
  Twitter,
  Facebook,
} from '@mui/icons-material';

export function Footer() {
  const theme = useTheme();

  const emergencyContacts = [
    { name: 'Police Emergency', number: '999', type: 'emergency' },
    { name: 'Ambulance', number: '999', type: 'emergency' },
    { name: 'IPOA Hotline', number: '0800 720 711', type: 'rights' },
    { name: 'Kenya Human Rights Commission', number: '020 2092 000', type: 'rights' },
  ];

  const legalResources = [
    { name: 'Constitution of Kenya', href: '#' },
    { name: 'Bill of Rights', href: '#' },
    { name: 'Police Powers', href: '#' },
    { name: 'Digital Rights', href: '#' },
  ];

  const supportLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Security', href: '/security' },
    { name: 'Help Center', href: '/help' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Mwangaza */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 2,
                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                  }}
                >
                  ✋⭐
                </Box>
                <Typography variant="h6" fontWeight={700}>
                  Mwangaza
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                Empowering Kenyan citizens in documenting human rights abuses, advocating for 
                accountability, and fostering community resilience through digital transparency.
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.8 }}>
                "Mwangaza" - Swahili for light, clarity, and illumination
              </Typography>
            </Box>
          </Grid>

          {/* Emergency Contacts */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ mr: 1 }} />
              Emergency Contacts
            </Typography>
            <Box sx={{ mb: 3 }}>
              {emergencyContacts.map((contact, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {contact.name}
                  </Typography>
                  <Link
                    href={`tel:${contact.number}`}
                    color="inherit"
                    underline="hover"
                    sx={{ 
                      fontSize: '0.9rem',
                      opacity: 0.9,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {contact.type === 'emergency' ? (
                      <Security sx={{ fontSize: 16, mr: 0.5, color: theme.palette.error.light }} />
                    ) : (
                      <Gavel sx={{ fontSize: 16, mr: 0.5, color: theme.palette.warning.light }} />
                    )}
                    {contact.number}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Gavel sx={{ mr: 1 }} />
              Legal Resources
            </Typography>
            <Box sx={{ mb: 3 }}>
              {legalResources.map((resource, index) => (
                <Link
                  key={index}
                  href={resource.href}
                  color="inherit"
                  underline="hover"
                  sx={{ 
                    display: 'block',
                    mb: 1,
                    fontSize: '0.9rem',
                    opacity: 0.9,
                    '&:hover': { opacity: 1 }
                  }}
                >
                  {resource.name}
                </Link>
              ))}
            </Box>

            {/* Support Links */}
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Shield sx={{ mr: 1 }} />
              Support
            </Typography>
            <Box>
              {supportLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color="inherit"
                  underline="hover"
                  sx={{ 
                    display: 'block',
                    mb: 1,
                    fontSize: '0.9rem',
                    opacity: 0.9,
                    '&:hover': { opacity: 1 }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
              © 2024 Mwangaza Platform. Built for the people of Kenya.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.8rem' }}>
              End-to-end encrypted. Anonymous reporting. Community-driven.
            </Typography>
          </Box>

          {/* Social Links */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              sx={{ 
                color: theme.palette.primary.contrastText,
                opacity: 0.8,
                '&:hover': { opacity: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              size="small"
              sx={{ 
                color: theme.palette.primary.contrastText,
                opacity: 0.8,
                '&:hover': { opacity: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              size="small"
              sx={{ 
                color: theme.palette.primary.contrastText,
                opacity: 0.8,
                '&:hover': { opacity: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              <Email />
            </IconButton>
          </Box>
        </Box>

        {/* Security Notice */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 1,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.9, textAlign: 'center' }}>
            🔒 <strong>Security Notice:</strong> All data is encrypted end-to-end. 
            Your identity and submissions are protected. In case of emergency, use the red SOS button.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 