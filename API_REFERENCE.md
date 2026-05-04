# HeroIO API Reference

This document provides detailed API reference for HeroIO, including localStorage operations, components, and hooks.

## Table of Contents

1. [LocalStorage API](#localstorage-api)
2. [Component API](#component-api)
3. [Utility Functions](#utility-functions)
4. [Hooks](#hooks)
5. [Constants](#constants)

---

## LocalStorage API

All data persistence in HeroIO is handled through browser's localStorage.

### Key: `heroio_installed_apps`

Storage key for the array of installed applications.

#### Data Structure

```typescript
{
  heroio_installed_apps: App[]
}
```

#### App Object

```typescript
interface App {
  id: number;
  name: string;
  description: string;
  icon: string;
  rating: number;
  downloads: number;
  version?: string;
  developer?: string;
  category?: string;
  reviews?: Review[];
  size?: string;
  releaseDate?: string;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}
```

### Methods

#### Get Installed Apps

```javascript
function getInstalledApps() {
  const apps = localStorage.getItem('heroio_installed_apps');
  return apps ? JSON.parse(apps) : [];
}
```

**Returns:** `Array<App>` - Array of installed app objects

**Example:**
```javascript
const installedApps = getInstalledApps();
console.log(installedApps); // [{ id: 1, name: 'App 1', ... }]
```

---

#### Save Installed Apps

```javascript
function saveInstalledApps(apps) {
  localStorage.setItem('heroio_installed_apps', JSON.stringify(apps));
}
```

**Parameters:**
- `apps` (Array): Array of app objects

**Returns:** `void`

**Example:**
```javascript
const updatedApps = [...installedApps, newApp];
saveInstalledApps(updatedApps);
```

---

#### Install App

```javascript
function installApp(app) {
  const installedApps = getInstalledApps();
  
  // Check if app already installed
  if (!installedApps.some(a => a.id === app.id)) {
    installedApps.push(app);
    saveInstalledApps(installedApps);
    return true;
  }
  return false;
}
```

**Parameters:**
- `app` (Object): App object to install

**Returns:** `Boolean` - true if installed, false if already installed

**Example:**
```javascript
const installed = installApp({
  id: 1,
  name: 'My App',
  rating: 4.5,
  downloads: 1000
});
```

---

#### Uninstall App

```javascript
function uninstallApp(appId) {
  const installedApps = getInstalledApps();
  const updated = installedApps.filter(app => app.id !== appId);
  saveInstalledApps(updated);
  return true;
}
```

**Parameters:**
- `appId` (Number): ID of app to uninstall

**Returns:** `Boolean` - true if uninstalled

**Example:**
```javascript
uninstallApp(1);
```

---

#### Check if App Installed

```javascript
function isAppInstalled(appId) {
  const installedApps = getInstalledApps();
  return installedApps.some(app => app.id === appId);
}
```

**Parameters:**
- `appId` (Number): ID to check

**Returns:** `Boolean` - true if installed

**Example:**
```javascript
if (isAppInstalled(1)) {
  console.log('App is installed');
}
```

---

#### Sort Installed Apps

```javascript
function getSortedApps(sortType = 'high-to-low') {
  const installedApps = getInstalledApps();
  
  switch(sortType) {
    case 'high-to-low':
      return [...installedApps].sort((a, b) => b.downloads - a.downloads);
    case 'low-to-high':
      return [...installedApps].sort((a, b) => a.downloads - b.downloads);
    default:
      return installedApps;
  }
}
```

**Parameters:**
- `sortType` (String): 'high-to-low' | 'low-to-high'

**Returns:** `Array<App>` - Sorted apps array

**Example:**
```javascript
const sorted = getSortedApps('high-to-low');
```

---

#### Clear All Apps

```javascript
function clearAllApps() {
  localStorage.removeItem('heroio_installed_apps');
}
```

**Returns:** `void`

**Example:**
```javascript
clearAllApps(); // Remove all installed apps
```

---

## Component API

### Navbar Component

Navigation component for routing and app branding.

#### Props

```typescript
interface NavbarProps {
  onMenuToggle?: (isOpen: boolean) => void;
}
```

#### Example

```jsx
import Navbar from './components/Navbar';

<Navbar onMenuToggle={(isOpen) => console.log(isOpen)} />
```

#### Features

- Logo/branding
- Navigation links
- Mobile responsive menu
- Icon/menu toggle

---

### AppCards Component

Displays individual app information in card format.

#### Props

```typescript
interface AppCardsProps {
  app: {
    id: number;
    name: string;
    icon: string;
    rating: number;
    downloads: number;
    description: string;
  };
  onInstall?: (app: App) => void;
  onDetails?: (appId: number) => void;
  isInstalled?: boolean;
}
```

#### Example

```jsx
import AppCards from './components/AppCards';

<AppCards 
  app={appData}
  onInstall={(app) => handleInstall(app)}
  onDetails={(id) => navigate(`/apps/${id}`)}
  isInstalled={isAppInstalled(appData.id)}
/>
```

#### Events

- `onInstall` - Fired when install button clicked
- `onDetails` - Fired when app card clicked

---

### Banner Component

Hero banner section displayed at top of pages.

#### Props

```typescript
interface BannerProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  onCTA?: () => void;
}
```

#### Example

```jsx
<Banner 
  title="Welcome to HeroIO"
  subtitle="Discover amazing apps"
  ctaText="Browse Apps"
  onCTA={() => navigate('/apps')}
/>
```

---

### StatsSection Component

Displays statistics about the app store.

#### Props

```typescript
interface StatsSectionProps {
  totalApps?: number;
  totalDownloads?: number;
  totalUsers?: number;
  loading?: boolean;
}
```

#### Example

```jsx
<StatsSection 
  totalApps={1000}
  totalDownloads={500000}
  totalUsers={50000}
  loading={false}
/>
```

---

### StateCards Component

Individual statistic card display.

#### Props

```typescript
interface StateCardsProps {
  icon: ReactNode;
  label: string;
  value: number | string;
  suffix?: string;
}
```

#### Example

```jsx
import { FiDownload } from 'react-icons/fi';

<StateCards 
  icon={<FiDownload />}
  label="Total Downloads"
  value={500000}
  suffix="+"
/>
```

---

### Footer Component

Application footer with links and information.

#### Props

```typescript
interface FooterProps {
  companyName?: string;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
}

interface FooterLink {
  label: string;
  url: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon?: ReactNode;
}
```

#### Example

```jsx
<Footer 
  companyName="HeroIO"
  links={[
    { label: 'About', url: '/about' },
    { label: 'Contact', url: '/contact' }
  ]}
/>
```

---

### TopApps Component

Displays list of top/popular applications.

#### Props

```typescript
interface TopAppsProps {
  apps: App[];
  limit?: number;
  onAppClick?: (appId: number) => void;
  loading?: boolean;
}
```

#### Example

```jsx
<TopApps 
  apps={topAppsData}
  limit={10}
  onAppClick={(id) => navigate(`/apps/${id}`)}
  loading={false}
/>
```

---

## Utility Functions

### Format Download Count

```javascript
function formatDownloads(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}
```

**Example:**
```javascript
formatDownloads(1500000); // "1.5M"
formatDownloads(5000);    // "5K"
```

---

### Format Rating

```javascript
function formatRating(rating: number): string {
  return rating.toFixed(1);
}
```

**Example:**
```javascript
formatRating(4.567); // "4.6"
```

---

### Get App Category Color

```javascript
function getCategoryColor(category: string): string {
  const colors = {
    'Productivity': 'bg-blue-500',
    'Gaming': 'bg-purple-500',
    'Social': 'bg-pink-500',
    'Utility': 'bg-green-500',
    'Education': 'bg-yellow-500'
  };
  return colors[category] || 'bg-gray-500';
}
```

**Example:**
```javascript
getCategoryColor('Gaming'); // "bg-purple-500"
```

---

## Hooks

### useInstalledApps

Custom hook for managing installed apps.

```javascript
function useInstalledApps() {
  const [apps, setApps] = useState(() => getInstalledApps());
  
  const installApp = (app) => {
    const updated = [...apps, app];
    setApps(updated);
    saveInstalledApps(updated);
  };
  
  const uninstallApp = (appId) => {
    const updated = apps.filter(a => a.id !== appId);
    setApps(updated);
    saveInstalledApps(updated);
  };
  
  return { apps, installApp, uninstallApp };
}
```

**Example:**
```javascript
const { apps, installApp, uninstallApp } = useInstalledApps();

installApp(newApp);
uninstallApp(appId);
```

---

### useAppSort

Custom hook for sorting apps.

```javascript
function useAppSort(apps, defaultSort = 'high-to-low') {
  const [sortType, setSortType] = useState(defaultSort);
  
  const sortedApps = useMemo(() => {
    return getSortedApps(apps, sortType);
  }, [apps, sortType]);
  
  return { sortedApps, sortType, setSortType };
}
```

**Example:**
```javascript
const { sortedApps, sortType, setSortType } = useAppSort(apps);

setSortType('low-to-high');
```

---

## Constants

### Storage Keys

```javascript
export const STORAGE_KEYS = {
  INSTALLED_APPS: 'heroio_installed_apps',
  USER_PREFERENCES: 'heroio_user_prefs',
  RECENT_SEARCHES: 'heroio_recent_searches'
};
```

---

### Sort Types

```javascript
export const SORT_TYPES = {
  HIGH_TO_LOW: 'high-to-low',
  LOW_TO_HIGH: 'low-to-high',
  ALPHABETICAL: 'alphabetical',
  RATING: 'rating',
  NEWEST: 'newest'
};
```

---

### API Endpoints (if backend added)

```javascript
export const API_ENDPOINTS = {
  APPS: '/api/apps',
  APP_DETAILS: '/api/apps/:id',
  REVIEWS: '/api/apps/:id/reviews',
  SEARCH: '/api/search',
  STATS: '/api/stats'
};
```

---

### Toast Messages

```javascript
export const TOAST_MESSAGES = {
  APP_INSTALLED: 'App installed successfully!',
  APP_UNINSTALLED: 'App uninstalled successfully!',
  INSTALLATION_FAILED: 'Installation failed. Please try again.',
  APP_ALREADY_INSTALLED: 'This app is already installed.'
};
```

---

## Error Handling

### Common Errors

```typescript
class AppError extends Error {
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

// Usage
throw new AppError('App not found', 'APP_NOT_FOUND');
```

---

## Best Practices

1. **Always validate** app objects before installation
2. **Check localStorage** availability before use
3. **Handle errors** gracefully with user feedback
4. **Use hooks** for state management
5. **Memoize** expensive computations
6. **Keep components** small and focused

---

## Examples

### Full Installation Flow

```javascript
import { toast } from 'react-toastify';

async function handleInstallApp(app) {
  try {
    // Validate app
    if (!app.id || !app.name) {
      throw new Error('Invalid app data');
    }
    
    // Check if already installed
    if (isAppInstalled(app.id)) {
      toast.warning('App already installed');
      return false;
    }
    
    // Install app
    installApp(app);
    toast.success('App installed successfully!');
    return true;
  } catch (error) {
    toast.error('Installation failed: ' + error.message);
    return false;
  }
}
```

---

## Support

For questions about the API, please refer to:
- Full [DOCUMENTATION.md](./DOCUMENTATION.md)
- [Contributing Guide](./CONTRIBUTING.md)
- GitHub Issues

