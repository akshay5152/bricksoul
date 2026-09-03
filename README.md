# BrickSoul

A modern, high-performance portfolio/showcase website built with **Next.js 15** and powered by **GSAP** animations. BrickSoul delivers stunning visual experiences with smooth scrolling and interactive animations.

🌐 **Live Demo**: [https://chkstepan.vercel.app](https://chkstepan.vercel.app)

## 🎯 Overview

BrickSoul is a cutting-edge web platform designed to showcase creative projects and services with impressive animations and modern design patterns. Built with the latest Next.js framework and GSAP animation library, it provides an engaging and interactive user experience.

## ✨ Key Features

- **Advanced Animations**: Smooth, performant GSAP-powered animations
- **Next.js 15**: Modern framework with optimal performance and SEO
- **React 19**: Latest React features and improvements
- **Responsive Design**: Mobile-friendly and fully responsive layouts
- **Fast Loading**: Optimized for speed and performance
- **Modern UI/UX**: Clean, contemporary design aesthetics
- **TypeScript Ready**: Full TypeScript support for type safety
- **Vercel Optimized**: Seamless deployment and hosting

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Framework** | [Next.js 15.3](https://nextjs.org) |
| **Runtime** | [Node.js](https://nodejs.org/) |
| **React** | [React 19.1](https://react.dev/) |
| **Animations** | [GSAP 3.15](https://gsap.com/) |
| **Module Type** | ES Modules |
| **Deployment** | [Vercel](https://vercel.com) |

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **npm** or **yarn** or **pnpm**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akshay5152/bricksoul.git
   cd bricksoul
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page will auto-update as you edit files in the `app/` directory.

### Building for Production

```bash
npm run build
npm run start
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Run production build locally |

## 🎨 Project Structure

```
bricksoul/
├── app/                    # Next.js app directory (routes and components)
├── public/                 # Static assets (images, icons, etc.)
├── node_modules/           # Dependencies
├── package.json            # Project metadata and scripts
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration (if applicable)
└── README.md              # This file
```

## 🎬 Animation Integration

This project uses **GSAP** for high-performance animations:

```javascript
import gsap from 'gsap';

// Example animation
gsap.to('.element', {
  duration: 1,
  opacity: 1,
  y: 0,
  ease: 'power2.out'
});
```

Explore GSAP features:
- ScrollTrigger for scroll-based animations
- TimelineMax for complex animation sequences
- Morphing for shape transformations
- And much more!

## 🚀 Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel Platform](https://vercel.com):

```bash
vercel
```

Or connect your GitHub repository for continuous deployment.

### Deploy to Other Platforms

This project can also be deployed to:
- **Netlify**: `netlify deploy`
- **AWS Amplify**: `amplify publish`
- **Firebase Hosting**: `firebase deploy`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Next.js Tutorial](https://nextjs.org/learn) - Interactive Next.js learning
- [GSAP Documentation](https://gsap.com/docs/) - Animation library docs
- [React Documentation](https://react.dev/) - React features and best practices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request with improvements or bug fixes.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 💬 Support

For issues or questions, please open a [GitHub Issue](https://github.com/akshay5152/bricksoul/issues).

---

**Built by**: Akshay  
**Last Updated**: 2026  
**Maintained**: ✅ Active
