
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bfc.bridge',
  appName: 'Bridge For Couples',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#f5f0f0",
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#8B4B8C',
      splashFullScreen: true,
      splashImmersive: true,
      androidSplashResourceName: 'splash',
      // Use your uploaded image directly
      splashImageSrc: '/lovable-uploads/d1b97295-f2af-4ad6-aa8d-78361478bd23.png'
    },
    StatusBar: {
       style: 'light',
       backgroundColor: '#faf8f3',
       overlaysWebView: false,
     },
    Keyboard: {
      resize: 'body',
      style: 'dark'
    }
  },
  ios: {
    contentInset: 'always',
    backgroundColor: '#faf8f3'
  },
  android: {
    backgroundColor: '#faf8f3'
  }
};

export default config;
