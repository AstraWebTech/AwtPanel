import { defineStore } from 'pinia';
import i18n from '@/i18n';
import authService from '@/services/authService';

export const useUserStore = defineStore('user', {
    state: () => ({
        id: '',
        name: '',
        language: 'en',
        token: null,
        theme: "theme-light",
    }),
    getters: {
        getUserName: (state) => state.name,
        getUserLanguage: (state) => state.language,
        getUserAppTheme: (state) => state.theme,
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        setUserName(name) {
            this.name = name;
            authService.putUser({id: this.id, login: this.name});
        },

        setUserLanguage(language) {
            this.language = language;
            localStorage.setItem('lang', language);
            authService.putUser({id: this.id, language: this.language});
        },

        setUserAppTheme(theme) {
            this.theme = theme;
            localStorage.setItem('theme', theme);
            authService.putUser({id: this.id, theme: this.theme});
        },

        async login(login, password) {
            try {
                const response = await authService.login(login, password);
                const userData = authService.getTokenData(response.token);
                if(!userData) this.logout();
                else {
                    this.id = userData.id;
                    this.name = userData.login;
                    this.token = response.token;
                    await authService.getUser(this.id).then(r => {
                        localStorage.setItem('token', response.token);
                        this.language = r.data.language;
                        this.theme = r.data.theme;
                    });
                }

            } catch (error) {
                throw error;
            }
        },

        async register(login, password) {
            try {
                const response = await authService.register(login, password);
                return response;
            } catch (error) {
                throw error;
            }
        },

        logout() {
            this.token = null;
            this.name = '';
            this.id = '';
            authService.logout();
        },

        initializeUser() {
            const savedLang = localStorage.getItem('lang') || 'en';
            const savedTheme = localStorage.getItem('theme') || 'theme-light';
            const savedToken = localStorage.getItem('token');

            this.language = savedLang;
            this.theme = savedTheme;

            if (savedToken) {
                this.token = savedToken;
                const userData = authService.getTokenData(savedToken);
                if(!userData) this.logout();
                else {
                    authService.getUser(userData.id).then(r => {
                        i18n.global.locale.value = r.data.language;
                        this.language = r.data.language;
                        this.theme = r.data.theme;
                        this.id = r.data.id;
                        this.name = r.data.login;
                    }).catch(error => {
                        console.error(error);
                        this.logout();
                    });
                }
            }
        },
    },
});