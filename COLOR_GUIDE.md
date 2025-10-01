# Color Guide - EcoZero Certify Platform

## Official Color Palette

This document defines the consistent color scheme used across the entire EcoZero Certify platform. All components, pages, and features should follow these colors to maintain brand consistency.

## Brand Colors

### Primary Colors
```css
/* Primary Emerald - Main brand color */
primary-emerald: #10B981
Use for: Buttons, links, accents, active states, icons

/* Primary Forest - Dark green */
primary-forest: #0D3B2E
Use for: Button hovers, dark backgrounds, footer

/* Accent Gold */
accent-gold: #F59E0B
Use for: Highlights, badges, special callouts
```

### Neutral Colors
```css
/* Neutral Charcoal - Dark text */
neutral-charcoal: #1F2937
Use for: Headings, body text, dark elements

/* Neutral Cream - Light backgrounds */
neutral-cream: #F9FAFB
Use for: Page backgrounds, light sections, cards
```

## Color Usage by Component Type

### 1. Buttons

#### Primary Button
```jsx
className="btn-primary"
// Defined in index.css
// bg-primary-emerald text-white hover:bg-primary-forest
```

#### Secondary Button
```jsx
className="btn-secondary"
// Defined in index.css
// border-2 border-primary-emerald text-primary-emerald hover:bg-primary-emerald hover:text-white
```

#### Example Usage:
```jsx
<button className="btn-primary">Get Started</button>
<button className="btn-secondary">Learn More</button>
```

### 2. Navigation & Header

#### Landing Page Navbar
```jsx
// Background
className="bg-white shadow-lg"  // When scrolled
className="bg-transparent"      // At top

// Logo
<div className="bg-primary-emerald p-2 rounded-lg">
  <Icon className="text-white" />
</div>

// Links
className="text-neutral-charcoal hover:text-primary-emerald"

// CTA Button
className="btn-primary"
```

#### Dashboard Navbar
```jsx
// Background
className="bg-white border-b border-slate-200"

// Logo
<div className="bg-primary-emerald p-2 rounded-lg">
  <Award className="text-white" />
</div>

// Brand text
className="text-slate-900"
```

### 3. Authentication Pages (Login/Signup)

#### Background
```jsx
className="bg-gradient-to-br from-primary-forest via-primary-forest/90 to-neutral-charcoal"
```

#### Form Container
```jsx
className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl"
```

#### Form Inputs
```jsx
// Base input
className="bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3"

// Focus state
className="focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30"

// Complete example
className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg pl-11 pr-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
```

#### Labels
```jsx
className="text-neutral-charcoal text-sm font-medium"
```

#### Links
```jsx
className="text-primary-emerald hover:text-primary-forest font-medium transition-colors"
```

#### Icons
```jsx
className="text-gray-400"  // Default
className="text-primary-emerald"  // Active/accent
```

#### Tabs
```jsx
// Container
className="bg-gray-100 rounded-lg p-1"

// Active tab
className="bg-white text-primary-emerald shadow-md"

// Inactive tab
className="text-gray-600 hover:text-gray-900"
```

#### Checkboxes
```jsx
className="text-primary-emerald border-gray-300 focus:ring-primary-emerald/30"
```

### 4. Messages & Alerts

#### Success Messages
```jsx
className="bg-green-50 border border-green-500 text-green-700 rounded-lg p-3"
```

#### Error Messages
```jsx
className="bg-red-50 border border-red-500 text-red-700 rounded-lg p-3"
```

#### Warning Messages
```jsx
className="bg-yellow-50 border border-yellow-500 text-yellow-700 rounded-lg p-3"
```

#### Info Messages
```jsx
className="bg-blue-50 border border-blue-500 text-blue-700 rounded-lg p-3"
```

### 5. Dashboard Cards

#### Certification Type Cards
```jsx
// Base card
className="bg-white border-2 border-slate-200 rounded-xl p-8"

// Hover state
className="hover:border-primary-emerald hover:shadow-lg"

// Icon
className="text-slate-700 group-hover:text-primary-emerald"

// Title
className="text-slate-900"
```

#### Add New Card (Dashed Border)
```jsx
className="border-2 border-dashed border-slate-300 hover:border-primary-emerald"

// Icon
className="text-primary-emerald"
```

### 6. Text Colors

#### Headings
```jsx
// On light backgrounds
className="text-neutral-charcoal"

// On dark backgrounds
className="text-white"
```

#### Body Text
```jsx
// On light backgrounds
className="text-gray-700"

// On dark backgrounds (auth pages)
className="text-neutral-cream/80"

// Secondary text
className="text-gray-600"  // On light
className="text-slate-300"  // On dark
```

