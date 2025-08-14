
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bridgeforcouples.app',
  appName: 'Bridge For Couples',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#f5f0f0", // Background color matching your image
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#8B4B8C',
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
