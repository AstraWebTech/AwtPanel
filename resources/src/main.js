import { createApp } from 'vue';
import './style.css';
import i18n from './i18n';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

i18n.global.locale.value = localStorage.getItem('lang') || 'en';

const pinia = createPinia();
const app = createApp(App);

app
    .use(i18n)
    .use(pinia)
    .use(router)
    .mount('#app')

