
const REDIRECT_KEY = 'onboarding_redirect';

export const setPostOnboardingRedirect = (path: string) => {
  sessionStorage.setItem(REDIRECT_KEY, path);
};

export const getPostOnboardingRedirect = (): string | null => {
  return sessionStorage.getItem(REDIRECT_KEY);
};

export const clearPostOnboardingRedirect = () => {
  sessionStorage.removeItem(REDIRECT_KEY);
};
