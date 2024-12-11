import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.weightmate.app',
  appName: 'Weight Mate',
  webDir: 'dist/weight-mate',
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-6458339069545467~8714282355',
      bannerAdId: 'ca-app-pub-6458339069545467/6448045816'
    }
  }
};

export default config;
