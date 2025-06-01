<script setup>
import { onMounted } from 'vue';
import { useAdminStore } from '../stores/useAdminStore';
import UserTable from '../components/UserTable.vue';

const adminStore = useAdminStore();

onMounted(() => {
  adminStore.fetchUsers();
});
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">👤 Управление пользователями</h2>
    <UserTable :users="adminStore.users" />
  </div>
</template>
