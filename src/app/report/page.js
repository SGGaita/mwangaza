'use client';

import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Button,
  Grid,
  Alert,
  Chip,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Security,
  Description,
  PhotoCamera,
  LocationOn,
  Send,
  Lock,
  VisibilityOff,
} from '@mui/icons-material';
import { useState } from 'react';
import { IncidentForm } from '../components/report/IncidentForm';
import { EvidenceUpload } from '../components/report/EvidenceUpload';
import { LocationPicker } from '../components/report/LocationPicker';
import { ReviewSubmission } from '../components/report/ReviewSubmission';

const steps = [
  {
    label: 'Incident Details',
    description: 'Describe what happened',
    icon: <Description />,
  },
  {
    label: 'Evidence',
    description: 'Upload photos, videos, audio',
    icon: <PhotoCamera />,
  },
  {
    label: 'Location',
    description: 'Mark incident location',
    icon: <LocationOn />,
  },
  {
    label: 'Review & Submit',
    description: 'Review and submit report',
    icon: <Send />,
  },
];

export default function ReportPage() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reportData, setReportData] = useState({
    incident: {},
    evidence: [],
    location: null,
    witnesses: [],
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setReportData({
      incident: {},
      evidence: [],
      location: null,
      witnesses: [],
    });
  };

  const updateReportData = (section, data) => {
    setReportData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <IncidentForm
            data={reportData.incident}
            onChange={(data) => updateReportData('incident', data)}
            isAnonymous={isAnonymous}
            onAnonymousChange={setIsAnonymous}
          />
        );
      case 1:
        return (
          <EvidenceUpload
            evidence={reportData.evidence}
            onChange={(data) => updateReportData('evidence', data)}
          />
        );
      case 2:
        return (
          <LocationPicker
            location={reportData.location}
            onChange={(data) => updateReportData('location', data)}
          />
        );
      case 3:
        return (
          <ReviewSubmission
            reportData={reportData}
            isAnonymous={isAnonymous}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.grey[50], minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
            Ripoti Tukio
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
            Incident Reporting & Documentation Hub
          </Typography>
          
          {/* Security Notice */}
          <Alert
            severity="info"
            icon={<Lock />}
            sx={{ mb: 3, borderRadius: 2 }}
          >
            <Typography fontWeight={600} sx={{ mb: 1 }}>
              🔒 Your submission is fully encrypted and secure
            </Typography>
            <Typography variant="body2">
              All data is encrypted end-to-end before leaving your device. Your identity is protected, 
              and you can choose to remain completely anonymous.
            </Typography>
          </Alert>

          {/* Anonymous Mode Toggle */}
          <Card sx={{ mb: 3, border: `2px solid ${isAnonymous ? theme.palette.success.main : theme.palette.primary.main}` }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <VisibilityOff sx={{ mr: 2, color: isAnonymous ? theme.palette.success.main : theme.palette.grey[500] }} />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Anonymous Reporting
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {isAnonymous 
                      ? 'Your identity will be completely protected' 
                      : 'You can be contacted for follow-up (optional)'
                    }
                  </Typography>
                </Box>
              </Box>
              <Button
                variant={isAnonymous ? "contained" : "outlined"}
                color={isAnonymous ? "success" : "primary"}
                onClick={() => setIsAnonymous(!isAnonymous)}
                sx={{ minWidth: 120 }}
              >
                {isAnonymous ? 'Anonymous' : 'Identified'}
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Stepper */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={() => (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: activeStep >= index ? theme.palette.primary.main : theme.palette.grey[300],
                        color: activeStep >= index ? 'white' : theme.palette.grey[600],
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {step.icon}
                    </Box>
                  )}
                >
                  <Typography variant="body1" fontWeight={600}>
                    {step.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Step Content */}
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          {renderStepContent(activeStep)}
        </Paper>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{ px: 4 }}
          >
            Back
          </Button>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {activeStep < steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ px: 4 }}
              >
                Continue
              </Button>
            )}
            
            {activeStep === steps.length - 1 && (
              <Button
                variant="contained"
                color="error"
                startIcon={<Send />}
                sx={{ px: 4 }}
                onClick={() => {
                  // Handle submission
                  alert('Report submitted successfully! Reference ID: MW-' + Date.now());
                  handleReset();
                }}
              >
                Submit Report
              </Button>
            )}
          </Box>
        </Box>

        {/* Help Section */}
        <Paper elevation={1} sx={{ mt: 4, p: 3, borderRadius: 3, backgroundColor: theme.palette.primary.main, color: 'white' }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Need Help or Have Questions?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                Emergency Hotlines
              </Typography>
              <Typography variant="body2">
                Police: 999 | IPOA: 0800 720 711
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                Legal Support
              </Typography>
              <Typography variant="body2">
                Kenya Human Rights Commission: 020 2092 000
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                Digital Security
              </Typography>
              <Typography variant="body2">
                All data encrypted • Anonymous options • Secure storage
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
} 