# Central Hub Menu - Modern Interactive UI Component

A beautiful, production-ready React component featuring a modern circular floating action menu with smooth animations powered by Framer Motion.

## 🎨 Features

- **Radial Menu Layout**: Icons expand outward from the center in a circular pattern
- **Spring Physics Animations**: Smooth, natural-feeling motion using Framer Motion spring dynamics
- **Staggered Animation**: Each icon animates with a slight delay for a cascading effect
- **Hover Effects**: Scale-up and glowing shadow effects on hover with smooth transitions
- **Center Button Rotation**: Main button rotates 45° when menu opens/closes
- **Backdrop Blur**: Subtle glass-morphism overlay when menu is open
- **Click Outside Detection**: Menu closes when clicking outside or on menu items
- **Console Logging**: Each icon logs its action to the browser console
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **Dark Theme with Neon Colors**: Modern gradient background with neon accent colors
- **Tooltip Labels**: Hover tooltips appear on each menu icon
- **Production-Quality Code**: Clean, modular, and well-documented

## 🚀 Tech Stack

- **React 18** - UI framework
- **Framer Motion** - Animation library with spring physics
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful SVG icon library
- **Vite** - Fast build tool and dev server

## 📦 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will automatically open in your browser at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## 🎯 Features Breakdown

### Center Button

- **Appearance**: Gradient cyan-to-blue circular button with glowing border
- **Animation**: Rotates 45° when menu opens, with animated pulse effect
- **Interaction**: Click to toggle menu open/closed
- **Glow Effect**: Pulsing animated border that activates when menu is open

### Menu Icons

Six interactive menu items arranged in a circular layout:

1. **Home** - Cyan blue accent
2. **Search** - Cyan accent
3. **Settings** - Purple accent
4. **User** - Pink accent
5. **Notifications** - Cyan blue accent
6. **Messages** - Cyan accent

### Animations

#### Opening Animation

- Icons expand from center with spring physics (stiffness: 260, damping: 20)
- Staggered delays create cascading effect (50ms between each icon)
- Scale from 0 to 1 with opacity fade-in
- Each icon follows a calculated radial position

#### Closing Animation

- Smooth reverse animation back to center
- Icons scale down and fade out
- Center button rotates back to 0°
- Backdrop blur fades away

#### Hover Effects

- Icons scale up 1.2x on hover
- Glow shadow intensifies
- Smooth transition to tooltip appearance
- Background color lightens on hover

### Backdrop Overlay

- Semi-transparent dark overlay with blur effect
- Backdrop blur creates glass-morphism aesthetic
- Clicking anywhere on backdrop closes the menu
- Smooth fade in/out animation

## 💻 Component Structure

### CentralHubMenu Component

The main component (`src/CentralHubMenu.jsx`) handles:

- State management for open/closed menu
- Menu item definitions with icons and colors
- Radial position calculations
- Animation variants for Framer Motion
- Event handlers for clicks and outside clicks
- Responsive layout and styling

### Key Props & Configuration

```javascript
// Menu items can be easily customized
const menuItems = [
  { id: 1, label: "Home", icon: Home, color: "neon-blue" },
  // ... more items
];

// Radius controls distance of icons from center
const radius = 120; // pixels

// Animation timing can be adjusted
const itemVariants = {
  open: (custom) => ({
    transition: {
      delay: custom * 0.05, // Stagger delay
    },
  }),
};
```

## 🎮 Usage

### Basic Usage

```jsx
import CentralHubMenu from "./CentralHubMenu";

function App() {
  return <CentralHubMenu />;
}

export default App;
```

### Customizing Menu Items

Edit the `menuItems` array in `CentralHubMenu.jsx`:

```javascript
const menuItems = [
  { id: 1, label: "Dashboard", icon: BarChart3, color: "neon-blue" },
  { id: 2, label: "Profile", icon: CircleUser, color: "neon-pink" },
  // Add your custom items
];
```

### Adjusting Animation Timing

```javascript
// In itemVariants, change the delay multiplier
delay: custom * 0.08 // Increase for slower cascading effect

// In centerButtonVariants, adjust spring values
transition: {
  type: 'spring',
  stiffness: 300,  // Higher = snappier
  damping: 15      // Lower = bouncier
}
```

### Changing Colors

Modify the color mapping in the render section:

```javascript
const colorMap = {
  "neon-blue": { text: "text-cyan-400", glow: "shadow-cyan-400/50" },
  "neon-custom": { text: "text-yellow-400", glow: "shadow-yellow-400/50" },
};
```

## 📱 Responsive Design

- **Mobile**: Full-screen layout with optimized touch targets
- **Tablet**: Larger spacing and scaled-up icons
- **Desktop**: Full interactive experience with hover effects
- Mobile hint text appears on screens under 768px width

## 🔧 Advanced Customization

### Change Radial Distance

```javascript
const radius = 150; // Increase for larger spread
```

### Adjust Animation Duration

```javascript
// Spring animation timing
transition: {
  type: 'spring',
  stiffness: 260,  // Controls oscillation
  damping: 20      // Controls decay
}
```

### Modify Colors & Gradients

Edit the color configuration and background gradients in Tailwind classes:

```jsx
// Center button gradient
className = "bg-gradient-to-br from-cyan-400 to-blue-600";

// Background gradient
className = "bg-gradient-to-br from-slate-900 via-slate-800 to-black";
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 How It Works

### Radial Layout Calculation

Each menu item's position is calculated using trigonometry:

```javascript
const angle = angleSlice * index - Math.PI / 2;
const position = {
  x: Math.cos(angle) * radius,
  y: Math.sin(angle) * radius,
};
```

This creates evenly-spaced icons around a circle centered at the origin.

### Spring Physics

Framer Motion's spring animation provides natural motion:

```javascript
transition: {
  type: 'spring',
  stiffness: 260,  // Spring stiffness
  damping: 20      // Damping ratio
}
```

### Staggered Animation

Each icon has a custom delay based on its index:

```javascript
delay: custom * 0.05; // 0ms, 50ms, 100ms, 150ms, etc.
```

## 🎓 Learning Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Hooks Guide](https://react.dev/reference/react)
- [Lucide React Icons](https://lucide.dev/)

## 📄 License

This project is open source and available under the MIT License.

## 🚀 Performance Considerations

- Uses CSS transforms for smooth 60fps animations
- Backdrop blur is GPU-accelerated
- AnimatePresence prevents DOM elements from being rendered when not needed
- Efficient event listeners with proper cleanup

## 💡 Tips for Best Results

1. **Test on different screen sizes** to ensure responsive behavior
2. **Adjust spring timing** for your preference (lower stiffness = bouncier)
3. **Customize colors** to match your brand
4. **Monitor console logs** to verify icon click functionality
5. **Use React DevTools** to inspect component state and animations

## 🐛 Troubleshooting

### Menu not opening

- Check browser console for JavaScript errors
- Verify Framer Motion is properly installed

### Animations lagging

- Check GPU acceleration in DevTools
- Reduce the number of menu items if needed

### Icons not displaying

- Verify Lucide React is installed
- Check that icon names are correct in menuItems array

### Styling issues

- Clear browser cache and rebuild
- Verify Tailwind CSS is properly configured
- Check for CSS conflicts with other libraries

---

**Enjoy your modern floating action menu!** 🎉
