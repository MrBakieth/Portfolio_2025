const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Create new message
// @route   POST /api/messages
// @access  Public
router.post('/', async (req, res) => {
  try {
    console.log('Received message request:', req.body);
    
    const { name, email, phone, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'Lütfen tüm gerekli alanları doldurun.' 
      });
    }

    // E-posta formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Geçerli bir e-posta adresi girin.' 
      });
    }

    console.log('Creating message in database...');
    // Veritabanına kaydet
    const newMessage = await Message.create({
      name,
      email,
      phone,
      subject,
      message,
    });
    console.log('Message created in database:', newMessage);

    res.status(201).json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi.',
      data: newMessage
    });
  } catch (error) {
    console.error('Message creation error:', {
      error: error.message,
      stack: error.stack
    });

    // MongoDB bağlantı hatası kontrolü
    if (error.name === 'MongooseError' || error.name === 'MongoError') {
      return res.status(500).json({ 
        message: 'Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.' 
      });
    }

    res.status(500).json({ 
      message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
router.put('/:id/read', protect, admin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      message.read = true;
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      await message.deleteOne();
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 