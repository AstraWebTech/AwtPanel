import { createWebHistory, createRouter } from 'vue-router';
import i18n from '@/i18n';
import { useUserStore } from '@/stores/useUserStore';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Функция для генерации пунктов меню с учетом группы
const generateMenuItems = (group = "main") => {
    return routes
        .filter(route => route.meta?.group && route.meta?.group.includes(group))
        .map(route => ({
            name: route.name,
            path: route.path,
            route: { name: route.name },
            title: i18n.global.t(route.meta.title) || route.name,
        }));
};

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const guestRequired = to.matched.some(record => record.meta.requiresGuest);
    const loggedIn = userStore.isAuthenticated;

    if (!guestRequired && !loggedIn) {
        return next({name: "Authorization"});
    }

    if (to?.meta?.title) {
        document.title = "AwtPanel | " + i18n.global.t(String(to.meta.title));
    } else {
        document.title = "AwtPanel";
    }

    next();
});

export default router;
export { routes, generateMenuItems };