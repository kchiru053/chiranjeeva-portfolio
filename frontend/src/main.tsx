import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import { loadRemotePortfolio } from './data/remote';
import './index.css';

// Fetch the portfolio from the Spring Boot API first (falls back to the bundled data),
// then load the app so every component renders with the final content.
loadRemotePortfolio().then(async () => {
  const { default: App } = await import('./App');
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </StrictMode>,
  );
});
