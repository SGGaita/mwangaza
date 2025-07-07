'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Security,
  Gavel,
  Search,
  Shield,
  Group,
  Assessment,
  Emergency,
  People,
  Analytics,
} from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const navigationItems = [
    { label: 'Ripoti Tukio', href: '/report', icon: <Security />, description: 'Report Incident' },
    { label: 'Jua Haki Yako', href: '/rights', icon: <Gavel />, description: 'Know Your Rights' },
    { label: 'Wapotea', href: '/missing', icon: <Search />, description: 'Missing Persons' },
    { label: 'Kumbukumbu', href: '/victims', icon: <People />, description: 'Victims Memorial' },
    { label: 'Kufuatilia Kesi', href: '/tracker', icon: <Assessment />, description: 'Case Tracker' },
    { label: 'Ulinzi wa Jamii', href: '/community', icon: <Shield />, description: 'Community Protection' },
    { label: 'Uchambuzi', href: '/analytics', icon: <Analytics />, description: 'Public Analytics' },
    { label: 'Dalili za Kidijitali', href: '/evidence', icon: <Group />, description: 'Digital Evidence' },
  ];

  const renderMobileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {navigationItems.map((item) => (
        <MenuItem
          key={item.href}
          onClick={handleMenuClose}
          component={Link}
          href={item.href}
          sx={{ py: 1.5, px: 2 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {item.icon}
            <Box>
              <Typography variant="body1" fontWeight={600}>
                {item.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
      ))}
    </Menu>
  );

  const renderUserMenu = (
    <Menu
      anchorEl={userMenuAnchor}
      open={Boolean(userMenuAnchor)}
      onClose={handleUserMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem onClick={handleUserMenuClose} component={Link} href="/profile">
        Profile
      </MenuItem>
      <MenuItem onClick={handleUserMenuClose} component={Link} href="/emergency">
        Emergency Contacts
      </MenuItem>
      <MenuItem onClick={handleUserMenuClose} component={Link} href="/settings">
        Settings
      </MenuItem>
      <MenuItem onClick={handleUserMenuClose}>
        Sign Out
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0, mr: 4 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {/* Logo - Stylized hand with star */}
            <Box
              sx={{
                width: 40,
                height: 40,
                mr: 2,
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
              }}
            >
              ✋⭐
            </Box>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #FFD700, #FFFFFF)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Mwangaza
            </Typography>
          </Box>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="inherit"
                startIcon={item.icon}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
          {/* Emergency Button */}
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<Emergency />}
            component={Link}
            href="/emergency"
            sx={{
              px: 2,
              py: 1,
              '&:hover': {
                backgroundColor: theme.palette.error.dark,
              },
            }}
          >
            {isMobile ? 'SOS' : 'Emergency'}
          </Button>

          {/* User Menu */}
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="user-menu-appbar"
            aria-haspopup="true"
            onClick={handleUserMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        {renderMobileMenu}
        {renderUserMenu}
      </Toolbar>

      {/* Beta Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Chip
          label="BETA"
          size="small"
          sx={{
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText,
            fontSize: '0.6rem',
            height: 18,
          }}
        />
      </Box>
    </AppBar>
  );
} 