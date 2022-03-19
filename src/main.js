import 'highlight.js/styles/default.css';

import { createApp } from 'vue';
import VueHighlightJS from 'vue3-highlightjs';

import DsButton from '@/components/DsButton.vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.component('DsButton', DsButton);
app.use(router);
app.use(VueHighlightJS);
app.mount('#app');
