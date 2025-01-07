const app = require('./index');

module.exports = async (req, res) => {
  // Vercel'in body parsing'i için
  if (req.body && typeof req.body === 'string') {
    try {
      req.body = JSON.parse(req.body);
    } catch (e) {
      console.error('Error parsing request body:', e);
    }
  }

  // Express uygulamasını çalıştır
  return new Promise((resolve, reject) => {
    app(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}; 