<template>
  <Header />
  <div class="registration-container">
    <div class="registration-form" ref="formContainer">
      <h2 class="up_text">Регистрация</h2>
      <form @submit.prevent="register" v-auto-animate>
        <input type="text" v-model="form.name" @blur="validateField('name')" placeholder="Имя" required />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>

        <input type="email" v-model="form.email" @blur="validateField('email')" placeholder="Email" required />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
        <span v-if="serverErrorEmail" class="error">{{ serverErrorEmail }}</span>

        <input type="text" v-model="form.apiKey" @blur="validateField('apiKey')" placeholder="API-ключ WB" required />
        <span v-if="errors.apiKey" class="error">{{ errors.apiKey }}</span>

        <input type="tel" v-model="form.phone" v-mask="'+7##########'" @blur="validateField('phone')" placeholder="Номер телефона" required />
        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>

        <input type="password" v-model="form.password" id="password" @blur="validateField('password')" placeholder="Создайте пароль" required />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>

        <input type="password" id="confirmPassword" v-model="form.confirmPassword" @blur="validateField('confirmPassword')" placeholder="Подтвердите пароль" required />
        <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>

        <div class="btn">
          <button type="submit">Зарегистрироваться</button>
        </div>

        <div class="support">
          <a href="https://t.me/vladlubich" class="support_text">Техническая поддержка</a>
        </div>
      </form>

      <transition name="fade">
        <div v-if="welcomeMessage" class="welcome-message">
          <p>🚀 Добро пожаловать, <span class="highlight">{{ form.name }}</span>!</p>
          <p>Готовы к новым возможностям? 😉</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { vAutoAnimate } from '@formkit/auto-animate';
import axios from 'axios';
import Header from '../components/layout/Header.vue';
import { gsap } from 'gsap';

export default {
  components: { Header },
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        apiKey: ''
      },
      errors: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        apiKey: ''
      },
      serverErrorEmail: '',
      welcomeMessage: '',
    };
  },
  mounted() {
    gsap.fromTo(
        this.$refs.formContainer,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  },
  methods: {
    validateField(field) {
      if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = 'Введите корректный email';
      } else if (field === 'phone' && !/^\+?\d{10,15}$/.test(this.form.phone)) {
        this.errors.phone = 'Введите корректный номер телефона';
      } else if (field === 'password') {
        const strengthError = this.checkPasswordStrength(this.form.password);
        this.errors.password = strengthError || '';
      } else if (field === 'confirmPassword' && this.form.confirmPassword !== this.form.password) {
        this.errors.confirmPassword = 'Пароли не совпадают!';
      } else if (field === 'apiKey' && this.form.apiKey.trim().length < 10) {
        this.errors.apiKey = 'Введите корректный API-ключ';
      } else if (!this.form[field]) {
        this.errors[field] = 'Заполните поле';
      } else {
        this.errors[field] = '';
      }
    },

    checkPasswordStrength(password) {
      if (password.length < 8) return 'Пароль должен быть не менее 8 символов';
      if (!/[A-Z]/.test(password)) return 'Пароль должен содержать хотя бы одну заглавную букву';
      if (!/[a-z]/.test(password)) return 'Пароль должен содержать хотя бы одну строчную букву';
      if (!/[0-9]/.test(password)) return 'Пароль должен содержать хотя бы одну цифру';
      if (!/[\W_]/.test(password)) return 'Пароль должен содержать хотя бы один специальный символ';
      return '';
    },

    async register() {
      ['name', 'email', 'phone', 'password', 'confirmPassword', 'apiKey'].forEach(this.validateField);

      if (Object.values(this.errors).some(error => error !== '')) return;

      try {
        const response = await axios.post('http://localhost:3000/api/registration', {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          password: this.form.password,
          confirmPassword: this.form.confirmPassword,
          apiKey: this.form.apiKey
        });

        if (response.data.token) {
          this.serverErrorEmail = '';
          this.welcomeMessage = true;

          setTimeout(() => {
            this.welcomeMessage = false;
            this.$router.push('/login');
          }, 3000);
        }
      } catch (error) {
        if (error.response && error.response.data?.message === 'Пользователь с таким email уже существует') {
          this.serverErrorEmail = error.response.data.message;
        } else {
          this.serverErrorEmail = 'Ошибка на сервере, попробуйте позже.';
        }
      }
    }
  }
};
</script>

<style scoped>
/* ...оставим стиль как был */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.welcome-message {
  background: rgba(34, 193, 195, 0.2);
  color: #fff;
  padding: 15px;
  margin-top: 20px;
  text-align: center;
  font-size: 1.2em;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  animation: slide-in 0.5s ease-out;
}

@keyframes slide-in {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.highlight {
  font-weight: bold;
  color: #1abc9c;
}

.registration-container {
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #242836;
}

.registration-form {
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

.error {
  color: rgb(255, 36, 36, 70%);
  font-size: 13px;
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
}

.support {
  display: flex;
  justify-content: center;
}

.support_text {
  color: rgb(255, 255, 255, 50%);
}

.btn {
  padding: 16px;
  display: flex;
  justify-content: center;
}

.up_text {
  padding-bottom: 5%;
  font-size: 24px;
  font-weight: normal;
  color: rgb(255,255,255,50%);
}
</style>
