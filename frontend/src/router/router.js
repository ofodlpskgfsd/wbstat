import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/WelcomePage.vue';
import About from '../components/About.vue';
import Register from '../views/Register.vue';
import Login from "../views/Login.vue";
import HomePage from '../views/HomePage.vue';
import Profile from '../views/ProfilePage.vue';
import AdditionalTools from '../components/AdditionalTools.vue';
import security from "../components/functional/security.vue";
import card from '../components/card.vue';
import pricing_plan from '../components/pricing_plan.vue';

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
    {
        path: '/security',
        component: security,
    },
    {
        path: '/card',
        component: card,
    },
    {
        path: '/pricing_plan',
        name: 'pricing_plan',
        component: pricing_plan,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (!localStorage.getItem('authToken')) {
            next({ path: '/login' });
        } else {
            next();
        }
    } else {
        next();
    }
});


export default router;
