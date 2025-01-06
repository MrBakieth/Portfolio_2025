import { Box, Container, Typography, Grid, Paper, LinearProgress, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { memo } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const skills = {
  frontend: [
    { name: 'HTML', level: 80 },
    { name: 'CSS', level: 75 },
    { name: 'Tailwind CSS', level: 80 },
    { name: 'Bootstrap', level: 65 },
    { name: 'React.js', level: 80 },
  ],
  backend: [
    { name: 'Node.js', level: 60 },
    { name: 'Express.js', level: 60 },
    { name: 'C#', level: 35 },
    { name: 'ASP.NET', level: 35 },
    { name: 'ASP.NET MVC', level: 35 },
  ],
  database: [
    { name: 'MongoDB', level: 50 },
    { name: 'PostgreSQL', level: 30 },
    { name: 'MS SQL Server', level: 30 },
  ],
  tools: [
    { name: 'Git', level: 70 },
    { name: 'Vite', level: 80 },
    { name: 'Next.js', level: 60 },
    { name: 'Canva', level: 65 },
  ],
};

const education = [
  {
    school: 'Özel Trakya Koleji',
    degree: 'Anadolu Lisesi',
    year: '2014-2018',
  },
  {
    school: 'Lefke Avrupa Üniversitesi',
    degree: 'Yönetim Bilişim Sistemleri (İngilizce)',
    year: '2018-2024',
  },
];

const experience = [
  {
    title: 'Yazılım Geliştirici - Staj',
    company: 'Politem Dynamic Plastic',
    period: 'Yaz 2023',
    description: 'Yazılım geliştirici olarak Politem Plastik firmasının bünyesinde stajımı tamamladım. İçerisinde bulunduğum etkinlikler sayesinde analitik düşünme becerimi, veri yapıları konusunda ve devamında takım içi görev ve sorumluluklar konusundaki becerilerimi geliştirdim.',
  },
];

const certifications = [
  {
    name: 'Web Development Bootcamp',
    issuer: 'Udemy',
    year: '2024',
  },
];

const languages = [
  { name: 'Türkçe', level: 'Anadil' },
  { name: 'İngilizce', level: 'B2' },
];

const About = () => {
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
        maxWidth="lg" 
        sx={{ 
          py: { xs: 11, md: 12 },
          position: 'relative', 
          zIndex: 1 
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontWeight: 'bold',
                mb: 6,
                background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 20px rgba(156, 39, 176, 0.3)',
              }}
            >
              Hakkımda
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {/* Bio Section */}
            <Grid item xs={12}>
              <motion.div variants={fadeInUp}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    bgcolor: 'rgba(45, 45, 45, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(156, 39, 176, 0.2)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Typography variant="body1" paragraph sx={{ color: 'white', lineHeight: 1.8 }}>
                    Kendimi sürekli geliştiren ve öğrenmeye açık 24 yaşında bir web geliştiriciyim. Son iki yıldır HTML, CSS, JavaScript, Node.js ve MongoDB gibi teknolojilerle projeler geliştiriyorum. Kullanıcı deneyimini önceliklendirerek modern ve işlevsel tasarımlar oluşturmayı hedefliyorum. Lefke Avrupa Üniversitesi Yönetim Bilişim Sistemleri bölümünden mezun oldum ve analitik düşünme ile problem çözme yetkinliklerimi geliştirdim. React.js ve Tailwind CSS gibi araçlarla responsive uygulamalar geliştirme konusunda bilgiliyim. Teknolojiye olan tutkumla, uzman bir web geliştirici olmayı hedefliyorum.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>

            {/* Skills Section */}
            <Grid item xs={12}>
              <motion.div variants={fadeInUp}>
                <Typography variant="h4" gutterBottom sx={{ color: '#ba68c8', mb: 3, textShadow: '0 0 10px rgba(156, 39, 176, 0.3)' }}>
                  Teknik Beceriler
                </Typography>
              </motion.div>
              <Grid container spacing={3}>
                {Object.entries(skills).map(([category, items], index) => (
                  <Grid item xs={12} md={6} key={category}>
                    <motion.div
                      variants={fadeInUp}
                      custom={index}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          p: 3,
                          bgcolor: 'rgba(45, 45, 45, 0.9)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(156, 39, 176, 0.2)',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                          },
                        }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ color: '#ba68c8', textTransform: 'capitalize', textShadow: '0 0 10px rgba(156, 39, 176, 0.3)' }}
                        >
                          {category.replace('_', ' ')}
                        </Typography>
                        {items.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: skillIndex * 0.1 }}
                          >
                            <Box sx={{ mb: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" sx={{ color: 'white' }}>
                                  {skill.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                  {skill.level}%
                                </Typography>
                              </Box>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1, delay: skillIndex * 0.1 }}
                              >
                                <LinearProgress
                                  variant="determinate"
                                  value={skill.level}
                                  sx={{
                                    bgcolor: 'rgba(156, 39, 176, 0.2)',
                                    height: 6,
                                    borderRadius: 3,
                                    '& .MuiLinearProgress-bar': {
                                      bgcolor: '#ba68c8',
                                      borderRadius: 3,
                                    },
                                  }}
                                />
                              </motion.div>
                            </Box>
                          </motion.div>
                        ))}
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Experience Section */}
            <Grid item xs={12}>
              <motion.div variants={fadeInUp}>
                <Typography variant="h4" gutterBottom sx={{ color: '#ba68c8', mb: 3, textShadow: '0 0 10px rgba(156, 39, 176, 0.3)' }}>
                  İş Deneyimi
                </Typography>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    bgcolor: 'rgba(45, 45, 45, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(156, 39, 176, 0.2)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  {experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      custom={index}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Box sx={{ mb: index !== experience.length - 1 ? 3 : 0 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                          {exp.title}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#ba68c8' }}>
                          {exp.company}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {exp.period}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          {exp.description}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Paper>
              </motion.div>
            </Grid>

            {/* Education Section */}
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeInUp}>
                <Typography variant="h4" gutterBottom sx={{ color: '#ba68c8', mb: 3, textShadow: '0 0 10px rgba(156, 39, 176, 0.3)' }}>
                  Eğitim
                </Typography>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    bgcolor: 'rgba(45, 45, 45, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(156, 39, 176, 0.2)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      custom={index}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Box sx={{ mb: index !== education.length - 1 ? 3 : 0 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                          {edu.school}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#ba68c8' }}>
                          {edu.degree}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {edu.year}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Paper>
              </motion.div>
            </Grid>

            {/* Certifications & Languages Section */}
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeInUp}>
                <Typography variant="h4" gutterBottom sx={{ color: '#ba68c8', mb: 3, textShadow: '0 0 10px rgba(156, 39, 176, 0.3)' }}>
                  Sertifikalar ve Dil Bilgisi
                </Typography>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    bgcolor: 'rgba(45, 45, 45, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(156, 39, 176, 0.2)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                    Sertifikalar
                  </Typography>
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      custom={index}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#ba68c8' }}>
                          {cert.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {cert.issuer} - {cert.year}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}

                  <Typography variant="h6" gutterBottom sx={{ color: 'white', mt: 3 }}>
                    Dil Bilgisi
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {languages.map((lang, index) => (
                      <motion.div
                        key={lang.name}
                        variants={fadeInUp}
                        custom={index}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: index * 0.1 }}
                      >
                        <Chip
                          label={`${lang.name} - ${lang.level}`}
                          sx={{
                            bgcolor: 'rgba(156, 39, 176, 0.2)',
                            color: 'white',
                            border: '1px solid rgba(156, 39, 176, 0.3)',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              bgcolor: 'rgba(156, 39, 176, 0.3)',
                              transform: 'scale(1.05)',
                            },
                          }}
                        />
                      </motion.div>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default memo(About); 