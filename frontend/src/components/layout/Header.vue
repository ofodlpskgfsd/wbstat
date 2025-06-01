<template>
  <header class="container">
    <div class="logo">
      <router-link to="/"><img src="../../assets/logo.png" alt="Логотип" /></router-link>
    </div>

    <div class="burger" @click="toggleMenu">
      <span :class="{ 'active': menuOpen }"></span>
      <span :class="{ 'active': menuOpen }"></span>
      <span :class="{ 'active': menuOpen }"></span>
    </div>

    <div v-if="menuOpen" class="overlay" @click="toggleMenu"></div>

    <nav class="menu" :class="{ 'active': menuOpen }">
      <ul>
        <li><router-link to="/AdditionalTools" @click="closeMenu">Доп. инструменты</router-link></li>
        <li><router-link to="/AdditionalTools" @click="closeMenu">Контакты</router-link></li>
        <li><router-link to="/AdditionalTools" @click="closeMenu">О нас</router-link></li>
      </ul>
      <div class="auth-buttons">
        <router-link to="/login" class="button" @click="closeMenu">Войти</router-link>
        <router-link to="/register" class="button_reg" @click="closeMenu">Регистрация</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    }
  },
};
</script>

<style scoped>

.container {
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #242836;
  position: relative;
}

.logo img {
  height: 50px;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  z-index: 1001;
}

.burger span {
  width: 30px;
  height: 3px;
  background-color: white;
  transition: 0.3s;
}

.burger span.active:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.burger span.active:nth-child(2) {
  opacity: 0;
}
.burger span.active:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.menu {
  display: flex;
  align-items: center;
  gap: 30px;
}

.menu ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.menu a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  transition: 0.3s;
}

.menu a:hover {
  color: white;
}

/* Кнопки */
.auth-buttons {
  display: flex;
  gap: 10px;
}

.button, .button_reg {
  padding: 10px 15px;
  border-radius: 20px;
  text-decoration: none;
  transition: 0.3s;
}

.button {
  border: 1px solid #3079FF;
  color: white;
  background: transparent;
}
.button:hover {
  box-shadow: 0 0 10px 0 rgb(49, 116, 244);
}

.button_reg {
  border: 1px solid white;
  color: white;
  background: transparent;
}
.button_reg:hover {
  box-shadow: 0 0 10px 0 white;
}

/* Затемнение фона */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

@media (max-width: 768px) {
  .burger {
    display: flex;
  }

  .menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 250px;
    height: 100vh;
    background: #242836;
    flex-direction: column;
    align-items: flex-start;
    padding: 60px 20px;
    gap: 20px;
    transition: 0.3s;
    z-index: 1001;
  }

  .menu.active {
    right: 0;
  }

  .menu ul {
    flex-direction: column;
    gap: 15px;
  }

  .auth-buttons {
    flex-direction: column;
    width: 100%;
  }
}
</style>
