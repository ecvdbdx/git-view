import { createApp } from 'vue';

import Button from '@/components/Button.vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.component('Button', Button);
app.use(router);
app.mount('#app');
