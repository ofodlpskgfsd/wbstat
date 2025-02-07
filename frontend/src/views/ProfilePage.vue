<template>
  <div v-if="user">
    <h2>Личный кабинет</h2>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Имя:</strong> {{ user.name }}</p>
    <p><strong>Телефон:</strong> {{ user.phone }}</p>
    <button @click="logout">Выйти</button>
  </div>
  <div v-else>
    <p>Загрузка данных...</p>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore';

export default {
  computed: {
    user() {
      const userStore = useUserStore();
      return userStore.user;  // Данные о пользователе из store
    },
  },
  methods: {
    logout() {
      const userStore = useUserStore();
      userStore.logout(); // Очищаем данные о пользователе и токен
      this.$router.push('/login'); // Перенаправляем на страницу входа
    },
  },
};
</script>


<style scoped>
.profile {
  padding: 20px;
  background-color: #242836;
  color: white;
  border-radius: 8px;
}

.user-info {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #00FF6F;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

button:hover {
  background-color: #28a745;
}

.loading {
  color: white;
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}
</style>
