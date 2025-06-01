import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        apiKey: '',          // <--- добавьте сюда
        token: localStorage.getItem('authToken') || '',
        loading: false,
        error: '',
    }),
    actions: {
        async login(email, password) {
            this.loading = true;
            try {
                const response = await axios.post('http://localhost:3000/api/user/login', { email, password });
                const token = response.data.token;
                this.token = token;
                localStorage.setItem('authToken', token);
                await this.fetchUserProfile();
            } catch (err) {
                this.error = err.response?.data?.message || 'Ошибка входа';
            } finally {
                this.loading = false;
            }
        },
        async fetchUserProfile() {
            if (!this.token) return;
            this.loading = true;
            try {
                const response = await axios.get('http://localhost:3000/api/user/profile', {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                this.user = response.data;
            } catch (err) {
                this.error = err.response?.data?.message || 'Ошибка загрузки профиля';
            } finally {
                this.loading = false;
            }
        },
        logout() {
            this.user = null;
            this.token = '';
            localStorage.removeItem('authToken');
        },
    },
});