### 7. Backgrounds

#### Page Backgrounds
```jsx
// Landing page sections
className="bg-white"
className="bg-neutral-cream"

// Dashboard
className="bg-slate-100"

// Auth pages
className="bg-gradient-to-br from-primary-forest via-primary-forest/90 to-neutral-charcoal"
```

#### Card Backgrounds
```jsx
className="bg-white"  // Standard cards
className="bg-white/95"  // Auth form cards with blur
```

### 8. Borders

#### Standard Borders
```jsx
className="border border-slate-200"  // Light cards
className="border border-gray-300"   // Form inputs
className="border border-slate-700"  // Dark mode (if used)
```

#### Accent Borders
```jsx
className="border-primary-emerald"  // Active/focus state
```

### 9. Shadows

#### Standard Shadows
```jsx
className="shadow-lg"  // Cards
className="shadow-2xl"  // Modals, important elements
```

#### Hover Shadows
```jsx
className="hover:shadow-xl"
```

## Quick Reference Chart

| Element | Background | Text | Border | Focus/Hover |
|---------|-----------|------|--------|-------------|
| Primary Button | `primary-emerald` | `white` | - | `primary-forest` |
| Secondary Button | `transparent` | `primary-emerald` | `primary-emerald` | `bg: primary-emerald` |
| Input Field | `white` | `neutral-charcoal` | `gray-300` | `border: primary-emerald` |
| Link | - | `primary-emerald` | - | `primary-forest` |
| Card | `white` | `slate-900` | `slate-200` | `border: primary-emerald` |
| Page (Light) | `white/cream` | `charcoal` | - | - |
| Page (Dark) | `forest gradient` | `white/cream` | - | - |
| Success Alert | `green-50` | `green-700` | `green-500` | - |
| Error Alert | `red-50` | `red-700` | `red-500` | - |

## Common Patterns

### Pattern 1: Standard Form Input
```jsx
<div>
  <label className="block text-neutral-charcoal text-sm font-medium mb-2">
    Field Label
  </label>
  <input 
    className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
    placeholder="Enter value"
  />
</div>
```

### Pattern 2: Icon + Input
```jsx
<div className="relative">
  <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
  <input 
    className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg pl-11 pr-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
  />
</div>
```

### Pattern 3: Hover Card
```jsx
<div className="bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-primary-emerald hover:shadow-lg transition-all cursor-pointer group">
  <Icon className="text-slate-700 group-hover:text-primary-emerald transition-colors" />
  <h3 className="text-slate-900">Card Title</h3>
</div>
```

### Pattern 4: Tab Navigation
```jsx
<div className="flex bg-gray-100 rounded-lg p-1">
  <button className="flex-1 py-2 px-4 rounded-md bg-white text-primary-emerald shadow-md">
    Active Tab
  </button>
  <button className="flex-1 py-2 px-4 rounded-md text-gray-600 hover:text-gray-900">
    Inactive Tab
  </button>
</div>
```

## Tailwind Classes Reference

### Pre-defined in tailwind.config.js
```javascript
colors: {
  primary: {
    forest: '#0D3B2E',   // Use as: bg-primary-forest, text-primary-forest
    emerald: '#10B981',  // Use as: bg-primary-emerald, text-primary-emerald
  },
  accent: {
    gold: '#F59E0B',     // Use as: bg-accent-gold, text-accent-gold
  },
  neutral: {
    charcoal: '#1F2937', // Use as: bg-neutral-charcoal, text-neutral-charcoal
    cream: '#F9FAFB',    // Use as: bg-neutral-cream, text-neutral-cream
  }
}
```

### Utility Classes (defined in index.css)
```css
.btn-primary     /* Emerald button with hover effects */
.btn-secondary   /* Outlined emerald button */
.card            /* White card with shadow and hover lift */
```

## Accessibility Guidelines

### Contrast Ratios
- ✅ `primary-emerald` on `white`: 3.4:1 (AA for large text)
- ✅ `neutral-charcoal` on `white`: 12.6:1 (AAA)
- ✅ `white` on `primary-forest`: 13.2:1 (AAA)
- ✅ `white` on `primary-emerald`: 2.8:1 (AA for large text)

### Best Practices
- Use `neutral-charcoal` for body text on light backgrounds
- Use `white` or `neutral-cream/80` for text on dark backgrounds
- Ensure buttons have sufficient contrast (use white text on emerald)
- Use emerald for focus indicators (highly visible)

## Do's and Don'ts

### ✅ Do's
- Use `btn-primary` class for all primary action buttons
- Use `primary-emerald` for all links and accents
- Keep white/cream backgrounds for form containers
- Use forest green for dark page backgrounds (auth pages)
- Maintain consistent hover states (emerald)

