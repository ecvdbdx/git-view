import { createApp } from 'vue';

import DsButton from '@/components/DsButton.vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.component('DsButton', DsButton);
app.use(router);
app.mount('#app');
