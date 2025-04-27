
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8ff8fbf05e8240a9bdc6568cd96962a8',
  appName: 'dream-whisper-chat-journal',
  webDir: 'dist',
  server: {
    url: 'https://8ff8fbf0-5e82-40a9-bdc6-568cd96962a8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    backgroundColor: '#121212'
  }
};

export default config;
