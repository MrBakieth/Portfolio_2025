import { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { messageService, projectService } from '../services/api';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [formType, setFormType] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    packageType: 'basic',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      if (formType === 'contact') {
        const { name, email, subject, message } = formData;
        await messageService.sendMessage({ name, email, subject, message });
      } else {
        const { name, email, company, packageType, message } = formData;
        await projectService.createProject({
          name,
          email,
          company,
          packageType,
          details: message,
        });
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        company: '',
        packageType: 'basic',
      });
    } catch (error) {
      setError('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      }}
    >
      {/* Animated background lights */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {[...Array(5)].map((_, i) => {
          // Pre-calculate random values
          const xPos = (i * 20) + 10;
          const yPos = (i * 15) + 10;
          const width = 300 + (i * 50);
          const height = 300 + (i * 50);
          const duration = 20 + (i * 2);
          
          return (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
                borderRadius: '50%',
                filter: 'blur(100px)',
                opacity: 0.15,
                width,
                height,
              }}
              animate={{
                x: [xPos, -xPos, xPos],
                y: [yPos, -yPos, yPos],
                scale: [1, 1.8, 1],
                rotate: [0, 180, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "easeInOut"
              }}
              initial={{
                x: xPos,
                y: yPos,
              }}
            />
          );
        })}
      </Box>

      <Container maxWidth="lg" sx={{ py: 12, position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 'bold',
              mb: 6,
              pt: 4,
              background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(156, 39, 176, 0.3)',
            }}
          >
            İletişim
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              bgcolor: 'rgba(45, 45, 45, 0.95)',
              border: '1px solid rgba(156, 39, 176, 0.2)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
            }}
          >
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {formType === 'contact'
                  ? 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
                  : 'Proje talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.'}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
              <FormLabel
                component="legend"
                sx={{ 
                  color: 'white', 
                  '&.Mui-focused': { color: '#ba68c8' },
                  mb: 2,
                  fontSize: '1.1rem',
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                İletişim Türü
              </FormLabel>
              <RadioGroup
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'center',
                  gap: { xs: 1, md: 4 },
                  '& .MuiFormControlLabel-root': {
                    margin: { xs: 0, md: 2 },
                    width: { xs: '100%', md: 'auto' }
                  }
                }}
              >
                <FormControlLabel
                  value="contact"
                  control={
                    <Radio
                      sx={{
                        color: 'rgba(156, 39, 176, 0.5)',
                        '&.Mui-checked': { color: '#ba68c8' },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        color: formType === 'contact' ? '#ba68c8' : 'rgba(255, 255, 255, 0.7)',
                        fontWeight: formType === 'contact' ? 600 : 400,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Genel İletişim
                    </Typography>
                  }
                  sx={{
                    py: { xs: 1.5, md: 0 },
                    px: { xs: 2, md: 0 },
                    borderRadius: { xs: 2, md: 0 },
                    background: formType === 'contact' ? 'rgba(156, 39, 176, 0.1)' : 'transparent',
                    border: { xs: '1px solid', md: 'none' },
                    borderColor: formType === 'contact' ? 'rgba(156, 39, 176, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  }}
                />
                <FormControlLabel
                  value="project"
                  control={
                    <Radio
                      sx={{
                        color: 'rgba(156, 39, 176, 0.5)',
                        '&.Mui-checked': { color: '#ba68c8' },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        color: formType === 'project' ? '#ba68c8' : 'rgba(255, 255, 255, 0.7)',
                        fontWeight: formType === 'project' ? 600 : 400,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Web Proje Talebi
                    </Typography>
                  }
                  sx={{
                    py: { xs: 1.5, md: 0 },
                    px: { xs: 2, md: 0 },
                    borderRadius: { xs: 2, md: 0 },
                    background: formType === 'project' ? 'rgba(156, 39, 176, 0.1)' : 'transparent',
                    border: { xs: '1px solid', md: 'none' },
                    borderColor: formType === 'project' ? 'rgba(156, 39, 176, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  }}
                />
              </RadioGroup>
            </FormControl>

            <Box component="form" onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={formType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Ad Soyad"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(156, 39, 176, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(156, 39, 176, 0.4)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#ba68c8',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                          },
                          '& .MuiOutlinedInput-input': {
                            color: 'white',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="E-posta"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(156, 39, 176, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(156, 39, 176, 0.4)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#ba68c8',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                          },
                          '& .MuiOutlinedInput-input': {
                            color: 'white',
                          },
                        }}
                      />
                    </Grid>
                    {formType === 'contact' ? (
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Konu"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          disabled={loading}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(156, 39, 176, 0.2)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(156, 39, 176, 0.4)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#ba68c8',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'rgba(255, 255, 255, 0.7)',
                            },
                            '& .MuiOutlinedInput-input': {
                              color: 'white',
                            },
                          }}
                        />
                      </Grid>
                    ) : (
                      <>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Şirket Adı (Opsiyonel)"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            disabled={loading}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'rgba(156, 39, 176, 0.2)',
                                },
                                '&:hover fieldset': {
                                  borderColor: 'rgba(156, 39, 176, 0.4)',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#ba68c8',
                                },
                              },
                              '& .MuiInputLabel-root': {
                                color: 'rgba(255, 255, 255, 0.7)',
                              },
                              '& .MuiOutlinedInput-input': {
                                color: 'white',
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            variant="h5"
                            sx={{
                              mb: 3,
                              textAlign: 'center',
                              background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              fontWeight: 'bold',
                            }}
                          >
                            Paket Seçimi
                          </Typography>
                          
                          {/* Desktop version */}
                          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={4}>
                                <PackageCard
                                  selected={formData.packageType}
                                  onSelect={(id) => setFormData({ ...formData, packageType: id })}
                                />
                              </Grid>
                            </Grid>
                          </Box>

                          {/* Mobile version */}
                          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                            <FormControl component="fieldset" sx={{ width: '100%' }}>
                              <RadioGroup
                                value={formData.packageType}
                                onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                              >
                                {packages.map((pkg) => (
                                  <motion.div
                                    key={pkg.id}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <FormControlLabel
                                      value={pkg.id}
                                      control={
                                        <Radio
                                          sx={{
                                            color: 'rgba(156, 39, 176, 0.5)',
                                            '&.Mui-checked': { color: '#ba68c8' },
                                          }}
                                        />
                                      }
                                      label={
                                        <Box>
                                          <Typography
                                            variant="h6"
                                            sx={{
                                              color: formData.packageType === pkg.id ? '#ba68c8' : 'white',
                                              fontWeight: formData.packageType === pkg.id ? 600 : 400,
                                            }}
                                          >
                                            {pkg.name} - {pkg.price}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              color: 'rgba(255, 255, 255, 0.7)',
                                              mt: 0.5
                                            }}
                                          >
                                            {pkg.description}
                                          </Typography>
                                          <Box
                                            sx={{
                                              display: 'flex',
                                              flexWrap: 'wrap',
                                              gap: 1,
                                              mt: 1
                                            }}
                                          >
                                            {pkg.features.map((feature, index) => (
                                              <Typography
                                                key={index}
                                                variant="caption"
                                                sx={{
                                                  color: 'rgba(255, 255, 255, 0.6)',
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  gap: 0.5,
                                                }}
                                              >
                                                <span style={{ color: '#ba68c8' }}>✓</span>
                                                {feature}
                                              </Typography>
                                            ))}
                                          </Box>
                                        </Box>
                                      }
                                      sx={{
                                        width: '100%',
                                        margin: 0,
                                        padding: 2,
                                        borderRadius: 2,
                                        background: formData.packageType === pkg.id 
                                          ? 'rgba(156, 39, 176, 0.1)'
                                          : 'transparent',
                                        border: '1px solid',
                                        borderColor: formData.packageType === pkg.id 
                                          ? 'rgba(156, 39, 176, 0.3)'
                                          : 'rgba(255, 255, 255, 0.1)',
                                        transition: 'all 0.3s ease',
                                        mb: 2,
                                      }}
                                    />
                                  </motion.div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={4}
                        label={formType === 'contact' ? 'Mesaj' : 'Proje Detayları'}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(156, 39, 176, 0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(156, 39, 176, 0.4)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#ba68c8',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                          },
                          '& .MuiOutlinedInput-input': {
                            color: 'white',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                          py: 1.5,
                          px: 4,
                          bgcolor: '#9c27b0',
                          '&:hover': {
                            bgcolor: '#7b1fa2',
                          },
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          'Gönder'
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact; 