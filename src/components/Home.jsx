import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.95
  }
};

const techLogos = [
  {
    name: 'React',
    icon: '⚛️',
    color: '#61DAFB'
  },
  {
    name: 'MongoDB',
    icon: '🍃',
    color: '#47A248'
  },
  {
    name: 'Tailwind CSS',
    icon: '🌊',
    color: '#38B2AC'
  },
  {
    name: 'JavaScript',
    icon: '｡🇯‌🇸‌',
    color: '#F7DF1E'
  }
];

const IllustrationContainer = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
    style={{
      position: 'relative',
      width: '100%',
      height: '400px',
      marginTop: '-50px',
    }}
  >
    {/* Ana çerçeve */}
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '350px',
        background: 'rgba(156, 39, 176, 0.1)',
        borderRadius: '20px',
        border: '2px solid rgba(156, 39, 176, 0.2)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
      }}
    >
      {/* Kod editörü arayüzü */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        style={{
          padding: '20px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Editör başlığı */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '15px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
        </div>

        {/* Kod satırları */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
            style={{
              height: '20px',
              marginBottom: '10px',
              background: `rgba(186, 104, 200, ${0.1 + (i % 3) * 0.1})`,
              borderRadius: '4px',
              width: `${70 + Math.random() * 20}%`,
            }}
          />
        ))}

        {/* Animasyonlu cursor */}
        <motion.div
          animate={{
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            width: '2px',
            height: '20px',
            background: '#ba68c8',
            marginLeft: '4px',
          }}
        />
      </motion.div>
    </motion.div>

    {/* Teknoloji logoları */}
    {techLogos.map((tech, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
        style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: `rgba(${tech.name === 'React' ? '97, 218, 251' : '156, 39, 176'}, 0.1)`,
          border: `2px solid ${tech.color}20`,
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: tech.color,
          top: `${20 + Math.random() * 60}%`,
          left: `${(i * 20) + Math.random() * 10}%`,
          transform: `rotate(${Math.random() * 20 - 10}deg)`,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.1) rotate(0deg)',
            boxShadow: `0 0 20px ${tech.color}40`,
          },
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: tech.name === 'React' ? 10 : 0,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {tech.icon}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'absolute',
            bottom: '-25px',
            background: 'rgba(0,0,0,0.8)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            color: 'white',
            whiteSpace: 'nowrap',
          }}
        >
          {tech.name}
        </motion.div>
      </motion.div>
    ))}
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 0 },
      }}
    >
      {/* Animated background elements */}
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
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
              borderRadius: '50%',
              filter: 'blur(80px)',
              opacity: 0.1,
            }}
            animate={{
              x: [Math.random() * 100, Math.random() * -100],
              y: [Math.random() * 100, Math.random() * -100],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            textAlign: { xs: 'center', md: 'left' },
            gap: { xs: 4, md: 0 }
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            sx={{ 
              flex: 1,
              width: '100%'
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(156, 39, 176, 0.3)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: { xs: '50%', md: 0 },
                    transform: { xs: 'translateX(-50%)', md: 'none' },
                    width: '100px',
                    height: '4px',
                    background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
                    borderRadius: '2px',
                  }
                }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Fikirlerden
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  Gerçekliğe
                </motion.span>
              </Typography>
            </motion.div>

            <motion.div variants={textVariants}>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 4,
                  maxWidth: { xs: '100%', md: '600px' },
                  mx: { xs: 'auto', md: 0 },
                  fontSize: { xs: '1.1rem', md: '1.5rem' },
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                Modern teknolojiler kullanarak etkileyici web deneyimleri oluşturuyorum.
              </Typography>
            </motion.div>

            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: { xs: 'center', md: 'flex-start' },
                '& .MuiButton-root': {
                  width: { xs: '100%', sm: 'auto' }
                }
              }}
            >
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/projects')}
                  sx={{
                    bgcolor: '#9c27b0',
                    '&:hover': {
                      bgcolor: '#7b1fa2',
                    },
                    py: 1.5,
                    px: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: 'all 0.5s',
                    },
                    '&:hover::after': {
                      left: '100%',
                    },
                  }}
                >
                  Projelerimi Görüntüle
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/contact')}
                  sx={{
                    borderColor: '#9c27b0',
                    color: '#ba68c8',
                    '&:hover': {
                      borderColor: '#7b1fa2',
                      bgcolor: 'rgba(156, 39, 176, 0.1)',
                    },
                    py: 1.5,
                    px: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                      transition: 'all 0.5s',
                    },
                    '&:hover::after': {
                      left: '100%',
                    },
                  }}
                >
                  İletişime Geç
                </Button>
              </motion.div>
            </Box>
          </motion.div>

          {/* Illustration only shows on desktop */}
          <Box sx={{ 
            flex: 1, 
            display: { xs: 'none', md: 'flex' }, 
            justifyContent: 'center' 
          }}>
            <IllustrationContainer />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 