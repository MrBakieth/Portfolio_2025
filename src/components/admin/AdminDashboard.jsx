import { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Message as MessageIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MessageList from './MessageList';
import ProjectList from './ProjectList';
import { messageService, projectService, authService } from '../../services/api';

const drawerWidth = 240;

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    newMessages: 0,
    pendingProjects: 0,
    activeProjects: 0,
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [messages, projects] = await Promise.all([
          messageService.getMessages(),
          projectService.getProjects(),
        ]);

        setStats({
          newMessages: messages.filter((m) => !m.read).length,
          pendingProjects: projects.filter((p) => p.status === 'pending').length,
          activeProjects: projects.filter((p) => p.status === 'approved').length,
        });
        setError('');
      } catch (error) {
        setError('İstatistikler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    if (selectedTab === 'dashboard') {
      fetchStats();
    }
  }, [selectedTab]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, value: 'dashboard' },
    { text: 'Mesajlar', icon: <MessageIcon />, value: 'messages' },
    { text: 'Proje Talepleri', icon: <AssignmentIcon />, value: 'projects' },
    { text: 'Profil', icon: <PersonIcon />, value: 'profile' },
  ];

  const drawer = (
    <Box sx={{ bgcolor: '#1a1a1a', height: '100%' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ color: '#ba68c8' }}>
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(156, 39, 176, 0.2)' }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.value} disablePadding>
            <ListItemButton
              onClick={() => setSelectedTab(item.value)}
              selected={selectedTab === item.value}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(156, 39, 176, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(156, 39, 176, 0.3)',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(156, 39, 176, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ba68c8' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: 'white',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: '#f44336' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Çıkış Yap"
              sx={{
                '& .MuiListItemText-primary': {
                  color: '#f44336',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const renderContent = () => {
    if (loading && selectedTab === 'dashboard') {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    switch (selectedTab) {
      case 'dashboard':
        return (
          <Box>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <Typography variant="h5" gutterBottom>
              Hoş Geldiniz
            </Typography>
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: 'rgba(156, 39, 176, 0.1)',
                  border: '1px solid rgba(156, 39, 176, 0.2)',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Yeni Mesajlar
                </Typography>
                <Typography variant="h4">{stats.newMessages}</Typography>
              </Paper>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: 'rgba(156, 39, 176, 0.1)',
                  border: '1px solid rgba(156, 39, 176, 0.2)',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Bekleyen Projeler
                </Typography>
                <Typography variant="h4">{stats.pendingProjects}</Typography>
              </Paper>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: 'rgba(156, 39, 176, 0.1)',
                  border: '1px solid rgba(156, 39, 176, 0.2)',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Aktif Projeler
                </Typography>
                <Typography variant="h4">{stats.activeProjects}</Typography>
              </Paper>
            </Box>
          </Box>
        );
      case 'messages':
        return <MessageList />;
      case 'projects':
        return <ProjectList />;
      case 'profile':
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Profil
            </Typography>
            <Paper
              sx={{
                p: 3,
                bgcolor: 'rgba(156, 39, 176, 0.1)',
                border: '1px solid rgba(156, 39, 176, 0.2)',
              }}
            >
              <Typography variant="body1" paragraph>
                Admin kullanıcısı profil bilgileri burada görüntülenecek.
              </Typography>
            </Paper>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#1a1a1a' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: '#2d2d2d',
          borderBottom: '1px solid rgba(156, 39, 176, 0.2)',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color: 'white' }}>
            {menuItems.find((item) => item.value === selectedTab)?.text || 'Admin Panel'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: '#1a1a1a',
              borderRight: '1px solid rgba(156, 39, 176, 0.2)',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: '#1a1a1a',
              borderRight: '1px solid rgba(156, 39, 176, 0.2)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: '#1a1a1a',
          color: 'white',
        }}
      >
        <Toolbar />
        <Container maxWidth="xl">
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard; 