/**
 * Debug bypass utilities for development
 * Enable in browser console: localStorage.setItem('bypassOnboarding', 'true')
 * Disable: localStorage.removeItem('bypassOnboarding')
 */

export const isOnboardingBypassEnabled = (): boolean => {
  // Only allow bypass in development mode
  if (!import.meta.env.DEV) {
    return false;
  }
  
  return localStorage.getItem('bypassOnboarding') === 'true';
};

// Console helpers for development
export const enableDevBypass = () => {
  localStorage.setItem('bypassOnboarding', 'true');
  console.log('✅ Onboarding bypass enabled. Refresh the page.');
};

export const disableDevBypass = () => {
  localStorage.removeItem('bypassOnboarding');
  console.log('❌ Onboarding bypass disabled. Refresh the page.');
};

// Expose to window for easy console access in dev
if (import.meta.env.DEV && typeof window !== 'undefined') {
  (window as any).enableDevBypass = enableDevBypass;
  (window as any).disableDevBypass = disableDevBypass;
}
