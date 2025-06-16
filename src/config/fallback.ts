
import { productionUtils } from '@/utils/productionUtils';

// Enhanced fallback error display
export const createFallbackErrorDisplay = (rootElement: HTMLElement) => {
  rootElement.innerHTML = `
    <div style="
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      font-family: system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 20px;
    ">
      <div style="
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 40px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        max-width: 500px;
        width: 100%;
      ">
        <h1 style="color: #ff6b6b; margin-bottom: 16px; font-size: 2em;">Application Failed to Load</h1>
        <p style="margin-bottom: 24px; opacity: 0.9; line-height: 1.6;">
          We're sorry, but the Paluguntipalli Village Community App could not be loaded. 
          Please try refreshing the page or contact support if the problem persists.
        </p>
        <button 
          onclick="window.location.reload()" 
          style="
            background: #4ecdc4; 
            color: white; 
            border: none; 
            padding: 14px 28px; 
            border-radius: 8px; 
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-right: 12px;
          "
          onmouseover="this.style.background='#45b7aa'"
          onmouseout="this.style.background='#4ecdc4'"
        >
          Reload Application
        </button>
        <button 
          onclick="window.location.href='mailto:support@paluguntipalli.com'" 
          style="
            background: transparent; 
            color: white; 
            border: 2px solid white; 
            padding: 12px 26px; 
            border-radius: 8px; 
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
          "
          onmouseover="this.style.background='rgba(255,255,255,0.1)'"
          onmouseout="this.style.background='transparent'"
        >
          Contact Support
        </button>
        <p style="margin-top: 24px; font-size: 12px; opacity: 0.7;">
          Error ID: ${Date.now().toString(36)}<br>
          Time: ${new Date().toLocaleString()}
        </p>
      </div>
    </div>
  `;
};
