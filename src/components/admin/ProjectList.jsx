import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { projectService } from '../../services/api';

const getPackageInfo = (type) => {
  switch (type) {
    case 'basic':
      return {
        label: 'Temel Paket',
        color: '#4caf50',
      };
    case 'professional':
      return {
        label: 'Profesyonel Paket',
        color: '#2196f3',
      };
    case 'enterprise':
      return {
        label: 'Kurumsal Paket',
        color: '#9c27b0',
      };
    default:
      return {
        label: 'Bilinmiyor',
        color: '#757575',
      };
  }
};

const getStatusInfo = (status) => {
  switch (status) {
    case 'pending':
      return {
        label: 'Beklemede',
        color: '#ff9800',
      };
    case 'approved':
      return {
        label: 'Onaylandı',
        color: '#4caf50',
      };
    case 'rejected':
      return {
        label: 'Reddedildi',
        color: '#f44336',
      };
    default:
      return {
        label: 'Bilinmiyor',
        color: '#757575',
      };
  }
};

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getProjects();
      setProjects(data);
      setError('');
    } catch (error) {
      setError('Projeler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleClickOpen = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await projectService.updateStatus(id, status);
      setProjects(projects.map((project) =>
        project._id === id ? { ...project, status } : project
      ));
    } catch (error) {
      setError('Proje durumu güncellenirken bir hata oluştu');
    }
  };

  const handleDelete = async (id) => {
    try {
      await projectService.deleteProject(id);
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      setError('Proje silinirken bir hata oluştu');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Müşteri</TableCell>
              <TableCell>Paket</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>Tarih</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    {project.name}
                  </Typography>
                  {project.company && (
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      {project.company}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    label={getPackageInfo(project.packageType).label}
                    sx={{
                      bgcolor: `${getPackageInfo(project.packageType).color}20`,
                      color: getPackageInfo(project.packageType).color,
                      borderRadius: '4px',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusInfo(project.status).label}
                    sx={{
                      bgcolor: `${getStatusInfo(project.status).color}20`,
                      color: getStatusInfo(project.status).color,
                      borderRadius: '4px',
                    }}
                  />
                </TableCell>
                <TableCell>
                  {new Date(project.createdAt).toLocaleDateString('tr-TR')}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleClickOpen(project)}
                    sx={{ color: '#ba68c8' }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {project.status === 'pending' && (
                    <>
                      <IconButton
                        size="small"
                        onClick={() => handleUpdateStatus(project._id, 'approved')}
                        sx={{ color: '#4caf50' }}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleUpdateStatus(project._id, 'rejected')}
                        sx={{ color: '#f44336' }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(project._id)}
                    sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: '#2d2d2d',
            color: 'white',
          },
        }}
      >
        {selectedProject && (
          <>
            <DialogTitle sx={{ borderBottom: '1px solid rgba(156, 39, 176, 0.2)' }}>
              Proje Detayları
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Müşteri Bilgileri:
                </Typography>
                <Typography variant="body2">
                  {selectedProject.name}
                  {selectedProject.company && ` - ${selectedProject.company}`}
                </Typography>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                  {selectedProject.email}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Paket Türü:
                </Typography>
                <Chip
                  label={getPackageInfo(selectedProject.packageType).label}
                  sx={{
                    bgcolor: `${getPackageInfo(selectedProject.packageType).color}20`,
                    color: getPackageInfo(selectedProject.packageType).color,
                    borderRadius: '4px',
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Durum:
                </Typography>
                <Chip
                  label={getStatusInfo(selectedProject.status).label}
                  sx={{
                    bgcolor: `${getStatusInfo(selectedProject.status).color}20`,
                    color: getStatusInfo(selectedProject.status).color,
                    borderRadius: '4px',
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tarih:
                </Typography>
                <Typography variant="body2">
                  {new Date(selectedProject.createdAt).toLocaleDateString('tr-TR')}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Proje Detayları:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {selectedProject.details}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              {selectedProject.status === 'pending' && (
                <>
                  <Button
                    onClick={() => {
                      handleUpdateStatus(selectedProject._id, 'approved');
                      handleClose();
                    }}
                    sx={{ color: '#4caf50' }}
                  >
                    Onayla
                  </Button>
                  <Button
                    onClick={() => {
                      handleUpdateStatus(selectedProject._id, 'rejected');
                      handleClose();
                    }}
                    sx={{ color: '#f44336' }}
                  >
                    Reddet
                  </Button>
                </>
              )}
              <Button onClick={handleClose} sx={{ color: '#ba68c8' }}>
                Kapat
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default ProjectList; 