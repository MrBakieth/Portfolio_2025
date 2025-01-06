import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const packages = [
  {
    id: 'basic',
    name: 'Temel Paket',
    price: '2,500₺',
    description: 'Tek sayfalık modern website, temel özellikler',
    features: ['Modern Tasarım', 'Mobil Uyumlu', 'Temel SEO', 'Hızlı Teslimat'],
    color: '#2196F3'
  },
  {
    id: 'professional',
    name: 'Profesyonel Paket',
    price: '6,000₺',
    description: 'Üç sayfalık kapsamlı website, SEO optimizasyonu, modern tasarım',
    features: ['Gelişmiş Tasarım', 'SEO Optimizasyonu', 'Blog Sistemi', 'Admin Paneli', 'Sosyal Medya Entegrasyonu'],
    color: '#1976D2'
  },
  {
    id: 'enterprise',
    name: 'Kurumsal Paket',
    price: '15,000₺',
    description: 'On sayfalık tam donanımlı website, hosting, optimizasyon, ücretsiz değişiklikler',
    features: ['Premium Tasarım', 'Tam SEO Paketi', 'E-posta Sistemi', 'SSL Sertifikası', '1 Yıl Hosting', 'Sınırsız Değişiklik'],
    color: '#0D47A1'
  }
];

const PackageCard = () => {
  return (
    <Grid container spacing={3}>
      {packages.map((pkg) => (
        <Grid item xs={12} md={4} key={pkg.id}>
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
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
                background: `linear-gradient(135deg, ${pkg.color}10 0%, ${pkg.color}20 100%)`,
                border: '2px solid',
                borderColor: `${pkg.color}30`,
                transition: 'all 0.3s ease',
                position: 'relative',
                backdropFilter: 'blur(10px)',
                boxShadow: `0 4px 16px ${pkg.color}20`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${pkg.color}15 0%, ${pkg.color}30 100%)`,
                  boxShadow: `0 8px 32px ${pkg.color}30`,
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: pkg.color,
                  mb: 2,
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                {pkg.name}
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  color: pkg.color,
                  mb: 3,
                  fontWeight: 800,
                  textAlign: 'center',
                }}
              >
                {pkg.price}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  textAlign: 'center',
                  minHeight: '48px',
                }}
              >
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
                        background: pkg.color,
                        color: 'white',
                        fontSize: '0.9rem',
                        boxShadow: `0 2px 8px ${pkg.color}50`,
                      }}
                    >
                      ✓
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.primary',
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default PackageCard; 