import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { text: 'Ana Sayfa', path: '/' },
  { text: 'Hakkımda', path: '/about' },
  { text: 'Projeler', path: '/projects' },
  { text: 'İletişim', path: '/contact' },
];

const MobileDrawer = memo(({ open, onClose, location }) => (
  <motion.div
    initial={{ x: '-100%' }}
    animate={{ x: 0 }}
    exit={{ x: '-100%' }}
    transition={{ type: 'tween', duration: 0.2 }}
    style={{
      height: '100%',
      background: 'rgba(26, 26, 26, 0.98)',
      backdropFilter: 'none', // Remove blur on mobile
      borderRight: '1px solid rgba(156, 39, 176, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
      <Typography
        variant="h5"
        component={Link}
        to="/"
        onClick={onClose}
        sx={{
          textDecoration: 'none',
          background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          letterSpacing: '1px',
          fontSize: '1.8rem',
        }}
      >
        Ahmet Yılmaz
      </Typography>
      <IconButton
        onClick={onClose}
        sx={{ color: '#ba68c8' }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
    <List>
      {menuItems.map((item) => (
        <motion.div
          key={item.path}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
        >
          <ListItem
            component={Link}
            to={item.path}
            onClick={onClose}
            sx={{
              mb: 1.5,
              borderRadius: '8px',
              background: location.pathname === item.path ? 'rgba(156, 39, 176, 0.1)' : 'transparent',
              '&:hover': {
                background: 'rgba(156, 39, 176, 0.1)',
              },
            }}
          >
            <ListItemText
              primary={item.text}
              sx={{
                '& .MuiListItemText-primary': {
                  color: location.pathname === item.path ? '#ba68c8' : 'rgba(255, 255, 255, 0.7)',
                  fontSize: '1.1rem',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                },
              }}
            />
          </ListItem>
        </motion.div>
      ))}
    </List>
  </motion.div>
));

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        background: 'rgba(26, 26, 26, 0.95)',
        backdropFilter: { xs: 'none', md: 'blur(8px)' }, // Disable blur on mobile
        borderBottom: '1px solid rgba(156, 39, 176, 0.2)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: '70px' }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              letterSpacing: '1px',
              fontSize: '1.8rem',
            }}
          >
            Ahmet Yılmaz
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 2,
              alignItems: 'center',
              '& .MuiButton-root': {
                fontSize: '1rem',
                fontWeight: 500,
                position: 'relative',
                overflow: 'hidden',
                padding: '8px 16px',
                minWidth: '100px',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'right',
                  transition: 'transform 0.3s ease-in-out',
                },
                '&:hover::after': {
                  transform: 'scaleX(1)',
                  transformOrigin: 'left',
                },
              },
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: location.pathname === item.path ? '#ba68c8' : 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    color: '#ba68c8',
                    background: 'rgba(156, 39, 176, 0.08)',
                  },
                  ...(item.text === 'İletişim' && {
                    background: location.pathname === '/contact'
                      ? 'linear-gradient(45deg, #7b1fa2 30%, #9c27b0 90%)'
                      : 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
                    color: 'white',
                    boxShadow: '0 3px 10px rgba(156, 39, 176, 0.3)',
                    padding: '10px 25px',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #7b1fa2 30%, #9c27b0 90%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 5px 15px rgba(156, 39, 176, 0.4)',
                    },
                    '&::after': {
                      display: 'none',
                    },
                  }),
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: 'none' },
              color: '#ba68c8',
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Menu Drawer */}
      <AnimatePresence mode="wait">
        {mobileOpen && (
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: false, // Changed to false to prevent memory leaks
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                width: '100%',
                maxWidth: '300px',
                background: 'transparent',
                border: 'none',
                WebkitTapHighlightColor: 'transparent',
              },
            }}
          >
            <MobileDrawer open={mobileOpen} onClose={handleDrawerToggle} location={location} />
          </Drawer>
        )}
      </AnimatePresence>
    </AppBar>
  );
};

export default memo(Navbar); 