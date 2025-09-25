# IPNOTEC.VIP - Futuristic Landing Page Development Prompt

## 🎯 Project Overview
Create a stunning, conversion-focused landing page for IPNOTEC.VIP that captures early users for the January 10, 2026 FUTURE 11 event. The design should be visually striking with premium glassmorphic aesthetics inspired by Nothing Phone's minimalist design philosophy.

## 🛠 Tech Stack Requirements
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS 3.4+
- **UI Components**: Use MCP shadcn integration + context7 MCP for latest Aceternity UI docs
- **Component Source**: Pull components directly from https://ui.aceternity.com/components via MCP
- **Animations**: Framer Motion (leveraging Aceternity's built-in animations)
- **Database**: MongoDB with Mongoose
- **Payments**: Razorpay integration
- **Forms**: React Hook Form + Zod validation
- **State**: Zustand for global state
- **Typography**: DOTO font family
- **Icons**: Lucide React

### MCP Integration Instructions
- **Use existing MCP setup** with shadcn for component scaffolding
- **Leverage context7 MCP** to fetch latest Aceternity component docs and code
- **Priority**: Always check Aceternity docs via MCP before implementing components

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--bg-primary: #000000
--bg-secondary: #0a0a0a
--text-primary: #ffffff
--text-secondary: #a3a3a3

/* Accent Colors */
--neon-green: #00ff88
--neon-blue: #00d4ff
--neon-purple: #8b5cf6

/* Glass Colors */
--glass-white: rgba(255, 255, 255, 0.1)
--glass-border: rgba(255, 255, 255, 0.2)
```

### Glassmorphic Style Guide
```css
.glass-card {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.glass-button {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 255, 136, 0.3);
}
```

## 📱 Component Implementation Strategy

### MCP-First Approach
```bash
# Use your existing MCP setup to:
# 1. Fetch latest Aceternity components via context7 MCP
# 2. Install shadcn components as base when needed
# 3. Always check Aceternity docs first for visual components

# Example MCP workflow:
@context7 https://ui.aceternity.com/components/hero-parallax
@context7 https://ui.aceternity.com/components/background-gradient
@context7 https://ui.aceternity.com/components/floating-navbar
@context7 https://ui.aceternity.com/components/card-hover-effect
@context7 https://ui.aceternity.com/components/timeline
@context7 https://ui.aceternity.com/components/lamp-effect
```

### Priority Aceternity Components to Use

#### 1. Hero Section
```tsx
// Use MCP to fetch: Hero Parallax + Background Gradient Animation
@context7 https://ui.aceternity.com/components/hero-parallax
@context7 https://ui.aceternity.com/components/background-gradient-animation

// Implementation:
// - Hero Parallax for main content with "Your Future Starts Here"
// - Background Gradient Animation for dynamic background
// - Custom overlay with glassmorphic CTA button
```

#### 2. Navigation
```tsx
// Use MCP to fetch: Floating Navbar
@context7 https://ui.aceternity.com/components/floating-navbar

// Customize with glass morphism and IPNOTEC branding
```

#### 3. Feature Cards/I-ID Creation
```tsx
// Use MCP to fetch: Card Hover Effect + Focus Cards
@context7 https://ui.aceternity.com/components/card-hover-effect
@context7 https://ui.aceternity.com/components/focus-cards

// Implement glass-style I-ID creation form with hover effects
```

#### 4. Avatar Customization
```tsx
// Use MCP to fetch: Multi Step Loader + Timeline
@context7 https://ui.aceternity.com/components/multi-step-loader
@context7 https://ui.aceternity.com/components/timeline

// Create multi-step avatar builder with progress visualization
```

#### 5. Confirmation & Dashboard
```tsx
// Use MCP to fetch: Card Stack + Number Ticker
@context7 https://ui.aceternity.com/components/card-stack
@context7 https://ui.aceternity.com/components/number-ticker

// Animated confirmation cards and counting animations
```

#### 6. Countdown Section
```tsx
// Use MCP to fetch: Lamp Effect + Text Generate Effect
@context7 https://ui.aceternity.com/components/lamp-effect
@context7 https://ui.aceternity.com/components/text-generate-effect

// Dramatic countdown section with lamp lighting effect
```

#### 7. Interactive Elements
```tsx
// Use MCP to fetch: Button variants + Sparkles
@context7 https://ui.aceternity.com/components/tailwindcss-buttons
@context7 https://ui.aceternity.com/components/sparkles

// Premium button interactions with sparkle effects
```

## 🚀 Key Features to Implement

### Authentication & I-ID System
- Real-time I-ID availability checking
- Secure user registration
- Unique identifier generation
- Profile management dashboard

### Payment Integration
- Razorpay gateway integration
- Secure payment processing (Rs 1,001)
- Payment confirmation handling
- Receipt generation and email

### Avatar Customization Engine
- Multi-step form wizard
- Real-time preview updates
- Unlimited avatar creation post-payment
- Data persistence and management

### Interactive Elements
- Smooth scroll animations
- Hover effects with glass morphism
- Loading states with skeleton UI
- Micro-interactions for engagement

## 🎭 Animation Guidelines

### Framer Motion Animations
```tsx
// Page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

// Glass card hover effects
const cardHover = {
  scale: 1.02,
  y: -5,
  transition: { type: "spring", stiffness: 300 }
}

// Countdown number animations
const countdownVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 1.2, opacity: 0 }
}
```

### Interaction Patterns
- **Buttons**: Scale on press, glow on hover
- **Forms**: Smooth focus transitions, error shake
- **Cards**: Lift effect with subtle shadows
- **Loading**: Pulsing glass skeleton UI

## 🔧 Implementation Priorities

### Phase 1: MCP Component Research & Setup (Days 1-2)
- **Setup Next.js project** with TypeScript and Tailwind CSS 3.4
- **Use MCP context7** to research and fetch all required Aceternity components
- **Install shadcn base** only where Aceternity doesn't provide suitable options
- **Configure DOTO font** loading and optimization
- **Create component library** using fetched Aceternity components

### Phase 2: Visual Foundation (Days 3-4)
- **Implement Hero section** using Aceternity Hero Parallax + Background Gradient
- **Setup Navigation** with Aceternity Floating Navbar (glassmorphic styling)
- **Create base layouts** with responsive grid system
- **Test all animations** and ensure smooth performance

### Phase 3: Interactive Features (Days 5-7)
- **Build I-ID system** using Aceternity Focus Cards for form presentation
- **Integrate payment flow** with Razorpay and Aceternity loading animations
- **Create avatar builder** using Multi Step Loader component
- **Setup MongoDB** schema and API routes with validation

### Phase 4: Advanced Interactions (Days 8-9)
- **Implement dashboard** using Card Stack and Number Ticker components
- **Create countdown section** with Lamp Effect for dramatic presentation  
- **Add micro-interactions** using Sparkles and hover effects
- **Setup state management** with Zustand for seamless UX

### Phase 5: Polish & Optimization (Days 10-11)
- **Fine-tune animations** and ensure 60fps performance
- **Add loading states** using Aceternity skeleton components
- **Optimize for mobile** with responsive Aceternity components
- **Cross-browser testing** and accessibility improvements

### Phase 6: Testing & Deployment (Days 12-14)
- **Performance optimization** (Core Web Vitals)
- **Security testing** for payment integration
- **SEO optimization** and meta tags
- **Deploy to Vercel** with environment configuration

## 🎨 MCP Component Mapping

### Essential Aceternity Components (Fetch via MCP)
```typescript
// Always use MCP to get latest versions:
const ACETERNITY_COMPONENTS = [
  'hero-parallax',           // Main hero section
  'background-gradient-animation', // Dynamic backgrounds  
  'floating-navbar',         // Navigation
  'card-hover-effect',       // Interactive cards
  'focus-cards',            // Feature highlights
  'multi-step-loader',      // Progress indicators
  'timeline',               // Process visualization
  'lamp-effect',            // Dramatic sections
  'number-ticker',          // Animated counters
  'text-generate-effect',   // Text animations
  'sparkles',               // Premium effects
  'tailwindcss-buttons',    // Interactive buttons
  'card-stack',             // Layered presentations
  'background-beams',       // Subtle backgrounds
]
```

### Component Customization Strategy
```tsx
// Base Aceternity component + glassmorphic overrides
const GlassCard = ({ children, ...props }) => {
  return (
    <AceternityCard 
      {...props}
      className={cn(
        "backdrop-blur-xl bg-white/5 border border-white/10",
        "hover:bg-white/10 transition-all duration-300",
        props.className
      )}
    >
      {children}
    </AceternityCard>
  )
}
```

## 📊 Conversion Optimization Features

### Trust Building Elements
- Security badges and SSL indicators
- User testimonials/social proof sections
- Money-back guarantee messaging
- Progress indicators showing limited spots

### FOMO Triggers
- "Early Access Only" messaging
- Live user counter (joining now)
- Limited time countdown timers
- Exclusive VIP positioning

### User Experience Enhancements
- One-click social login options
- Mobile-first responsive design
- Fast loading with skeleton states
- Accessibility compliance (WCAG 2.1)

## 🎯 Success Metrics to Track

### Technical KPIs
- Page load time < 2 seconds
- Core Web Vitals in green
- Mobile responsiveness score > 95
- Cross-browser compatibility

### Conversion KPIs
- Landing page to registration rate
- Registration to payment completion
- Overall conversion rate target: 15%+
- User session duration and engagement

## 🛡 Security & Performance

### Security Measures
- Input validation and sanitization
- Secure payment processing
- HTTPS enforcement
- Rate limiting on APIs
- XSS and CSRF protection

### Performance Optimizations
- Image optimization with Next.js
- Code splitting and lazy loading
- CDN for static assets
- Database query optimization
- Caching strategy implementation

## 📱 Mobile-First Approach
- Touch-friendly interactive elements
- Optimized glass effects for mobile
- Fast thumb navigation
- Reduced motion options for accessibility
- Progressive Web App features

---


Create a landing page that not only looks futuristic but converts visitors into paying early adopters through exceptional user experience and compelling value proposition presentation.