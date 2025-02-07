<template>
  <Header/>
  <div class="login-container">
    <div class="login-form">
      <h2 class="up_text">Авторизация</h2>
      <form @submit.prevent="login">
        <input
            type="email"
            v-model="email"
            placeholder="Email"
            :class="{'input-error': emailError}"
            required
        />
        <input
            type="password"
            v-model="password"
            placeholder="Пароль"
            :class="{'input-error': passwordError}"
            required
        />
        <div v-if="serverError" class="error-message">
          {{ serverError }}
        </div>
        <div class="btn">
          <button type="submit" class="button">Вход</button>
        </div>
      </form>
      <div class="support">
        <a class="support_text">
          <router-link to="/register">Еще не зарегистированы?</router-link>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import axios from 'axios';

export default {
  components: {Header},
  data() {
    return {
      email: '',
      password: '',
      serverError: '',
      emailError: false, // Для отслеживания ошибки с email
      passwordError: false, // Для отслеживания ошибки с паролем
    };
  },
  methods: {
    async login() {
      // Сначала очищаем старые ошибки
      this.serverError = '';
      this.emailError = false;
      this.passwordError = false;

      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: this.email,
          password: this.password,
        });

        if (response.data.token) {
          // Сохранение токена и перенаправление на страницу /home
          localStorage.setItem('authToken', response.data.token);
          this.$router.push('/home');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.serverError = error.response.data.message;

          // Определяем, какая ошибка произошла и подсвечиваем соответствующие поля
          if (this.serverError.includes('Пользователь не найден')) {
            this.emailError = true;
          } else if (this.serverError.includes('Неверный пароль')) {
            this.passwordError = true;
          }
        } else {
          this.serverError = 'Что-то пошло не так. Попробуйте снова.';
        }
      }
    },
  },
};
</script>


<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #242836;
}

.login-form {
  background: linear-gradient(135deg, rgba(91, 218, 72, 0.2), rgba(48, 121, 255, 0.2));
  padding: 50px;
  border-radius: 36px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
}

h2 {
  text-align: center;
  color: #fff;
}

input {
  color: #fff;
  outline: none;
  font-size: 16px;
  width: 95%;
  padding: 13px;
  margin: 10px 0;
  border: 1px solid #242836;
  border-radius: 16px;
  background: #242836;
}

input.input-error {
  border: 1px solid red ; /* Красная рамка для ошибки */
}

button {
  width: 50%;
  padding: 10px;
  border-radius: 20px;
  background: transparent;
  color: white;
  border: 1px solid white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn {
  padding: 16px;
  display: flex;
  justify-content: center;
}

.support_text a {
  color: rgb(255, 255, 255, 50%);
}

.up_text {
  padding-bottom: 5%;
  font-size: 24px;
  font-weight: normal;
  color: rgb(255, 255, 255, 50%);
}

.support {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.button:hover {
  transition: all 0.3s ease;
  box-shadow: 0 0 10px 0 rgb(255, 255, 255);
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>