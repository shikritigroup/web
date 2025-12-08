import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import en from './../locales/en/translation.json';
import be from './../locales/be/translation.json';

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        lng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: { translation: en },
            be: { translation: be },
        }
    });

export default i18n;
