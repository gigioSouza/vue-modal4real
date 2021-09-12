import { createApp } from 'vue'
import App from './App.vue'
import Modal from './../lib/main';

createApp(App)
  .use(Modal)
  .mount('#app');
