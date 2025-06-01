<template>
  <Header />
  <div class="login-container">
    <div class="login-form" ref="loginForm">
      <h2 class="up_text" ref="heading">Авторизация</h2>
      <form @submit.prevent="login">
        <div class="input-container" ref="emailContainer">
          <input
              type="email"
              v-model="email"
              placeholder="Email"
              :class="{'input-error': emailError, 'input-focused': isFocusedEmail}"
              required
              @focus="isFocusedEmail = true"
              @blur="isFocusedEmail = false"
              ref="emailInput"
          />
        </div>
        <div class="input-container" ref="passwordContainer">
          <input
              type="password"
              v-model="password"
              placeholder="Пароль"
              :class="{'input-error': passwordError, 'input-focused': isFocusedPassword}"
              required
              @focus="isFocusedPassword = true"
              @blur="isFocusedPassword = false"
              ref="passwordInput"
          />
        </div>
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
import Header from "../components/layout/Header.vue";
import axios from 'axios';
import { gsap } from "gsap";

export default {
  components: { Header },
  data() {
    return {
      email: '',
      password: '',
      serverError: '',
      emailError: false,
      passwordError: false,
      isFocusedEmail: false, // Состояние фокуса для email
      isFocusedPassword: false, // Состояние фокуса для пароля
    };
  },
  methods: {
    async login() {
      this.serverError = '';
      this.emailError = false;
      this.passwordError = false;

      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: this.email,
          password: this.password
        });


        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          this.$router.push('/home');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.serverError = error.response.data.message;

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

    animateForm() {
      gsap.fromTo(this.$refs.loginForm, {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    },

    animateInputFocus() {
      gsap.to([this.$refs.emailInput, this.$refs.passwordInput], {
        scale: 1.05,
        duration: 0.3,
        ease: "power1.inOut",
      });
    },

    animateInputBlur() {
      gsap.to([this.$refs.emailInput, this.$refs.passwordInput], {
        scale: 1,
        duration: 0.3,
        ease: "power1.inOut",
      });
    },

    animateErrorMessage() {
      if (this.serverError) {
        gsap.fromTo(".error-message", {
          opacity: 0,
          y: -20,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  },

  watch: {
    serverError(newVal) {
      if (newVal) {
        this.animateErrorMessage();
      }
    },
  },

  mounted() {
    this.animateForm();
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

.input-container {
  position: relative;
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
  transition: background-color 0.3s ease;
}

input.input-error {
  border: 1px solid red;
}

input.input-focused {
  background-color: rgba(36, 40, 54, 0.68);
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

@media (max-width: 768px) {
  .login-form {
    width: 90%;
    padding: 30px;
  }
}

@media (max-width: 480px) {
  .login-form {
    width: 100%;
    padding: 20px;
  }
}
</style>
