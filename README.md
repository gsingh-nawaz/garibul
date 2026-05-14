# Garibul Singh | AI & Automation Portfolio

A premium, immersive 3D portfolio showcasing autonomous systems, neural architectures, and intelligent workflow automation. This project features a dark industrial aesthetic, cinematic animations, and interactive 3D visualizations.

## Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **3D Engine**: [Three.js](https://threejs.org/) with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Drei](https://github.com/pmndrs/drei)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/gsap/) (ScrollTrigger)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Scrolling**: [Lenis Scroll](https://github.com/darkroomengineering/lenis)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Backend**: [Express 5](https://expressjs.com/) with [Drizzle ORM](https://orm.drizzle.team/) & [PostgreSQL](https://www.postgresql.org/)

## Key Featured Projects

### AetherFlow
**Enterprise RAG Pipeline**
AI workflow orchestration engine — routes tasks across distributed agents with sub-millisecond handoff. Optimized for massive document intelligence and high-throughput processing.

### VisionGrid
**Real-time Industrial Computer Vision**
Real-time computer vision surveillance pipeline with edge-optimized inference and anomaly detection. Built for industrial-scale monitoring with 99% accuracy.

### SentinelOS
**Multi-agent B2B Framework**
Autonomous security monitoring system with kernel-level observability and zero false-positive tuning. A multi-agent framework designed for B2B workflow automation.

### Chronos Neural
**Temporal Prediction Framework**
Temporal prediction framework trained on financial and sensor time-series data at scale, handling TB/s scale data processing.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

To run the portfolio frontend:
```bash
pnpm --filter @workspace/portfolio run dev
```

To run the API server (requires `DATABASE_URL`):
```bash
pnpm --filter @workspace/api-server run dev
```

### Build

To build all packages for production:
```bash
pnpm run build
```

## Architecture

- **Neural Lattice Hero**: Immersive Three.js background with dynamic interactions.
- **System Showcase**: GSAP-powered horizontal scrolling for project exploration.
- **Interactive Core**: Real-time 3D synapse of data and decisions.
- **Terminal Contact**: Low-level interface for direct system communication.

---
&copy; 2025 GARIBUL SINGH // ALL SYSTEMS NOMINAL
