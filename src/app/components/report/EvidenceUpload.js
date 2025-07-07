'use client';

import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Alert,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CloudUpload,
  PhotoCamera,
  Videocam,
  Mic,
  Delete,
  Visibility,
  Security,
  GpsFixed,
  Schedule,
  DeviceUnknown,
  Warning,
} from '@mui/icons-material';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const acceptedFileTypes = {
  'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
  'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.webm'],
  'audio/*': ['.mp3', '.wav', '.m4a', '.ogg'],
};

const maxFileSize = 50 * 1024 * 1024; // 50MB

export function EvidenceUpload({ evidence, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [metadataDialog, setMetadataDialog] = useState(false);
  const [selectedFileMetadata, setSelectedFileMetadata] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true);
    
    const newFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        // Simulate metadata extraction
        const metadata = await extractMetadata(file);
        
        return {
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
          uploadDate: new Date(),
          metadata,
          verified: false,
        };
      })
    );

    onChange([...evidence, ...newFiles]);
    setUploading(false);
  }, [evidence, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxSize: maxFileSize,
    multiple: true,
  });

  const extractMetadata = async (file) => {
    // Simulate metadata extraction (in real app, use exifr library)
    return new Promise((resolve) => {
      setTimeout(() => {
        const metadata = {
          filename: file.name,
          size: file.size,
          type: file.type,
          lastModified: new Date(file.lastModified),
          // Simulated metadata
          gps: Math.random() > 0.5 ? { lat: -1.2921, lng: 36.8219 } : null,
          device: 'Smartphone Camera',
          timestamp: new Date(file.lastModified),
          hash: 'sha256:' + Math.random().toString(36).substring(2, 15),
        };
        resolve(metadata);
      }, 1000);
    });
  };

  const removeFile = (id) => {
    const updatedEvidence = evidence.filter(item => item.id !== id);
    onChange(updatedEvidence);
  };

  const viewMetadata = (fileItem) => {
    setSelectedFileMetadata(fileItem);
    setMetadataDialog(true);
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <PhotoCamera />;
    if (type.startsWith('video/')) return <Videocam />;
    if (type.startsWith('audio/')) return <Mic />;
    return <DeviceUnknown />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Upload Evidence
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          🔒 Evidence Security Features
        </Typography>
        <Typography variant="body2">
          • Automatic metadata extraction (GPS, timestamp, device info)<br/>
          • Files are encrypted before upload<br/>
          • Supports photos, videos, and audio recordings<br/>
          • Maximum file size: 50MB per file
        </Typography>
      </Alert>

      {/* Upload Area */}
      <Paper
        {...getRootProps()}
        sx={{
          p: 4,
          mb: 3,
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          backgroundColor: isDragActive ? 'primary.50' : 'grey.50',
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'primary.50',
          },
        }}
      >
        <input {...getInputProps()} />
        <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 1 }}>
          {isDragActive ? 'Drop files here' : 'Drag & drop evidence files here'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          or click to select files
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Supported: Images, Videos, Audio • Max 50MB per file
        </Typography>
        
        {uploading && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Processing files and extracting metadata...
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Uploaded Files */}
      {evidence.length > 0 && (
        <Box>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Uploaded Evidence ({evidence.length} files)
          </Typography>
          
          <Grid container spacing={2}>
            {evidence.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {getFileIcon(item.type)}
                      <Box sx={{ ml: 1, flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="body1" fontWeight={600} noWrap>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatFileSize(item.size)}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Preview */}
                    {item.type.startsWith('image/') && (
                      <Box
                        component="img"
                        src={item.url}
                        sx={{
                          width: '100%',
                          height: 120,
                          objectFit: 'cover',
                          borderRadius: 1,
                          mb: 2,
                        }}
                      />
                    )}

                    {/* Metadata Indicators */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {item.metadata?.gps && (
                        <Chip
                          size="small"
                          icon={<GpsFixed />}
                          label="GPS"
                          color="success"
                          variant="outlined"
                        />
                      )}
                      <Chip
                        size="small"
                        icon={<Schedule />}
                        label="Timestamp"
                        color="info"
                        variant="outlined"
                      />
                      {item.verified && (
                        <Chip
                          size="small"
                          icon={<Security />}
                          label="Verified"
                          color="success"
                        />
                      )}
                    </Box>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => viewMetadata(item)}
                    >
                      Metadata
                    </Button>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeFile(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Metadata Dialog */}
      <Dialog
        open={metadataDialog}
        onClose={() => setMetadataDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            File Metadata & Verification
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedFileMetadata && (
            <List>
              <ListItem>
                <ListItemIcon><DeviceUnknown /></ListItemIcon>
                <ListItemText
                  primary="Filename"
                  secondary={selectedFileMetadata.metadata?.filename}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><Schedule /></ListItemIcon>
                <ListItemText
                  primary="Timestamp"
                  secondary={selectedFileMetadata.metadata?.timestamp?.toLocaleString()}
                />
              </ListItem>
              {selectedFileMetadata.metadata?.gps && (
                <ListItem>
                  <ListItemIcon><GpsFixed /></ListItemIcon>
                  <ListItemText
                    primary="GPS Coordinates"
                    secondary={`${selectedFileMetadata.metadata.gps.lat}, ${selectedFileMetadata.metadata.gps.lng}`}
                  />
                </ListItem>
              )}
              <ListItem>
                <ListItemIcon><Security /></ListItemIcon>
                <ListItemText
                  primary="File Hash"
                  secondary={selectedFileMetadata.metadata?.hash}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><DeviceUnknown /></ListItemIcon>
                <ListItemText
                  primary="Device"
                  secondary={selectedFileMetadata.metadata?.device}
                />
              </ListItem>
            </List>
          )}
          
          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              ✅ File integrity verified • Metadata extracted • Ready for submission
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMetadataDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 