import { createApp } from 'vue'
import App from './App.vue'
import { ModalsPlugin } from '../../lib';

createApp(App)
  .use(ModalsPlugin)
  .mount('#app');
