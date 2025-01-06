import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { memo } from 'react';

const BackgroundAnimation = memo(() => {
  // Mobil cihazlarda daha az animasyon göster
  const animationCount = window.innerWidth < 768 ? 2 : 3;
  // Mobil cihazlarda daha düşük blur ve opacity
  const blurAmount = window.innerWidth < 768 ? '50px' : '100px';
  const opacityAmount = window.innerWidth < 768 ? 0.05 : 0.1;
  // Mobil cihazlarda daha kısa animasyon süresi
  const durationMultiplier = window.innerWidth < 768 ? 1 : 2;

  return (
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
      {[...Array(animationCount)].map((_, i) => {
        const xPos = (i * 20) + 10;
        const yPos = (i * 15) + 10;
        const width = 300 + (i * 50);
        const height = 300 + (i * 50);
        const duration = (10 + (i * durationMultiplier));
        
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
              borderRadius: '50%',
              filter: `blur(${blurAmount})`,
              opacity: opacityAmount,
              width,
              height,
              willChange: 'transform',
            }}
            animate={{
              x: [xPos, -xPos, xPos],
              y: [yPos, -yPos, yPos],
              scale: [1, 1.2, 1],
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
  );
});

BackgroundAnimation.displayName = 'BackgroundAnimation';

export default BackgroundAnimation; 