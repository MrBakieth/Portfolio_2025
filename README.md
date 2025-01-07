# Modern Portfolio Website


## 🌟 Özellikler

- ⚡️ Modern ve Responsive Tasarım
- 🎨 Animasyonlu UI Bileşenleri
- 📱 Mobil Uyumlu Arayüz
- 🌙 Dark Mode
- 📧 İletişim Formu
- 🔒 Admin Paneli
- 🎯 SEO Optimizasyonu

## 🛠️ Kullanılan Teknolojiler

### Frontend
- React.js
- Material-UI
- Framer Motion
- React Router
- Axios
- React Helmet Async

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cors

### Deployment
- Vercel (Frontend & API)
- MongoDB Atlas (Database)

## 🚀 Kurulum

1. Repoyu klonlayın

bash
git clone https://github.com/yourusername/portfolio-2025.git

2. Proje dizinine gidin

bash
cd portfolio-2025

3. Bağımlılıkları yükleyin

bash
npm install

4. `.env` dosyası oluşturun ve gerekli değişkenleri ekleyin

env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

5. Geliştirme sunucusunu başlatın

bash
npm run dev

## 📁 Proje Yapısı

portfolio-2025/
├── src/
│ ├── components/
│ │ ├── admin/
│ │ ├── shared/
│ │ └── ...
│ ├── services/
│ ├── pages/
│ └── App.jsx
├── api/
│ ├── handler.js
│ └── index.js
├── server/
│ ├── models/
│ ├── routes/
│ └── middleware/
└── public/

## 💻 Kullanım

### Geliştirme

bash
Frontend geliştirme sunucusu
npm run dev
Backend geliştirme sunucusu
npm run server:dev

### Production Build

bash
Frontend build
npm run build
Backend production
npm run server

## 🔑 Admin Panel

Admin paneline erişmek için:
1. `/admin` yoluna gidin
2. Admin kimlik bilgilerinizle giriş yapın
3. Mesajları ve projeleri yönetin

## 📝 API Endpoints

### Messages
- `POST /api/messages` - Yeni mesaj oluştur
- `GET /api/messages` - Tüm mesajları getir (Admin)
- `PUT /api/messages/:id/read` - Mesajı okundu olarak işaretle (Admin)
- `DELETE /api/messages/:id` - Mesajı sil (Admin)

### Auth
- `POST /api/auth/login` - Admin girişi
- `GET /api/auth/profile` - Admin profili

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun









