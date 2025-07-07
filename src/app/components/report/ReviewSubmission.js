'use client';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Button,
} from '@mui/material';
import {
  Security,
  LocationOn,
  PhotoCamera,
  Schedule,
  Warning,
  Person,
  Description,
  GpsFixed,
  Lock,
  VerifiedUser,
} from '@mui/icons-material';

export function ReviewSubmission({ reportData, isAnonymous }) {
  const { incident, evidence, location, witnesses } = reportData;

  const formatDate = (date) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleString();
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'LOW': return 'success';
      case 'MEDIUM': return 'warning';
      case 'HIGH': return 'error';
      case 'CRITICAL': return 'error';
      default: return 'default';
    }
  };

  const getFileIcon = (type) => {
    if (type?.startsWith('image/')) return <PhotoCamera />;
    if (type?.startsWith('video/')) return <PhotoCamera />;
    if (type?.startsWith('audio/')) return <PhotoCamera />;
    return <Description />;
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Review & Submit Report
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          🔍 Please review all information before submitting
        </Typography>
        <Typography variant="body2">
          Once submitted, your report will be encrypted and stored securely. 
          You will receive a reference ID to track your case.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Incident Details */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Description sx={{ mr: 1 }} />
                Incident Details
              </Typography>
              
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Title"
                    secondary={incident.title || 'Not specified'}
                  />
                </ListItem>
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Category"
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Chip
                          size="small"
                          label={incident.category || 'Not specified'}
                          color="primary"
                        />
                        {incident.severity && (
                          <Chip
                            size="small"
                            label={incident.severity}
                            color={getSeverityColor(incident.severity)}
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                
                {incident.subCategory && (
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary="Sub-category"
                      secondary={incident.subCategory}
                    />
                  </ListItem>
                )}
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Schedule />
                  </ListItemIcon>
                  <ListItemText
                    primary="Date & Time"
                    secondary={formatDate(incident.incidentDate)}
                  />
                </ListItem>
              </List>
              
              {incident.description && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                    Description:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {incident.description}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Location */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1 }} />
                Location Information
              </Typography>
              
              {location ? (
                <List dense>
                  {location.address && (
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary="Address"
                        secondary={location.address}
                      />
                    </ListItem>
                  )}
                  
                  {location.lat && location.lng && (
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <GpsFixed />
                      </ListItemIcon>
                      <ListItemText
                        primary="GPS Coordinates"
                        secondary={`${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`}
                      />
                    </ListItem>
                  )}
                  
                  {location.accuracy && (
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary="GPS Accuracy"
                        secondary={`±${Math.round(location.accuracy)} meters`}
                      />
                    </ListItem>
                  )}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No location information provided
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Evidence */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <PhotoCamera sx={{ mr: 1 }} />
                Evidence Files ({evidence?.length || 0})
              </Typography>
              
              {evidence && evidence.length > 0 ? (
                <Grid container spacing={2}>
                  {evidence.map((file, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          {getFileIcon(file.type)}
                          <Typography variant="body2" fontWeight={600} sx={{ ml: 1 }} noWrap>
                            {file.name}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {file.metadata?.gps && (
                            <Chip size="small" label="GPS" color="success" variant="outlined" />
                          )}
                          <Chip size="small" label="Timestamp" color="info" variant="outlined" />
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No evidence files uploaded
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Witnesses */}
        {witnesses && witnesses.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ mr: 1 }} />
                  Witnesses ({witnesses.length})
                </Typography>
                
                <List>
                  {witnesses.map((witness, index) => (
                    <ListItem key={index} divider={index < witnesses.length - 1}>
                      <ListItemText
                        primary={witness.isAnonymous ? 'Anonymous Witness' : witness.name}
                        secondary={
                          <Box>
                            {!witness.isAnonymous && witness.contact && (
                              <Typography variant="body2" color="text.secondary">
                                Contact: {witness.contact}
                              </Typography>
                            )}
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {witness.testimony}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Submission Summary */}
        <Grid item xs={12}>
          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography fontWeight={600} sx={{ mb: 1 }}>
              ✅ Report Ready for Submission
            </Typography>
            <Typography variant="body2">
              Report Type: {isAnonymous ? 'Anonymous' : 'Identified'} •
              Evidence Files: {evidence?.length || 0} •
              Location: {location?.address ? 'Provided' : 'Not provided'} •
              Witnesses: {witnesses?.length || 0}
            </Typography>
          </Alert>

          <Paper sx={{ p: 3, border: '2px solid', borderColor: 'success.main', backgroundColor: 'success.50' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Lock sx={{ mr: 2, color: 'success.main' }} />
              <Typography variant="h6" fontWeight={600} color="success.main">
                Security & Privacy Confirmation
              </Typography>
            </Box>
            
            <List dense>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <VerifiedUser sx={{ color: 'success.main' }} />
                </ListItemIcon>
                <ListItemText
                  primary="End-to-end encryption enabled"
                  secondary="Your data will be encrypted before transmission"
                />
              </ListItem>
              
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Security sx={{ color: 'success.main' }} />
                </ListItemIcon>
                <ListItemText
                  primary={isAnonymous ? "Anonymous submission" : "Identified submission"}
                  secondary={isAnonymous 
                    ? "Your identity will be completely protected" 
                    : "Your contact information may be used for follow-up"
                  }
                />
              </ListItem>
              
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Warning sx={{ color: 'warning.main' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Secure storage and handling"
                  secondary="Report will be stored securely and handled according to privacy policy"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 