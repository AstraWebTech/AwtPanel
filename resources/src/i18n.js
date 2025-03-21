import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';
import ru from '@/locales/ru.json';
import hi from '@/locales/hi.json';

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {en, zh, ru, hi,},
});

export default i18n;