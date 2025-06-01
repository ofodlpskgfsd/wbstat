import { defineStore } from 'pinia';
import axios from 'axios';
const token = localStorage.getItem("authToken");

export const useAdminStore = defineStore('admin', {
    state: () => ({
        users: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchUsers() {
            this.loading = true;
            try {
                const token = localStorage.getItem("authToken");
                const res = await axios.get("http://localhost:3000/api/admin/users", {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                });
                this.users = res.data;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        async banUser(userId) {
            await axios.patch(
                `http://localhost:3000/api/admin/users/${userId}/ban`,
                null,
                { headers: { Authorization: `Bearer ${token}` } }
            );
        },
        async updateApiKey(userId, apiKey) {
            await axios.patch(`http://localhost:3000/api/admin/users/${userId}/api-key`, { apiKey });
            this.fetchUsers();
        },
    }
});