### ❌ Don'ts
- Don't use cyan, blue gradients (those are from old design)
- Don't use random green shades (stick to primary-emerald)
- Don't mix color systems (use Tailwind custom colors)
- Don't use dark form backgrounds (use white for readability)
- Don't forget focus states (always use emerald ring)

## Implementation Checklist

When creating new components, ensure:

- [ ] Buttons use `btn-primary` or `btn-secondary` classes
- [ ] Links use `text-primary-emerald hover:text-primary-forest`
- [ ] Form inputs use white backgrounds with emerald focus
- [ ] Cards hover to emerald border
- [ ] Icons transition to emerald on hover
- [ ] Success/error messages use appropriate bg-*-50 colors
- [ ] Dark backgrounds use forest green gradient
- [ ] Text has proper contrast ratios

## Examples from the Codebase

### Auth Layout Background
```jsx
<div className="min-h-screen bg-gradient-to-br from-primary-forest via-primary-forest/90 to-neutral-charcoal flex">
```

### Logo
```jsx
<div className="bg-primary-emerald p-2 rounded-lg">
  <Award className="h-6 w-6 text-white" />
</div>
<span className="text-xl font-bold">EcoZero Certify</span>
```

### Form Input
```jsx
<input 
  className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg px-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
/>
```

### Certification Card
```jsx
<div className="bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-primary-emerald hover:shadow-lg transition-all">
  <Icon className="text-slate-700 group-hover:text-primary-emerald" />
</div>
```

## Color Psychology

### Why Emerald Green?
- 🌿 **Environmental**: Reinforces sustainability and net-zero mission
- 💚 **Growth**: Symbolizes progress and positive change
- 🌍 **Nature**: Connects to eco-friendly certification
- ✅ **Trust**: Professional and credible
- 🎯 **Action**: Encourages user engagement

## Future Considerations

### Dark Mode (Future Enhancement)
If implementing dark mode, maintain the emerald accent:
```jsx
// Dark mode backgrounds
bg-neutral-charcoal

// Dark mode text
text-neutral-cream

// Keep emerald for accents (works in both modes)
text-primary-emerald
border-primary-emerald
```

### Additional Accent Colors (If Needed)
If you need to add status indicators beyond success/error:
```jsx
// Info (use existing blue tones)
bg-blue-50 border-blue-500 text-blue-700

// Warning (use gold accent)
bg-accent-gold/10 border-accent-gold text-accent-gold

// Neutral
bg-gray-50 border-gray-300 text-gray-700
```

## Maintenance

### When Adding New Components
1. Reference this guide for color choices
2. Use Tailwind's custom color classes (`primary-emerald`, etc.)
3. Don't hardcode hex values in components
4. Test contrast ratios for accessibility
5. Maintain hover and focus states with emerald

### When Updating Existing Components
1. Check if using outdated colors (cyan/blue)
2. Replace with emerald equivalents
3. Ensure btn-primary class is used for buttons
4. Verify focus states use emerald

## Quick Copy-Paste Templates

### Button
```jsx
<button className="btn-primary">Click Me</button>
```

### Link
```jsx
<a className="text-primary-emerald hover:text-primary-forest font-medium transition-colors">
  Click Here
</a>
```

### Input with Icon
```jsx
<div className="relative">
  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
  <input 
    className="w-full bg-white border border-gray-300 text-neutral-charcoal rounded-lg pl-11 pr-4 py-3 focus:border-primary-emerald focus:ring-2 focus:ring-primary-emerald/30 outline-none transition-all"
    placeholder="Enter email"
  />
</div>
```

### Card with Hover
```jsx
<div className="bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-primary-emerald hover:shadow-lg transition-all cursor-pointer group">
  <Icon className="text-slate-700 group-hover:text-primary-emerald transition-colors" />
  <h3 className="text-slate-900">Title</h3>
  <p className="text-gray-600">Description</p>
</div>
```

### Success Message
```jsx
<div className="bg-green-50 border border-green-500 text-green-700 rounded-lg p-3">
  ✓ Success message here
</div>
```

### Error Message
```jsx
<div className="bg-red-50 border border-red-500 text-red-700 rounded-lg p-3">
  ✗ Error message here
</div>
```

## Brand Name

Always use:
- **"EcoZero Certify"** (not CertifyPro)
- Consistent capitalization
- With Award icon from Lucide
- Emerald green logo background

---

**Version**: 1.0  
**Last Updated**: October 1, 2025  
**Status**: ✅ Official Color Guide  

Use this guide as the single source of truth for all color decisions in the EcoZero Certify platform.

