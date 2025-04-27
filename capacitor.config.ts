import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.dreamwhisper',
  appName: 'dream-whisper-chat-journal',
  webDir: 'dist',
 
  ios: {
    contentInset: 'always'
  },
  android: {
    backgroundColor: '#121212'
  }
};

export default config;
