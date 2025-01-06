import { useState, useEffect, lazy, Suspense } from 'react';
import { Box, Container, Typography, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

// Lazy load PackageCard component
const PackageCard = lazy(() => import('./PackageCard'));

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    contactType: 'email',
    packageType: 'basic'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Mesaj gönderilemedi');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        contactType: 'email',
        packageType: 'basic'
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>İletişim - Robin Yaman</title>
        <meta name="description" content="Robin Yaman ile iletişime geçin. Web geliştirme, UI/UX tasarım ve dijital çözümler için bizimle iletişime geçin." />
        <meta name="keywords" content="iletişim, web geliştirme, UI/UX tasarım, freelance, Robin Yaman" />
      </Helmet>

      <Box sx={{ py: 8 }}>
        <Typography
          component={motion.h1}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          İletişime Geçin
        </Typography>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{ mt: 4 }}
        >
          <Suspense fallback={<CircularProgress />}>
            <PackageCard />
          </Suspense>
        </Box>

        <Box
          component={motion.form}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onSubmit={handleSubmit}
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <TextField
            required
            fullWidth
            label="İsim"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#2196F3',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196F3',
                },
              },
            }}
          />

          <TextField
            required
            fullWidth
            label="E-posta"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#2196F3',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196F3',
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Telefon"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#2196F3',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196F3',
                },
              },
            }}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">İletişim türü</FormLabel>
            <RadioGroup
              row
              name="contactType"
              value={formData.contactType}
              onChange={handleChange}
            >
              <FormControlLabel
                value="email"
                control={
                  <Radio
                    sx={{
                      '&.Mui-checked': {
                        color: '#2196F3',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.04)',
                      },
                    }}
                  />
                }
                label="E-posta"
              />
              <FormControlLabel
                value="phone"
                control={
                  <Radio
                    sx={{
                      '&.Mui-checked': {
                        color: '#2196F3',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.04)',
                      },
                    }}
                  />
                }
                label="Telefon"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label="Mesaj"
            name="message"
            value={formData.message}
            onChange={handleChange}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#2196F3',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196F3',
                },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              py: 2,
              px: 4,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 20px rgba(33, 150, 243, 0.3)',
              },
              transition: 'all 0.3s ease-in-out',
              boxShadow: '0 3px 15px rgba(33, 150, 243, 0.2)',
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Gönder'}
          </Button>

          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}

          {success && (
            <Typography color="success" align="center">
              Mesajınız başarıyla gönderildi!
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Contact; 