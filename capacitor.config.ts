
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9e839e17444f4137a4db791ae71d33a9',
  appName: 'Bridge For Couples',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#2e4059",
      showSpinner: false
    },
    InAppPurchases: {
      autoFinishTransactions: false
    }
  },
  ios: {
    contentInset: 'automatic'
  }
};

export default config;
