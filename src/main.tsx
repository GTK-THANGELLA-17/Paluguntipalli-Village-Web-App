
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';

// Create a style element for transitions
const createGlobalStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .theme-transition {
      transition: background-color 1s ease, color 1s ease;
    }
    
    .theme-transition-overlay {
      position: fixed;
      pointer-events: none;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      opacity: 0;
      transition: opacity 1s ease;
    }
    
    .theme-transition-to-dark {
      background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);
      animation: fadeInOut 1s ease;
    }
    
    .theme-transition-to-light {
      background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%);
      animation: fadeInOut 1s ease;
    }
    
    @keyframes fadeInOut {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
};

// Apply global styles
createGlobalStyles();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
