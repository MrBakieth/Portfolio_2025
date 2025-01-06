import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  const navigate = useNavigate();

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
        <title>Sayfa Bulunamadı - H.Furkan Yaman</title>
        <meta name="description" content="Aradığınız sayfa bulunamadı." />
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
          zIndex: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '6rem', md: '12rem' },
              background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: { xs: 'none', md: '0 0 20px rgba(156, 39, 176, 0.3)' },
              mb: 2
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: 'white',
              mb: 4,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Aradığınız Sayfa Bulunamadı
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
            sx={{
              py: 1.5,
              px: 4,
              bgcolor: '#9c27b0',
              '&:hover': {
                bgcolor: '#7b1fa2',
              },
            }}
          >
            Ana Sayfaya Dön
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default NotFound; 