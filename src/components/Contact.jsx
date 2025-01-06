<<<<<<< HEAD
import { useState, useEffect, lazy, Suspense } from 'react';
=======
import { useState } from 'react';
>>>>>>> 148eca0285ff5beb08553773aba47b4f44263d21
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
<<<<<<< HEAD
import { Helmet } from 'react-helmet-async';
=======
>>>>>>> 148eca0285ff5beb08553773aba47b4f44263d21

const packages = [
  {
    id: 'basic',
    name: 'Temel Paket',
    price: '2,500₺',
    description: 'Tek sayfalık modern website, temel özellikler',
    features: ['Modern Tasarım', 'Mobil Uyumlu', 'Temel SEO', 'Hızlı Teslimat'],
    color: '#9c27b0'
  },
  {
    id: 'professional',
    name: 'Profesyonel Paket',
    price: '6,000₺',
    description: 'Üç sayfalık kapsamlı website, SEO optimizasyonu, modern tasarım',
    features: ['Gelişmiş Tasarım', 'SEO Optimizasyonu', 'Blog Sistemi', 'Admin Paneli', 'Sosyal Medya Entegrasyonu'],
    color: '#ba68c8'
  },
  {
    id: 'enterprise',
    name: 'Kurumsal Paket',
    price: '15,000₺',
    description: 'On sayfalık tam donanımlı website, hosting, optimizasyon, ücretsiz değişiklikler',
    features: ['Premium Tasarım', 'Tam SEO Paketi', 'E-posta Sistemi', 'SSL Sertifikası', '1 Yıl Hosting', 'Sınırsız Değişiklik'],
    color: '#7b1fa2'
  }
];

<<<<<<< HEAD
// Lazy load the PackageCard component
const PackageCard = lazy(() => import('./PackageCard'));

// Create a loading placeholder for package cards
const PackageCardSkeleton = () => (
  <Box
    sx={{
      p: 4,
      borderRadius: 4,
      height: '100%',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      animation: 'pulse 1.5s ease-in-out infinite',
      '@keyframes pulse': {
        '0%': { opacity: 0.5 },
        '50%': { opacity: 0.8 },
        '100%': { opacity: 0.5 },
      },
    }}
  />
=======
const PackageCard = ({ pkg, selected, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onSelect(pkg.id)}
    style={{
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        p: 4,
        borderRadius: 4,
        height: '100%',
        background: selected 
          ? `linear-gradient(135deg, ${pkg.color}20 0%, ${pkg.color}40 100%)`
          : 'rgba(255, 255, 255, 0.05)',
        border: '2px solid',
        borderColor: selected ? pkg.color : 'rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        position: 'relative',
        backdropFilter: 'blur(10px)',
        boxShadow: selected 
          ? `0 8px 32px ${pkg.color}30`
          : '0 4px 16px rgba(0,0,0,0.2)',
        '&:hover': {
          borderColor: pkg.color,
          background: `linear-gradient(135deg, ${pkg.color}15 0%, ${pkg.color}30 100%)`,
          boxShadow: `0 8px 32px ${pkg.color}30`,
        },
      }}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: pkg.color,
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: `0 4px 12px ${pkg.color}50`,
          }}
        >
          ✓
        </motion.div>
      )}
      
      <Typography variant="h5" sx={{ 
        color: selected ? pkg.color : 'white',
        mb: 2,
        fontWeight: 700,
        textAlign: 'center',
      }}>
        {pkg.name}
      </Typography>
      
      <Typography variant="h3" sx={{ 
        color: selected ? pkg.color : 'white',
        mb: 3,
        fontWeight: 800,
        textAlign: 'center',
      }}>
        {pkg.price}
      </Typography>
      
      <Typography variant="body1" sx={{ 
        color: 'rgba(255, 255, 255, 0.7)',
        mb: 4,
        textAlign: 'center',
        minHeight: '48px',
      }}>
        {pkg.description}
      </Typography>
      
      <Box sx={{ mt: 'auto' }}>
        {pkg.features.map((feature, index) => (
          <Box 
            key={index}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2,
              opacity: selected ? 1 : 0.8,
              transform: selected ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.3s ease',
            }}
          >
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: selected ? pkg.color : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '0.9rem',
                boxShadow: selected ? `0 2px 8px ${pkg.color}50` : 'none',
              }}
            >
              ✓
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: selected ? 500 : 400,
              }}
            >
              {feature}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </motion.div>
