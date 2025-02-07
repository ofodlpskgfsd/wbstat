<template>
    <header class="header">
      <div class="logo">
        <i class="fas fa-chart-pie"></i>
        <span>Аналитика</span>
      </div>
      <div class="profile">
        <router-link to="/profile" class="profile-img-wrapper">
          <img
              :src="user.profilePic || defaultProfilePic"
              alt="Profile"
              class="profile-img"
          />
        </router-link>
        <div class="profile-actions">
          <button @click="logout" class="btn-logout">Выйти</button>
        </div>
      </div>
    </header>

    <div class="main-content">
      <div class="sidebar">
        <div class="menu">

          <div class="menu-item" @mouseenter="showLabel('home')" @mouseleave="hideLabel('home')">
            <router-link to="/home" class="menu-link">
            <i class="fas fa-home"></i>
            </router-link>
            <span class="menu-label" :class="{'show': activeMenu === 'home'}">Главная</span>
          </div>

          <div class="menu-item" @mouseenter="showLabel('overview')" @mouseleave="hideLabel('overview')">
            <i class="fas fa-tachometer-alt"></i>
            <span class="menu-label" :class="{'show': activeMenu === 'overview'}">Обзор</span>
          </div>
          <div class="menu-item" @mouseenter="showLabel('graphs')" @mouseleave="hideLabel('graphs')">
            <i class="fas fa-chart-line"></i>
            <span class="menu-label" :class="{'show': activeMenu === 'graphs'}">Графики</span>
          </div>
          <div class="menu-item" @mouseenter="showLabel('reports')" @mouseleave="hideLabel('reports')">
            <i class="fas fa-chart-bar"></i>
            <span class="menu-label" :class="{'show': activeMenu === 'reports'}">Отчёты</span>
          </div>
          <div class="menu-item" @mouseenter="showLabel('settings')" @mouseleave="hideLabel('settings')">
            <i class="fas fa-cogs"></i>
            <span class="menu-label" :class="{'show': activeMenu === 'settings'}">Настройки</span>
          </div>
          <div class="menu-item" @mouseenter="showLabel('users')" @mouseleave="hideLabel('users')">
            <i class="fas fa-users"></i>
            <span class="menu-label" :class="{'show': activeMenu === 'users'}">Пользователи</span>
          </div>
          <div class="menu-item" @mouseenter="showLabel('permissions')" @mouseleave="hideLabel('permissions')">
            <i class="fas fa-user-shield"></i>
            <span class="menu-label" :class="{'show': activeMenu === 'permissions'}">Права</span>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: '',
      user: {
        name: 'Иван Иванов',
        email: 'ivan@domain.com',
        profilePic: '',
      },
      defaultProfilePic: 'https://via.placeholder.com/150',
    };
  },
  methods: {
    showLabel(menuItem) {s
      this.activeMenu = menuItem;
    },
    hideLabel() {
      this.activeMenu = '';
    },
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');

    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #242836;
  color: white;
  padding: 20px 30px;
  position: fixed;
  width: 97%;
  top: 0;
  z-index: 1000;
}

header .logo {
  display: flex;
  align-items: center;
}

header .logo i {
  font-size: 24px;
  margin-right: 10px;
}

header .logo span {
  font-size: 18px;
}

header .profile {
  display: flex;
  align-items: center;
  position: relative;
  margin-left: auto;
}

.profile-img-wrapper {
  margin-right: 15px;
}

.profile-img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  transition: border-color 0.3s ease;
}

.profile-img:hover {
  border-color: #3079ff;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.btn-logout {
  background-color: #ff3d3d;
  padding: 8px 15px;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  margin-top: 5px;
}

.btn-logout:hover {
  background-color: #e63946;
}

.main-content {
  display: flex;
  flex-grow: 1;
  padding-top: 80px;
}

.sidebar {
  width: 80px;
  background-color: #242836;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: fixed;
  height: 100vh;
  top: 80px; /* Отступ для хедера сверху */
  left: 0;
}

.menu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease;
  padding: 10px;
  border-radius: 8px;
  color: white;
}

.menu-item i {
  font-size: 24px;
}

.menu-label {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
  white-space: nowrap;
}

.menu-label.show {
  opacity: 1;
  visibility: visible;
}

.sidebar:hover .menu-item:hover .menu-label {
  opacity: 1;
  visibility: visible;
}

.content {
  margin-left: 80px;
  padding: 20px;
  flex-grow: 1;
  background-color: #f4f4f9;
}

.content h1 {
  color: #242836;
}

.content p {
  color: #777;
}
.menu-link {
  color: white;
}
</style>
