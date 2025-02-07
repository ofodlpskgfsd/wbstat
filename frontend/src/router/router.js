import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/WelcomePage.vue';
import About from '../components/About.vue';
import Register from '../views/Register.vue';
import Login from "../views/Login.vue";
import HomePage from '../views/HomePage.vue';
import Profile from '../views/ProfilePage.vue';
import AdditionalTools from '../components/AdditionalTools.vue';

const routes = [
    {
        path: '/',
        component: Welcome },
    {
        path: '/about',
        component: About },
    {
        path: '/register',
        component: Register },
    {
        path: '/login',
        component: Login },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true },

    },
    {
        path: '/home',
        component: HomePage,
        meta: { requiresAuth: true },
    },
    {
        path: '/AdditionalTools',
        component: AdditionalTools,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// Глобальный навигационный охранник
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (!localStorage.getItem('authToken')) {
            next({ path: '/login' });  // Перенаправление на логин
        } else {
            next();  // Разрешаем доступ к маршруту
        }
    } else {
        next();  // Для всех остальных маршрутов доступ открыт
    }
});

export default router;