>>>>>>> 148eca0285ff5beb08553773aba47b4f44263d21
);

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

<<<<<<< HEAD
  // Add lazy loading for performance
  useEffect(() => {
    // Preload images and critical resources
    const preloadResources = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
    };

    window.addEventListener('load', preloadResources);
    return () => window.removeEventListener('load', preloadResources);
  }, []);

  return (
    <>
      <Helmet>
        <title>İletişim - Web Tasarım ve Geliştirme Hizmetleri</title>
        <meta name="description" content="Profesyonel web tasarım ve geliştirme hizmetleri için iletişime geçin. Modern, responsive ve SEO dostu web siteleri için teklif alın." />
        <meta name="keywords" content="web tasarım, web geliştirme, responsive tasarım, SEO dostu, profesyonel web sitesi" />
        <meta property="og:title" content="İletişim - Web Tasarım ve Geliştirme Hizmetleri" />
        <meta property="og:description" content="Profesyonel web tasarım ve geliştirme hizmetleri için iletişime geçin. Modern, responsive ve SEO dostu web siteleri için teklif alın." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourwebsite.com/contact" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/your-main-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://yourapi.com" />
        
        {/* Add structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "İletişim Sayfası",
            "description": "Profesyonel web tasarım ve geliştirme hizmetleri için iletişim sayfası",
            "url": "https://yourwebsite.com/contact",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "",
              "contactType": "customer service",
              "areaServed": "TR",
              "availableLanguage": "Turkish"
            }
          })}
        </script>
      </Helmet>

      <main role="main">
        <Box
          component="section"
          aria-label="İletişim Formu"
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
                component="h1"
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
                component="article"
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

                <FormControl 
                  component="fieldset" 
                  sx={{ mb: 4, width: '100%' }}
                  aria-label="İletişim Türü Seçimi"
                >
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
                        width: { xs: '100%', md: 'auto' },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        }
                      }
                    }}
                  >
                    <FormControlLabel
                      value="contact"
                      control={
                        <Radio
                          sx={{
                            color: 'rgba(156, 39, 176, 0.5)',
                            '&.Mui-checked': { 
                              color: '#ba68c8',
                              '& + .MuiTypography-root': {
                                color: '#ba68c8',
                              }
                            },
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
                        px: { xs: 2, md: 3 },
                        borderRadius: 2,
                        background: formType === 'contact' 
                          ? 'linear-gradient(145deg, rgba(156, 39, 176, 0.15), rgba(156, 39, 176, 0.05))'
                          : 'transparent',
                        border: '1px solid',
                        borderColor: formType === 'contact' 
                          ? 'rgba(156, 39, 176, 0.3)' 
                          : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: formType === 'contact'
                          ? '0 4px 12px rgba(156, 39, 176, 0.15)'
                          : 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          borderColor: 'rgba(156, 39, 176, 0.5)',
                          background: formType === 'contact'
                            ? 'linear-gradient(145deg, rgba(156, 39, 176, 0.2), rgba(156, 39, 176, 0.1))'
                            : 'rgba(156, 39, 176, 0.05)',
                          boxShadow: '0 6px 16px rgba(156, 39, 176, 0.2)',
                        }
                      }}
                    />
                    <FormControlLabel
                      value="project"
                      control={
                        <Radio
                          sx={{
                            color: 'rgba(156, 39, 176, 0.5)',
                            '&.Mui-checked': { 
                              color: '#ba68c8',
                              '& + .MuiTypography-root': {
                                color: '#ba68c8',
                              }
                            },
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
                        px: { xs: 2, md: 3 },
                        borderRadius: 2,
                        background: formType === 'project'
                          ? 'linear-gradient(145deg, rgba(156, 39, 176, 0.15), rgba(156, 39, 176, 0.05))'
                          : 'transparent',
                        border: '1px solid',
                        borderColor: formType === 'project'
                          ? 'rgba(156, 39, 176, 0.3)'
                          : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: formType === 'project'
                          ? '0 4px 12px rgba(156, 39, 176, 0.15)'
                          : 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          borderColor: 'rgba(156, 39, 176, 0.5)',
                          background: formType === 'project'
                            ? 'linear-gradient(145deg, rgba(156, 39, 176, 0.2), rgba(156, 39, 176, 0.1))'
                            : 'rgba(156, 39, 176, 0.05)',
                          boxShadow: '0 6px 16px rgba(156, 39, 176, 0.2)',
                        }
                      }}
                    />
                  </RadioGroup>
                </FormControl>

                <Box 
                  component="form" 
                  onSubmit={handleSubmit}
                  role="form"
                  aria-label="İletişim Formu"
                >
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
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                borderRadius: '12px',
                                '& fieldset': {
                                  borderColor: 'rgba(156, 39, 176, 0.2)',
                                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                },
                                '&:hover fieldset': {
                                  borderColor: 'rgba(156, 39, 176, 0.4)',
                                },
                                '&.Mui-focused': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 4px 20px rgba(156, 39, 176, 0.15)',
                                  '& fieldset': {
                                    borderColor: '#ba68c8',
                                    borderWidth: '2px',
                                  },
                                },
                              },
                              '& .MuiInputLabel-root': {
                                color: 'rgba(255, 255, 255, 0.7)',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&.Mui-focused': {
                                  color: '#ba68c8',
                                  textShadow: '0 0 8px rgba(186, 104, 200, 0.3)',
                                },
                              },
                              '& .MuiOutlinedInput-input': {
                                color: 'white',
                                padding: '16px',
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
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                borderRadius: '12px',
                                '& fieldset': {
                                  borderColor: 'rgba(156, 39, 176, 0.2)',
                                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                },
                                '&:hover fieldset': {
                                  borderColor: 'rgba(156, 39, 176, 0.4)',
                                },
                                '&.Mui-focused': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 4px 20px rgba(156, 39, 176, 0.15)',
                                  '& fieldset': {
                                    borderColor: '#ba68c8',
                                    borderWidth: '2px',
                                  },
                                },
                              },
                              '& .MuiInputLabel-root': {
                                color: 'rgba(255, 255, 255, 0.7)',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&.Mui-focused': {
                                  color: '#ba68c8',
                                  textShadow: '0 0 8px rgba(186, 104, 200, 0.3)',
                                },
                              },
                              '& .MuiOutlinedInput-input': {
                                color: 'white',
                                padding: '16px',
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
                                  transition: 'transform 0.2s, box-shadow 0.2s',
                                  borderRadius: '12px',
                                  '& fieldset': {
                                    borderColor: 'rgba(156, 39, 176, 0.2)',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'rgba(156, 39, 176, 0.4)',
                                  },
                                  '&.Mui-focused': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 20px rgba(156, 39, 176, 0.15)',
                                    '& fieldset': {
                                      borderColor: '#ba68c8',
                                      borderWidth: '2px',
                                    },
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: 'rgba(255, 255, 255, 0.7)',
                                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                  '&.Mui-focused': {
                                    color: '#ba68c8',
                                    textShadow: '0 0 8px rgba(186, 104, 200, 0.3)',
                                  },
                                },
                                '& .MuiOutlinedInput-input': {
                                  color: 'white',
                                  padding: '16px',
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
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    borderRadius: '12px',
                                    '& fieldset': {
                                      borderColor: 'rgba(156, 39, 176, 0.2)',
                                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: 'rgba(156, 39, 176, 0.4)',
                                    },
                                    '&.Mui-focused': {
                                      transform: 'translateY(-2px)',
                                      boxShadow: '0 4px 20px rgba(156, 39, 176, 0.15)',
                                      '& fieldset': {
                                        borderColor: '#ba68c8',
                                        borderWidth: '2px',
                                      },
                                    },
                                  },
                                  '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&.Mui-focused': {
                                      color: '#ba68c8',
                                      textShadow: '0 0 8px rgba(186, 104, 200, 0.3)',
                                    },
                                  },
                                  '& .MuiOutlinedInput-input': {
                                    color: 'white',
                                    padding: '16px',
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
                                  {packages.map((pkg) => (
                                    <Grid item xs={12} md={4} key={pkg.id}>
                                      <Suspense fallback={<PackageCardSkeleton />}>
                                        <PackageCard
                                          pkg={pkg}
                                          selected={formData.packageType === pkg.id}
                                          onSelect={(id) => setFormData({ ...formData, packageType: id })}
                                        />
                                      </Suspense>
                                    </Grid>
                                  ))}
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
=======
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
>>>>>>> 148eca0285ff5beb08553773aba47b4f44263d21
                            onChange={handleChange}
                            disabled={loading}
                            sx={{
                              '& .MuiOutlinedInput-root': {
<<<<<<< HEAD
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                borderRadius: '12px',
                                '& fieldset': {
                                  borderColor: 'rgba(156, 39, 176, 0.2)',
                                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
=======
                                '& fieldset': {
                                  borderColor: 'rgba(156, 39, 176, 0.2)',
>>>>>>> 148eca0285ff5beb08553773aba47b4f44263d21
                                },
                                '&:hover fieldset': {
                                  borderColor: 'rgba(156, 39, 176, 0.4)',
                                },
<<<<<<< HEAD
                                '&.Mui-focused': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 4px 20px rgba(156, 39, 176, 0.15)',
                                  '& fieldset': {
                                    borderColor: '#ba68c8',
                                    borderWidth: '2px',
                                  },
=======
                                '&.Mui-focused fieldset': {
                                  borderColor: '#ba68c8',
>>>>>>> 148eca0285ff5beb08553773aba47b4f44263d21
                                },
                              },
                              '& .MuiInputLabel-root': {
                                color: 'rgba(255, 255, 255, 0.7)',
<<<<<<< HEAD
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&.Mui-focused': {
                                  color: '#ba68c8',
                                  textShadow: '0 0 8px rgba(186, 104, 200, 0.3)',
                                },
                              },
                              '& .MuiOutlinedInput-input': {
                                color: 'white',
                                padding: '16px',
=======
                              },
                              '& .MuiOutlinedInput-input': {
                                color: 'white',
>>>>>>> 148eca0285ff5beb08553773aba47b4f44263d21
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
<<<<<<< HEAD
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                              py: 1.5,
                              px: 4,
                              bgcolor: '#9c27b0',
                              borderRadius: '12px',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              position: 'relative',
                              overflow: 'hidden',
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                                transform: 'translateX(-100%)',
                                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                              },
                              '&:hover': {
                                bgcolor: '#7b1fa2',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(156, 39, 176, 0.3)',
                                '&::before': {
                                  transform: 'translateX(100%)',
                                },
                              },
                              '&:active': {
                                transform: 'translateY(1px)',
                              },
                              '&.Mui-disabled': {
                                bgcolor: 'rgba(156, 39, 176, 0.5)',
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
      </main>
    </>
=======
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
                              {packages.map((pkg) => (
                                <Grid item xs={12} md={4} key={pkg.id}>
                                  <PackageCard
                                    pkg={pkg}
                                    selected={formData.packageType === pkg.id}
                                    onSelect={(id) => setFormData({ ...formData, packageType: id })}
                                  />
                                </Grid>
                              ))}
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
>>>>>>> 148eca0285ff5beb08553773aba47b4f44263d21
  );
};

export default Contact; 