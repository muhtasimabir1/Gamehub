# GameHub - A Game Library

An engaging online library for discovering and supporting indie game developers. Users can browse indie games, see detailed information, and download their favorite titles.

## 🎮 Live URL

[]

## ✨ Key Features

- **Homepage with Banner Slider**: Eye-catching 3-slide carousel showcasing featured games
- **Popular Games Section**: Top-rated games sorted by user ratings
- **Newsletter Subscription**: Stay updated with latest game releases and deals
- **All Games Library**: Browse complete collection of indie games
- **Game Details Pages**: Comprehensive information including cover art, ratings, developer info, and download links
- **Firebase Authentication**: Secure email/password and Google Sign-In integration
- **Password Validation**: Strong password requirements (6+ characters, uppercase, lowercase)
- **User Profiles**: Personalized profile pages with avatar support
- **Profile Management**: Update name and photo URL
- **Password Recovery**: Forgot password functionality with email pre-fill
- **Protected Routes**: Game details accessible only to authenticated users
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Dynamic Page Titles**: SEO-friendly title updates based on current page
- **Smooth Animations**: Motion (Framer Motion) powered transitions and interactions
- **Dark Mode**: Vibrant urban-themed dark UI with neon accents
- **404 Page**: Custom error page for invalid routes

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **JavaScript (JSX)** - Converted from TypeScript for simplicity
- **Wouter** - Lightweight routing
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **Lucide React** - Icon system
- **Framer Motion** - Animation library
- **Firebase** - Authentication (email/password + Google Sign-In)

### Backend
- **Express.js** - Server framework
- **Vite** - Build tool and dev server

### Development
- **Node.js 20** - Runtime environment
- **ESBuild** - Fast bundling

## 📦 NPM Packages

### Core Dependencies
- `react` & `react-dom` - React framework
- `wouter` - Routing
- `@tanstack/react-query` - Server state management
- `firebase` - Authentication
- `express` - Backend server
- `vite` - Build tool

### UI & Styling
- `tailwindcss` - CSS framework
- `@tailwindcss/typography` - Typography plugin
- `tailwindcss-animate` - Animation utilities
- `class-variance-authority` - Variant styling
- `tailwind-merge` - Class name merging
- `clsx` - Conditional classes
- `lucide-react` - Icons
- `react-icons` - Additional icons (Google logo)

### Forms & Validation
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Form validation
- `zod` - Schema validation
- `zod-validation-error` - Error formatting
- `drizzle-zod` - Drizzle-Zod integration

### UI Components (shadcn/ui & Radix)
- `@radix-ui/react-*` - Headless UI components
- `cmdk` - Command menu
- `vaul` - Drawer component
- `input-otp` - OTP inputs
- `recharts` - Charts
- `react-day-picker` & `date-fns` - Date pickers
- `embla-carousel-react` - Carousels

### Animations
- `framer-motion` - Animation library

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- Firebase account with configured project

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file or use Replit Secrets with:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_PROJECT_ID=your_project_id
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at the provided development URL.

## 🌐 Deployment

### Deploy to Netlify

This project is pre-configured for Netlify deployment.

**Quick steps:**
1. Upload project to Netlify (drag-and-drop or GitHub)
2. Add Firebase environment variables in Netlify dashboard
3. Netlify will automatically build and deploy

Build settings (auto-detected from `netlify.toml`):
- Build command: `npm run build:netlify`
- Publish directory: `dist`
- Node version: 20

## 🎨 Design Philosophy

GameHub features a **vibrant urban-themed dark UI** inspired by modern gaming platforms like Steam and Epic Games Store:

- **Dark-first aesthetic** with neon purple and cyan accents
- **High contrast typography** using Rajdhani and Inter fonts
- **Card-based layouts** with smooth hover animations
- **Immersive banner slider** with game imagery
- **Gaming-focused color scheme** optimized for dark environments

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Authentication Flow

1. **Registration**: Users create accounts with name, email, optional photo URL, and validated password
2. **Login**: Email/password or Google Sign-In
3. **Protected Routes**: Game details require authentication
4. **Profile Management**: Update name and photo after login
5. **Password Recovery**: Email-based password reset via Gmail

## 📄 License

All rights reserved © 2025 GameHub

## 🤝 Contributing

This is a student project for educational purposes.

---

Built with ❤️ using React, Firebase, and modern web technologies.
