# Transtel Communications - Client Application

A modern, responsive web application for Transtel Communications, showcasing enterprise communication solutions including PABX systems, Nurse Call Systems, and Voice Logging solutions.

## 🚀 Features

- **Product Catalog**: Browse and explore communication products by category
- **Admin Dashboard**: Comprehensive analytics with Chart.js visualizations
- **Product Management**: Full CRUD operations for products and categories
- **SEO Optimized**: Dynamic meta tags and sitemap generation
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Firebase Integration**: Real-time database and authentication
- **Spec Sheet Management**: Upload and manage product documentation

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Firebase** - Backend services (Firestore, Storage, Auth)
- **Chart.js** - Data visualization for admin dashboard
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📁 Project Structure

```
client/
├── public/              # Static assets
│   ├── robots.txt      # SEO robots file
│   └── sitemap.xml     # SEO sitemap
├── src/
│   ├── components/     # React components
│   │   ├── admin/     # Admin panel components
│   │   ├── common/    # Shared components
│   │   ├── home/      # Homepage components
│   │   └── product/   # Product-related components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── utils/         # Utility functions
│   ├── firebase.js    # Firebase configuration
│   └── App.jsx        # Main app component
└── package.json
```

## 🎨 Key Features

### Admin Dashboard
- Real-time product statistics
- Category distribution bar chart
- Spec sheet coverage visualization
- Recent products timeline

### Product Management
- Add/Edit/Delete products
- Category management
- Image upload with Google Drive support
- Spec sheet URL management

### Public Pages
- Homepage with featured products
- Product catalog with category filtering
- Product detail pages
- About and Support pages

## 🚢 Deployment

This project is configured for deployment on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically on push

## 📝 License

Private - Transtel Communications

## 👥 Contact

For support or inquiries, visit [Transtel Communications](https://transtel.com)