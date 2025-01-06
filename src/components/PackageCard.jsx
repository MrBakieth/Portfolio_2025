import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { memo } from 'react';

export const packages = [
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

const PackageCard = memo(({ id, name, price, description, features, color, selected, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onSelect(id)}
    style={{
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    }}
    transition={{ duration: 0.2 }}
  >
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 4,
        height: '100%',
        background: selected 
          ? 'linear-gradient(145deg, rgba(156, 39, 176, 0.15), rgba(156, 39, 176, 0.05))'
          : 'transparent',
        border: '1px solid',
        borderColor: selected ? 'rgba(156, 39, 176, 0.3)' : 'rgba(255, 255, 255, 0.1)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        backdropFilter: { xs: 'none', md: 'blur(10px)' },
        boxShadow: selected 
          ? '0 4px 12px rgba(156, 39, 176, 0.15)'
          : 'none',
        '&:hover': {
          borderColor: 'rgba(156, 39, 176, 0.5)',
          background: selected
            ? 'linear-gradient(145deg, rgba(156, 39, 176, 0.2), rgba(156, 39, 176, 0.1))'
            : 'rgba(156, 39, 176, 0.05)',
          boxShadow: '0 6px 16px rgba(156, 39, 176, 0.2)',
        }
      }}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: '#ba68c8',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 12px rgba(186, 104, 200, 0.3)',
          }}
        >
          ✓
        </motion.div>
      )}
      
      <Typography
        variant="h6"
        sx={{
          color: selected ? '#ba68c8' : 'rgba(255, 255, 255, 0.7)',
          fontWeight: selected ? 600 : 400,
          transition: 'all 0.2s ease',
          fontSize: { xs: '1.1rem', md: '1.25rem' }
        }}
      >
        {name}
      </Typography>
      <Typography
        variant="h3"
        sx={{
          color: selected ? '#ba68c8' : 'rgba(255, 255, 255, 0.7)',
          fontWeight: selected ? 600 : 400,
          transition: 'all 0.2s ease',
          fontSize: { xs: '2rem', md: '3rem' }
        }}
      >
        {price}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          mt: 0.5,
          fontSize: { xs: '0.875rem', md: '1rem' }
        }}
      >
        {description}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 0.5, md: 1 },
          mt: { xs: 0.5, md: 1 }
        }}
      >
        {features.map((feature, index) => (
          <Typography
            key={index}
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: { xs: '0.75rem', md: '0.875rem' }
            }}
          >
            <span style={{ color: '#ba68c8' }}>✓</span>
            {feature}
          </Typography>
        ))}
      </Box>
    </Box>
  </motion.div>
));

export default PackageCard; 