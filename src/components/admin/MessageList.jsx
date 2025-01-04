import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  MarkEmailRead as MarkEmailReadIcon,
} from '@mui/icons-material';
import { messageService } from '../../services/api';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await messageService.getMessages();
      setMessages(data);
      setError('');
    } catch (error) {
      setError('Mesajlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleClickOpen = (message) => {
    setSelectedMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await messageService.markAsRead(id);
      setMessages(messages.map((message) =>
        message._id === id ? { ...message, read: true } : message
      ));
    } catch (error) {
      setError('Mesaj durumu güncellenirken bir hata oluştu');
    }
  };

  const handleDelete = async (id) => {
    try {
      await messageService.deleteMessage(id);
      setMessages(messages.filter((message) => message._id !== id));
    } catch (error) {
      setError('Mesaj silinirken bir hata oluştu');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Gönderen</TableCell>
              <TableCell>Konu</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>Tarih</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message._id}>
                <TableCell>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    {message.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {message.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    {message.subject}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={message.read ? 'Okundu' : 'Okunmadı'}
                    sx={{
                      bgcolor: message.read
                        ? 'rgba(76, 175, 80, 0.1)'
                        : 'rgba(255, 152, 0, 0.1)',
                      color: message.read ? '#4caf50' : '#ff9800',
                      borderRadius: '4px',
                    }}
                  />
                </TableCell>
                <TableCell>
                  {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleClickOpen(message)}
                    sx={{ color: '#ba68c8' }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {!message.read && (
                    <IconButton
                      size="small"
                      onClick={() => handleMarkAsRead(message._id)}
                      sx={{ color: '#4caf50' }}
                    >
                      <MarkEmailReadIcon />
                    </IconButton>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(message._id)}
                    sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: '#2d2d2d',
            color: 'white',
          },
        }}
      >
        {selectedMessage && (
          <>
            <DialogTitle sx={{ borderBottom: '1px solid rgba(156, 39, 176, 0.2)' }}>
              Mesaj Detayları
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Gönderen:
                </Typography>
                <Typography variant="body2">{selectedMessage.name}</Typography>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                  {selectedMessage.email}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Konu:
                </Typography>
                <Typography variant="body2">{selectedMessage.subject}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tarih:
                </Typography>
                <Typography variant="body2">
                  {new Date(selectedMessage.createdAt).toLocaleDateString('tr-TR')}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Mesaj:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {selectedMessage.message}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              {!selectedMessage.read && (
                <Button
                  onClick={() => handleMarkAsRead(selectedMessage._id)}
                  sx={{ color: '#4caf50' }}
                >
                  Okundu Olarak İşaretle
                </Button>
              )}
              <Button onClick={handleClose} sx={{ color: '#ba68c8' }}>
                Kapat
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default MessageList; 