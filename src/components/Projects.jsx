import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { memo } from 'react';

const ProjectCard = memo(({ project }) => (
  <Card 
    sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'rgba(45, 45, 45, 0.5)',
      backdropFilter: { xs: 'none', md: 'blur(10px)' },
      border: '1px solid rgba(156, 39, 176, 0.2)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 20px 40px rgba(156, 39, 176, 0.3)',
      },
    }}
  >
    <CardMedia
      component="img"
      height="200"
      image={project.image}
      alt={project.title}
      sx={{
        borderBottom: '1px solid rgba(156, 39, 176, 0.2)',
      }}
    />
    <CardContent sx={{ flexGrow: 1, p: 3 }}>
      <Typography 
        gutterBottom 
        variant="h5" 
        component="h2"
        sx={{
          color: '#ba68c8',
          fontWeight: 600,
        }}
      >
        {project.title}
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          mb: 2,
        }}
      >
        {project.description}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {project.tags.map((tag, idx) => (
          <Typography
            key={idx}
            variant="caption"
            sx={{
              background: 'rgba(156, 39, 176, 0.1)',
              color: '#ba68c8',
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(156, 39, 176, 0.2)',
            }}
          >
            {tag}
          </Typography>
        ))}
      </Box>
    </CardContent>
    <CardActions sx={{ p: 2, pt: 0 }}>
      <Button 
        size="small" 
        startIcon={<LaunchIcon />}
        href={project.demoLink}
        target="_blank"
        sx={{
          color: '#ba68c8',
          '&:hover': {
            background: 'rgba(156, 39, 176, 0.1)',
          },
        }}
      >
        Demo
      </Button>
      <Button 
        size="small" 
        startIcon={<GitHubIcon />}
        href={project.codeLink}
        target="_blank"
        sx={{
          color: '#ba68c8',
          '&:hover': {
            background: 'rgba(156, 39, 176, 0.1)',
          },
        }}
      >
        Kod
      </Button>
    </CardActions>
  </Card>
));

const Projects = () => {
  const projects = [
    {
      title: 'Akıllı Ev Yönetim Sistemi',
      description: 'IoT cihazları için geliştirilmiş, gerçek zamanlı veri takibi ve kontrol imkanı sunan web uygulaması. React, Node.js ve MongoDB kullanılarak geliştirildi.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      demoLink: 'https://smart-home.demo.com',
      codeLink: 'https://github.com/username/smart-home',
      tags: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'IoT'],
    },
    {
      title: 'Online Eğitim Platformu',
      description: 'Canlı ders, video içerik ve interaktif quiz özellikleri sunan kapsamlı eğitim platformu. Next.js, Laravel ve PostgreSQL ile geliştirildi.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80',
      demoLink: 'https://edu-platform.demo.com',
      codeLink: 'https://github.com/username/edu-platform',
      tags: ['Next.js', 'Laravel', 'PostgreSQL', 'WebRTC'],
    },
    {
      title: 'E-Ticaret Yönetim Sistemi',
      description: 'Çoklu satıcı desteği, stok takibi ve analitik özellikleri sunan e-ticaret yönetim sistemi. React, Express.js ve MongoDB kullanıldı.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      demoLink: 'https://ecommerce.demo.com',
      codeLink: 'https://github.com/username/ecommerce',
      tags: ['React', 'Express.js', 'MongoDB', 'Redux'],
    },
    {
      title: 'Restoran Rezervasyon Sistemi',
      description: 'QR menü, online rezervasyon ve masa yönetimi özellikleri sunan restoran yönetim sistemi. Vue.js ve Firebase kullanılarak geliştirildi.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      demoLink: 'https://restaurant.demo.com',
      codeLink: 'https://github.com/username/restaurant',
      tags: ['Vue.js', 'Firebase', 'Vuetify', 'PWA'],
    },
  ];

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
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          py: { xs: 10, md: 12 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Typography 
            variant="h3" 
            gutterBottom 
            align="center"
            sx={{
              background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: { xs: 3, md: 6 },
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              textShadow: { xs: 'none', md: '0 0 20px rgba(156, 39, 176, 0.3)' },
            }}
          >
            Projelerim
          </Typography>

          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default memo(Projects); 