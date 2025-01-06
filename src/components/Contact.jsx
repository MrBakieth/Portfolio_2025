import { useState, memo } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import { messageService } from '../services/api';
import { Helmet } from 'react-helmet-async';

const CustomTextField = memo(({ ...props }) => (
  <TextField
    {...props}
    fullWidth
    variant="outlined"
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
      ...props.sx
    }}
  />
));

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Lütfen adınızı ve soyadınızı girin.');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Lütfen e-posta adresinizi girin.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Lütfen geçerli bir e-posta adresi girin.');
      return false;
    }
    if (!formData.subject.trim()) {
      setError('Lütfen konu başlığı girin.');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Lütfen mesajınızı girin.');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      await messageService.sendMessage(formData);

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      setError(error.message);
      
      setTimeout(() => {
        setError('');
      }, 5000);
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
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <Helmet>
        <title>İletişim - H.Furkan Yaman</title>
        <meta name="description" content="H.Furkan Yaman ile iletişime geçin. Web geliştirme projeleriniz için benimle iletişime geçebilirsiniz." />
      </Helmet>

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
          display: { xs: 'none', md: 'block' },
        }}
      >
        {[...Array(3)].map((_, i) => {
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
                opacity: 0.1,
                width,
                height,
              }}
              animate={{
                x: [xPos, -xPos, xPos],
                y: [yPos, -yPos, yPos],
                scale: [1, 1.5, 1],
                rotate: [0, 180, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              initial={{
                x: xPos,
                y: yPos,
              }}
            />
          );
        })}
      </Box>

      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 10, md: 12 },
          position: 'relative', 
          zIndex: 1 
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Typography
            variant="h2"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 'bold',
              mb: { xs: 3, md: 6 },
              fontSize: { xs: '2rem', md: '3.75rem' },
              background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: { xs: 'none', md: '0 0 20px rgba(156, 39, 176, 0.3)' },
            }}
          >
            İletişim
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, md: 4 },
              bgcolor: 'rgba(45, 45, 45, 0.95)',
              border: '1px solid rgba(156, 39, 176, 0.2)',
              backdropFilter: { xs: 'none', md: 'blur(10px)' },
              maxWidth: 800,
              margin: '0 auto',
            }}
          >
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 3,
                    '& .MuiAlert-message': {
                      color: '#2e7d32'
                    }
                  }}
                >
                  Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.
                </Alert>
              </motion.div>
            )}
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    '& .MuiAlert-message': {
                      color: '#d32f2f'
                    }
                  }}
                >
                  {error}
                </Alert>
              </motion.div>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    required
                    label="Ad Soyad"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    required
                    label="E-posta"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    label="Telefon"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    required
                    label="Konu"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    required
                    multiline
                    rows={4}
                    label="Mesajınız"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
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
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default memo(Contact); 