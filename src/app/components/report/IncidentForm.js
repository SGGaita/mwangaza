'use client';

import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Grid,
  Card,
  CardContent,
  Alert,
  Chip,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Warning,
  Add,
  Delete,
  Person,
  Security,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

const incidentCategories = [
  { value: 'POLICE_BRUTALITY', label: 'Police Brutality', severity: 'high' },
  { value: 'EXTRAJUDICIAL_KILLING', label: 'Extrajudicial Killing', severity: 'critical' },
  { value: 'ENFORCED_DISAPPEARANCE', label: 'Enforced Disappearance', severity: 'critical' },
  { value: 'ABDUCTION', label: 'Abduction', severity: 'high' },
  { value: 'SEXUAL_ASSAULT', label: 'Sexual Assault', severity: 'high' },
  { value: 'TORTURE', label: 'Torture', severity: 'high' },
  { value: 'ARBITRARY_ARREST', label: 'Arbitrary Arrest', severity: 'medium' },
  { value: 'UNLAWFUL_DETENTION', label: 'Unlawful Detention', severity: 'medium' },
  { value: 'HARASSMENT', label: 'Harassment', severity: 'medium' },
  { value: 'PROPERTY_DAMAGE', label: 'Property Damage', severity: 'medium' },
  { value: 'LOOTING', label: 'Looting', severity: 'medium' },
  { value: 'FREEDOM_OF_ASSEMBLY', label: 'Violation of Freedom of Assembly', severity: 'medium' },
  { value: 'FREEDOM_OF_EXPRESSION', label: 'Violation of Freedom of Expression', severity: 'medium' },
  { value: 'OTHER', label: 'Other', severity: 'low' },
];

const severityColors = {
  low: 'success',
  medium: 'warning',
  high: 'error',
  critical: 'error',
};

export function IncidentForm({ data, onChange, isAnonymous, onAnonymousChange }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subCategory: '',
    description: '',
    incidentDate: new Date().toISOString().slice(0, 16),
    severity: 'MEDIUM',
    witnesses: [],
    ...data,
  });

  const [newWitness, setNewWitness] = useState({
    name: '',
    contact: '',
    testimony: '',
    isAnonymous: true,
  });

  const [showWitnessForm, setShowWitnessForm] = useState(false);

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const selectedCategory = incidentCategories.find(cat => cat.value === formData.category);

  const addWitness = () => {
    if (newWitness.name || newWitness.testimony) {
      setFormData(prev => ({
        ...prev,
        witnesses: [...prev.witnesses, { ...newWitness, id: Date.now() }],
      }));
      setNewWitness({
        name: '',
        contact: '',
        testimony: '',
        isAnonymous: true,
      });
      setShowWitnessForm(false);
    }
  };

  const removeWitness = (id) => {
    setFormData(prev => ({
      ...prev,
      witnesses: prev.witnesses.filter(w => w.id !== id),
    }));
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Describe the Incident
      </Typography>

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Incident Title *"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Brief title describing the incident"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Incident Category *</InputLabel>
            <Select
              value={formData.category}
              label="Incident Category *"
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              {incidentCategories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {category.label}
                    <Chip
                      size="small"
                      label={category.severity}
                      color={severityColors[category.severity]}
                      sx={{ ml: 'auto', textTransform: 'uppercase', fontSize: '0.6rem' }}
                    />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Sub-category (Optional)"
            value={formData.subCategory}
            onChange={(e) => handleInputChange('subCategory', e.target.value)}
            placeholder="More specific details about the type"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date & Time of Incident *"
            type="datetime-local"
            value={formData.incidentDate}
            onChange={(e) => handleInputChange('incidentDate', e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Severity Level</InputLabel>
            <Select
              value={formData.severity}
              label="Severity Level"
              onChange={(e) => handleInputChange('severity', e.target.value)}
            >
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
              <MenuItem value="CRITICAL">Critical</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Detailed Description *"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Provide a detailed account of what happened. Include times, locations, people involved, and sequence of events."
            variant="outlined"
          />
        </Grid>

        {/* Category-specific alert */}
        {selectedCategory && selectedCategory.severity === 'critical' && (
          <Grid item xs={12}>
            <Alert severity="error" icon={<Warning />}>
              <Typography fontWeight={600}>Critical Incident Detected</Typography>
              <Typography variant="body2">
                This appears to be a serious human rights violation. Consider also reporting to:
                IPOA (0800 720 711), Kenya Human Rights Commission (020 2092 000), or local authorities.
              </Typography>
            </Alert>
          </Grid>
        )}

        {/* Witnesses Section */}
        <Grid item xs={12}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight={600} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ mr: 1 }} />
                  Witnesses (Optional)
                </Typography>
                {!showWitnessForm && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Add />}
                    onClick={() => setShowWitnessForm(true)}
                  >
                    Add Witness
                  </Button>
                )}
              </Box>

              {formData.witnesses.length > 0 && (
                <List sx={{ mb: 2 }}>
                  {formData.witnesses.map((witness) => (
                    <ListItem key={witness.id} divider>
                      <ListItemText
                        primary={witness.isAnonymous ? 'Anonymous Witness' : witness.name}
                        secondary={witness.testimony.slice(0, 100) + (witness.testimony.length > 100 ? '...' : '')}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeWitness(witness.id)}
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}

              {showWitnessForm && (
                <Box sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={newWitness.isAnonymous}
                            onChange={(e) => setNewWitness(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Security sx={{ mr: 1, fontSize: 18 }} />
                            Anonymous Witness
                          </Box>
                        }
                      />
                    </Grid>
                    
                    {!newWitness.isAnonymous && (
                      <>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Witness Name"
                            value={newWitness.name}
                            onChange={(e) => setNewWitness(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Contact Information"
                            value={newWitness.contact}
                            onChange={(e) => setNewWitness(prev => ({ ...prev, contact: e.target.value }))}
                            placeholder="Phone or email"
                          />
                        </Grid>
                      </>
                    )}
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        size="small"
                        label="Witness Testimony"
                        value={newWitness.testimony}
                        onChange={(e) => setNewWitness(prev => ({ ...prev, testimony: e.target.value }))}
                        placeholder="What did this witness see or experience?"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={addWitness}
                          disabled={!newWitness.testimony}
                        >
                          Add Witness
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setShowWitnessForm(false)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 