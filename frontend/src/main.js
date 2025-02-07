import { createApp } from 'vue';
import App from './App.vue';
import router from '../src/router/router.js';
import '../src/style.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import VueTheMask from 'vue-the-mask';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(router);
app.mount('#app');
app.use(VueTheMask);
app.use(createPinia());
app.use(autoAnimatePlugin);