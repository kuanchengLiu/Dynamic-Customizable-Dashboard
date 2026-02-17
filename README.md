# Dynamic Customizable Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
</p>

A highly flexible, cyberpunk-themed React dashboard with drag-and-drop interface. Users can freely define widget shapes, sizes, and configure multiple data sources with support for both RESTful APIs and GraphQL.

> 📖 [中文文檔](./README_ZH.md)

---

## ✨ Features

- 🎨 **Cyberpunk UI Theme** - Neon glows, animated gradients, and futuristic design
- 📐 **Drag & Drop Layout** - Freely resize and reposition widgets from all edges/corners
- 🔌 **Flexible Data Sources** - Support for REST API and GraphQL with global/local configuration
- 📊 **Multiple Visualizations** - Bar, Line, Donut, Radar, Gauge, Progress, Stats, Table, and JSON views
- 💾 **Persistent State** - Dashboard configuration saved to localStorage
- 🎯 **Demo Data Mode** - Built-in sample datasets for testing without API
- 📱 **Responsive Design** - Adapts to different screen sizes
- ⚡ **Smooth Animations** - Powered by Framer Motion and React Spring

---

## 🚀 Quick Start

![](./screenshot.png)

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Dyanmic_Customize_Dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

### Run Tests

```bash
npm run test
```

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 18 + TypeScript | Type safety and component-based architecture |
| **Build Tool** | Vite | Fast development and optimized builds |
| **Styling** | Tailwind CSS | Rapid styling with utility classes |
| **Grid Layout** | react-grid-layout | Drag, resize, and grid management |
| **State Management** | Zustand | Lightweight state with persistence |
| **Data Fetching** | TanStack Query | API caching, loading states, refetching |
| **Forms** | React Hook Form | Form handling and validation |
| **Charts** | Recharts | Data visualization components |
| **Animations** | Framer Motion + React Spring | Smooth UI animations |
| **Icons** | Lucide React | Modern icon library |
| **Testing** | Vitest + Testing Library | Unit and component testing |

---

## 📊 Visualization Types

| Type | Description |
| :--- | :--- |
| **Bar Chart** | Vertical bar visualization with gradient fills |
| **Line Chart** | Area/line chart with glow effects |
| **Donut Chart** | Circular chart with animated segments |
| **Radar Chart** | Multi-axis radar visualization |
| **Gauge** | Circular gauge with animated value |
| **Progress** | Progress bars with scanner effect |
| **Stats** | Responsive grid of stat cards with rolling numbers |
| **Table** | Cyberpunk-styled data table |
| **JSON** | Raw JSON viewer with syntax highlighting |

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── charts/           # Cyberpunk chart components
│   │   ├── CyberBarChart.tsx
│   │   ├── CyberLineChart.tsx
│   │   ├── CyberDonutChart.tsx
│   │   ├── CyberRadarChart.tsx
│   │   ├── CyberGaugeChart.tsx
│   │   ├── CyberProgressBar.tsx
│   │   └── CyberStatCard.tsx
│   ├── grid/             # Grid layout container
│   ├── layout/           # Dashboard layout & toolbar
│   ├── visualization/    # View layer components
│   └── widget/           # Widget wrapper & configuration
├── data/                 # Demo data definitions
├── hooks/                # Custom React hooks
├── store/                # Zustand store
├── types/                # TypeScript type definitions
└── App.tsx               # Main application component
```

---

## 📋 Core Data Models

### API Configuration

```typescript
interface ApiConfig {
  endpoint: string;
  type: 'REST' | 'GRAPHQL';
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  body?: string;
  variables?: string;
  useDefaultData?: boolean;
  defaultDataKey?: string;
}
```

### Widget Configuration

```typescript
interface Widget {
  id: string;
  title: string;
  layout: {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  useGlobalEndpoint: boolean;
  localApiConfig?: ApiConfig;
  viewType: 'JSON' | 'Table' | 'Chart' | 'BarChart' | 'LineChart' | 
            'DonutChart' | 'RadarChart' | 'Gauge' | 'Progress' | 'Stats';
  dataKey?: string;
}
```

---

## 🎮 User Guide

### 1. Enable Edit Mode
Click the **"Edit Mode"** toggle in the toolbar to enable widget manipulation.

### 2. Add Widget
Click **"+ Add Widget"** to create a new widget on the dashboard.

### 3. Resize Widget
Hover over any edge or corner of a widget to see resize handles. Drag to resize.

### 4. Move Widget
Drag the widget header to reposition it on the grid.

### 5. Configure Widget
Click the **gear icon** on a widget to open the configuration modal:
- Set widget title
- Choose global or local data source
- Configure API endpoint (REST/GraphQL)
- Select visualization type

### 6. Global API Configuration
Click **"Global API"** in the toolbar to set default API configuration for all widgets.

### 7. Use Demo Data
In the Global API configuration, enable **"Use Demo Data"** to test visualizations without a real API.

---

## 🎨 Demo Datasets

| Dataset | Description | Best Visualization |
| :--- | :--- | :--- |
| Sales Data | Monthly sales figures | Bar Chart, Line Chart |
| Traffic Data | Website visitor metrics | Line Chart, Stats |
| Category Distribution | Category percentages | Donut Chart |
| Skills Radar | Skill proficiency levels | Radar Chart |
| Project Progress | Project completion status | Progress Bars |
| System Metrics | System performance data | Gauge, Stats |
| Live Metrics | Real-time style metrics | Stats Grid |
| Users | User profile data | Table |
| Metrics | Key performance indicators | Stats, JSON |

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file for custom configuration:

```env
VITE_API_BASE_URL=https://api.example.com
```

### Tailwind Theme

The cyberpunk color palette is defined in `tailwind.config.js`:

```javascript
colors: {
  'cyber-cyan': '#00f5ff',
  'cyber-pink': '#ff006e',
  'cyber-purple': '#9d4edd',
  'cyber-green': '#00ff9f',
  'cyber-yellow': '#ffd60a',
  'cyber-dark': '#0a0a0f',
}
```

---

## 📝 License

MIT License

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
