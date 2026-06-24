// Service worker intentionally disabled until a real /sw.js file is added.
// This avoids production 404/noisy registration failures and prevents stale cached assets.
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations?.().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    }).catch(() => {
      // Ignore cleanup failures; the app should continue normally.
    });
  }
};