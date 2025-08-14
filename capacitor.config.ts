
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bridgeforcouples.app',
  appName: 'Bridge For Couples',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#faf8f3", // Soft cream background to match your brand
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#8B4B8C', // Primary brand color
      splashFullScreen: true,
      splashImmersive: true,
      androidSplashResourceName: 'splash'
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#faf8f3'
    },
    Keyboard: {
      resize: 'body',
      style: 'dark'
    }
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#faf8f3'
  },
  android: {
    backgroundColor: '#faf8f3'
  }
};

export default config;
