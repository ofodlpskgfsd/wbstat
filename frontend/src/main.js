import { createApp } from 'vue';
import App from './App.vue';
import router from '../src/router/router.js';
import '../src/style.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import VueTheMask from 'vue-the-mask';
import { createPinia } from 'pinia';
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import VueAwesomePaginate from 'vue-awesome-paginate';
import 'vue-awesome-paginate/dist/style.css';

const app = createApp(App);
app.use(router);
app.use(VueTheMask);
app.use(VueAwesomePaginate); //
app.use(FloatingVue)
app.use(createPinia());
app.use(autoAnimatePlugin);

app.mount('#app');