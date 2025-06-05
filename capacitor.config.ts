
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9e839e17444f4137a4db791ae71d33a9',
  appName: 'Bridge For Couples',
  webDir: 'dist',
  server: {
    url: "https://9e839e17-444f-4137-a4db-791ae71d33a9.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#2e4059",
      showSpinner: false
    }
  },
  ios: {
    contentInset: 'automatic'
  }
};

export default config;
