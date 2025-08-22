# TravelList - Premium Travel Bucket List Website

A beautiful, multi-language travel bucket list application that helps users track, plan, and share their global travel adventures.

## 🌟 Features

### 🔐 Authentication System
- Simple email/password registration (no OTP required)
- User dashboard with personal bucket lists
- Session management with "remember me" option
- Basic profile management (name, email, profile picture)

### 🌍 Multi-Language Support
Complete website translation in 5 languages:
- **English** (default)
- **Hindi** (हिंदी)
- **Japanese** (日本語)  
- **French** (Français)
- **Spanish** (Español)

Features include:
- Language selector in navigation
- Localized UI elements, buttons, forms, and messages
- Error messages and notifications in selected language

### 🎨 Premium Design
- Smooth, premium, formal aesthetic with modern rounded widgets
- Light/dark theme toggle with system preference detection
- Clean Inter typography with proper multi-language font support
- Responsive design optimized for both desktop and mobile
- SEO-friendly structure with proper meta tags

### 🗺️ Hero Section
- Interactive world map background
- Elegant overlay with compelling call-to-action
- Smooth animations and floating elements
- Professional travel-focused gradients

### ✈️ Core Functionality

#### Destination Management
- **Quick Add**: Fast text input with autocomplete
- **Detailed Add**: Complete form with:
  - Destination name and country
  - Best time to visit
  - Estimated budget
  - Priority level (High/Medium/Low)
  - Personal notes
  - Status (Wishlist/Planned/Visited)
- Drag-and-drop reordering
- Multi-language search across all lists

#### Progress Tracking
- Visual statistics dashboard
- Countries visited vs planned tracking
- Completion percentage calculations
- Achievement badges system
- Beautiful charts showing progress over time

#### Data Management
- **Export Options**: JSON and PDF formats
- **Import Data**: Upload previously exported files
- **Offline Capabilities**: View and edit without internet
- **Data Sync**: Automatic sync when connection restored

### 📱 Mobile Optimization
- Touch-friendly interfaces (44px minimum touch targets)
- Swipe gestures for card interactions
- Collapsible navigation for better mobile experience
- Native mobile feel with appropriate spacing

### 🚀 Technical Features
- **Progressive Web App (PWA)** ready
- **Local Storage** based (no database required)
- **Fast Loading** (under 3 seconds)
- **SEO Optimized** for all languages
- **Accessibility Compliant** (WCAG 2.1 AA)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui
- **Routing**: React Router DOM
- **Internationalization**: i18next + react-i18next
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Hosting**: Vercel optimized

## 📋 Prerequisites

Before running this project locally, make sure you have:

- **Node.js** (version 16.0 or higher)
- **npm** (usually comes with Node.js)

### Installing Node.js

#### Option 1: Direct Download
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS version for your operating system
3. Run the installer and follow the instructions

#### Option 2: Using NVM (Recommended)
```


# Install nvm (Node Version Manager)

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal, then install and use Node.js

nvm install --lts
nvm use --lts

```

## 🚀 Local Development Setup

### 1. Clone the Repository

git clone https://github.com/Sanket-Bharadwaj/travellist.git
cd travellist



### 2. Install Dependencies

```

npm install

```

This will install all required packages including:
- React and React DOM
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- React Router
- i18next for translations
- And all other dependencies

### 3. Start the Development Server

```

npm run dev

```

The application will start and be available at:
```

http://localhost:8080

```

### 4. Build for Production

```

npm run build

```

This creates an optimized production build in the `dist` folder.

### 5. Preview Production Build

```

npm run preview

```

## 📁 Project Structure

```

src/
├── assets/              \# Images and static assets
├── components/          \# Reusable UI components
│   ├── ui/             \# Shadcn/ui components
│   ├── Navigation.tsx  \# Main navigation component
│   ├── HeroSection.tsx \# Landing page hero
│   ├── AuthModal.tsx   \# Authentication modal
│   └── ThemeProvider.tsx \# Theme management
├── contexts/           \# React contexts
│   └── AuthContext.tsx \# Authentication state
├── hooks/             \# Custom React hooks
├── i18n/             \# Internationalization
│   └── config.ts     \# Translation configurations
├── pages/            \# Application pages
│   ├── Index.tsx     \# Landing page
│   ├── Dashboard.tsx \# User dashboard
│   ├── BucketList.tsx \# Destination management
│   ├── Progress.tsx  \# Progress tracking
│   └── Settings.tsx  \# User settings
├── lib/              \# Utility libraries
├── App.tsx          \# Main application component
├── main.tsx         \# Application entry point
└── index.css        \# Global styles and design system

```

