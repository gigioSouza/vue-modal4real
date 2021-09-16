import { createApp } from 'vue'
import App from './App.vue'
import Modal from './../../src/main';

createApp(App)
  .use(Modal)
  .mount('#app');
