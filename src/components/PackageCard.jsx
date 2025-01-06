import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';

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
        willChange: 'transform, opacity, background, box-shadow',
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
      
      <Typography
        variant="h5"
        component="h3"
        sx={{ 
          color: selected ? pkg.color : 'white',
          mb: 2,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        {pkg.name}
      </Typography>
      
      <Typography
        variant="h3"
        component="div"
        sx={{ 
          color: selected ? pkg.color : 'white',
          mb: 3,
          fontWeight: 800,
          textAlign: 'center',
        }}
      >
        {pkg.price}
      </Typography>
      
      <Typography
        variant="body1"
        component="p"
        sx={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          mb: 4,
          textAlign: 'center',
          minHeight: '48px',
        }}
      >
        {pkg.description}
      </Typography>
      
      <Box component="ul" sx={{ mt: 'auto', listStyle: 'none', p: 0 }}>
        {pkg.features.map((feature, index) => (
          <Box
            component="li"
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
              component="span"
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
);

export default PackageCard; 