## 🎨 Design System

The app uses a comprehensive design system with:

### Color Palette
- **Ocean Blue**: Primary travel theme color
- **Teal**: Secondary accent color
- **Sage Green**: Supporting color
- **Sunset Orange**: Warm accent
- **Gold**: Achievement highlights

### Typography
- **Font**: Inter (supports all languages)
- **Scales**: Responsive typography system
- **Weights**: 300-800 range

### Components
- **Cards**: Premium rounded cards with hover effects
- **Buttons**: Multiple variants (hero, secondary, outline)
- **Status Indicators**: Color-coded destination status
- **Progress Bars**: Custom styled progress tracking

## 🌐 Multi-Language Setup

### Adding New Languages

1. **Add language to config**:
```

// src/i18n/config.ts
const resources = {
// ... existing languages
de: {
translation: {
// Add German translations
}
}
};

```

2. **Add to language selector**:
```

// src/components/Navigation.tsx
const languageOptions = [
// ... existing options
{ code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

```

### Translation Keys
All translation keys are organized by feature:
- `nav.*` - Navigation items
- `hero.*` - Hero section
- `auth.*` - Authentication
- `dashboard.*` - Dashboard
- `destination.*` - Destination management
- `progress.*` - Progress tracking
- `settings.*` - Settings
- `common.*` - Common UI elements

## 🔧 Configuration

### Environment Variables
This app uses local storage only and doesn't require environment variables for basic functionality.

### Customization

#### Theme Colors
Edit `src/index.css` to customize the design system:

```

:root {
--travel-ocean: 205 84% 65%;
--travel-teal: 174 72% 56%;
/* Add your custom colors */
}

```

#### Add New Features
1. Create components in `src/components/`
2. Add pages in `src/pages/`
3. Update routing in `src/App.tsx`
4. Add translations in `src/i18n/config.ts`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect to GitHub**:
   - Push your code to GitHub
   - Connect your Vercel account to your GitHub repository
   - Vercel will automatically build and deploy

2. **Manual Deployment**:
```

npm run build
npx vercel --prod

```

### Deploy to Other Platforms

#### Netlify
```

npm run build

# Upload the 'dist' folder to Netlify

```

#### GitHub Pages
```

npm run build

# Configure GitHub Pages to serve from 'dist' folder

```

## 📱 PWA Features

The app is PWA-ready with:
- **Offline Support**: View and edit destinations without internet
- **Install Prompt**: Users can install as a native app
- **Fast Loading**: Optimized for performance
- **Responsive**: Works perfectly on all devices

## 🔒 Security Features

- **Local Authentication**: Secure password hashing
- **Data Privacy**: All data stored locally
- **No External Dependencies**: No third-party auth services
- **Session Management**: Secure session handling

## 🐛 Troubleshooting

### Common Issues

1. **Dependencies Not Installing**:
```

rm -rf node_modules package-lock.json
npm install

```

2. **Port Already in Use**:
```

npm run dev -- --port 3001

```

3. **Build Errors**:
- Check TypeScript errors: `npm run type-check`
- Ensure all imports are correct
- Verify component exports

### Getting Help

- Check the issues section on [GitHub](https://github.com/Sanket-Bharadwaj/travellist/issues)
- Review the documentation
- Contact the maintainer for support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm run test` (when available)
5. Build and verify: `npm run build`
6. Commit changes: `git commit -m "Add feature"`
7. Push to branch: `git push origin feature-name`
8. Create a Pull Request

## 📄 License

This project is available under the MIT License.

## 🎯 Roadmap

### Upcoming Features
- [ ] Advanced filtering and sorting
- [ ] Travel expense tracking
- [ ] Photo galleries for destinations
- [ ] Social sharing improvements
- [ ] Travel recommendations
- [ ] Calendar integration
- [ ] Weather information
- [ ] Currency converter integration

## 👨‍💻 Developer

**Sanket Bharadwaj**  
GitHub: [github.com/Sanket-Bharadwaj](https://github.com/Sanket-Bharadwaj)
