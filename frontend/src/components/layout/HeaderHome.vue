<template>
  <header class="header no-animation">
    <div class="logo">
      <i class="fas fa-chart-line" style="color: #ffffff; font-size: 32px;"></i>
      <span style="font-weight: 700; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff; margin-left: 8px;">
  WbStat
</span>
    </div>
    <div class="header-right">
      <div class="subscription-info">
        <i class="fas fa-crown subscription-icon" title="Бессрочная подписка"></i>
        <span class="subscription-label">Freemium
        </span>
        <span class="subscription-duration">бессрочно</span>
        <button class="buy-button" @click="goToBuy">Купить</button>
      </div>
    </div>
    <div class="profile" ref="profileMenuWrapper">
      <img
          :src="user.profilePic || defaultProfilePic"
          alt="Profile"
          class="profile-img"
          @click.stop="toggleProfileMenu"
      />

      <transition name="dropdown">
        <div v-if="profileMenuVisible" class="profile-dropdown">
          <ul>
            <li>
              <router-link to="/profile">
                <i class="fas fa-user" style="margin-right: 8px;"></i> Профиль
              </router-link>
            </li>
            <li>
              <router-link to="/settings/security">
                <i class="fas fa-shield-alt" style="margin-right: 8px;"></i> Безопасность
              </router-link>
            </li>
            <li>
              <router-link to="/pricing_plan">
                <i class="fas fa-sync-alt" style="margin-right: 8px;"></i> Обновить план
              </router-link>
            </li>
            <li>
              <router-link to="/profile">
                <i class="fas fa-blog" style="margin-right: 8px;"></i> Блог
              </router-link>
            </li>
            <li>
              <router-link to="/profile">
                <i class="fas fa-envelope" style="margin-right: 8px;"></i> Связь с нами
              </router-link>
            </li>
            <li>
              <a href="#" @click.prevent="logout">
                <i class="fas fa-sign-out-alt" style="margin-right: 8px;"></i> Выйти
              </a>
            </li>
          </ul>
        </div>
      </transition>

    </div>
  </header>

  <div class="main-content">
    <nav :class="['sidebar', { collapsed: sidebarCollapsed }]">
      <ul class="menu">
        <li
            v-for="item in menuItems"
            :key="item.name"
            class="menu-item"
            :class="{ active: activeMenu === item.name }"
        >
          <router-link
              v-if="!['Unit', 'sales', 'reports', 'competitors'].includes(item.name)"
              :to="item.route"
              class="menu-link"
              :title="sidebarCollapsed ? item.label : ''"
              @click.native="setActive(item.name)"
          >
            <i :class="item.icon"></i>
            <span v-if="!sidebarCollapsed" class="menu-label">{{ item.label }}</span>
          </router-link>

          <div
              v-else
              class="menu-link clickable"
              :title="sidebarCollapsed ? item.label : ''"
              @click="toggleSubmenu(item.name)"
          >
            <i :class="item.icon"></i>
            <span v-if="!sidebarCollapsed" class="menu-label">{{ item.label }}</span>
            <i
                v-if="!sidebarCollapsed"
                class="fas"
                :class="activeSubmenu === item.name ? 'fa-chevron-up' : 'fa-chevron-down'"
                style="margin-left:auto; font-size: 14px;"
            ></i>
          </div>

          <ul
              v-if="item.submenu && activeSubmenu === item.name && !sidebarCollapsed"
              class="submenu visible"
          >
            <li v-for="subItem in item.submenu" :key="subItem.name" class="submenu-item">
              <router-link :to="subItem.route" class="submenu-link">
                {{ subItem.label }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <main :class="['content', { collapsed: sidebarCollapsed }]">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileMenuVisible: false,
      activeMenu: '',
      activeSubmenu: null,
      sidebarCollapsed: false,
      userPlan: "Базовый",
      user: {
        name: "Иван Иванов",
        email: "ivan@domain.com",
        profilePic: "",
      },
      defaultProfilePic:
          "https://yt3.googleusercontent.com/ytc/AIdro_ken1vOlFv_eHUwwywZiBoxQkSIBACJ4yRxGhTDLBnQ1Q=s900-c-k-c0x00ffffff-no-rj",
      menuItems: [
        {
          name: "home",
          label: "Главная",
          route: "/home",
          icon: "fas fa-home",
          submenu: [
            { name: "overview", label: "Обзор", route: "/home/overview" },
            { name: "stats", label: "Статистика", route: "/home/stats" },
          ],
        },
        {
          name: "Unit",
          label: "Графики",
          route: "/Unit",
          icon: "fas fa-chart-line",
          submenu: [
            { name: "daily", label: "Дневные", route: "/Unit/daily" },
            { name: "monthly", label: "Месячные", route: "/Unit/monthly" },
          ],
        },
        {
          name: "sales",
          label: "Unit",
          route: "/sales",
          icon: "fas fa-dollar-sign",
          submenu: [
            { name: "invoices", label: "Счета", route: "/sales/invoices" },
            { name: "reports", label: "Отчёты", route: "/sales/reports" },
          ],
        },
        {
          name: "competitors",
          label: "Конкуренты",
          route: "/competitors",
          icon: "fas fa-users",
          submenu: [
            { name: "list", label: "Список", route: "/competitors/list" },
            { name: "analysis", label: "Анализ", route: "/competitors/analysis" },
          ],
        },
        {
          name: "reports",
          label: "Отчёты",
          route: "/reports",
          icon: "fas fa-file-alt",
          submenu: [
            { name: "annual", label: "Карточки", route: "/card" },
            { name: "quarterly", label: "Квартальные", route: "/reports/quarterly" },
          ],
        },
        {
          name: "settings",
          label: "Тарифы",
          route: "/pricing_plan",
          icon: "fas fa-cogs"
        },
      ],
    };
  },


  methods: {
    toggleProfileMenu() {
      this.profileMenuVisible = !this.profileMenuVisible;
    },
    handleClickOutside(event) {
      const menu = this.$refs.profileMenuWrapper;
      if (menu && !menu.contains(event.target)) {
        this.profileMenuVisible = false;
      }
    },
    logout() {
      localStorage.removeItem("authToken");
      this.$router.push("/login");
    },
    setActive(name) {
      this.activeMenu = name;
      this.activeSubmenu = null; // Сброс подменю при выборе простого пункта
    },
    toggleSubmenu(name) {
      if (this.activeSubmenu === name) {
        this.activeSubmenu = null;
      } else {
        this.activeSubmenu = name;
        this.activeMenu = name; // Чтобы подсвечивать пункт с открытым подменю
      }
    },
    goToBuy() {
      this.$router.push({ name: 'pricing_plan' });
    },
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },

};
</script>

<style scoped>

.profile {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.profile-dropdown {
  position: absolute;
  right: 0;
  top: 55px; /* Немного ниже аватарки */
  background-color: #2a3042;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  min-width: 180px;
  z-index: 1200;
  padding: 10px 0;
  font-size: 14px;
}

.profile-dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.profile-dropdown li {
  padding: 8px 20px;
}

.profile-dropdown li:hover {
  background-color: rgba(48, 59, 85, 0.55);
}

.profile-dropdown a {
  color: #d0d5e6;
  text-decoration: none;
  display: block;
  font-weight: 600;
  user-select: none;
}

.subscription-info {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.subscription-icon {
  font-size: 16px;
}

.subscription-label strong {
  font-weight: 700;
  color: #4a90e2;
  margin-left: 4px;
}

.subscription-duration {
  font-style: italic;
  color: #a0a8c0;
  font-size: 12px;
  margin-left: 6px;
}

.buy-button {
  background-color: #7c5cff;
  border: none;
  box-shadow: 0 0 10px #7c5cffaa;
  color: white;
  padding: 6px 16px;
  font-weight: 600;
  font-size: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 12px;
}

.buy-button:hover {
  background-color: #6a4fff;
}

/* Анимация открытия/закрытия меню под профилем */
.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
  transform-origin: top right;
}

.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

.dropdown-enter-to, .dropdown-leave-from {
  opacity: 1;
  transform: scale(1);
}


header {
  padding: 20px 30px 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1100;
  background-color: #242836;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  color: white;
  box-sizing: border-box;
  overflow: visible;
}

header .logo {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
}

header .logo i {
  font-size: 24px;
  margin-right: 10px;
}

.header-right {
  background: #2a2c3d;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
  padding: 10px;
  border-radius: 10px;
}

.subscription-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
}

.subscription-label strong {
  font-weight: 700;
  color: #4a90e2;
}


.profile {
  margin-left: 15px;
  flex-shrink: 0;
}

.profile-img-wrapper {
  margin-left: 15px;
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

/* --- Main Content --- */
.main-content {
  display: flex;
  padding-top: 80px;
  height: auto;
  justify-content: flex-start;
  align-items: stretch;
}

/* --- Sidebar --- */
  .sidebar {
    background-color: #242836;
    width: 200px;
    height: calc(100vh - 80px);
    position: fixed;
    top: 80px;
    left: 0;
    box-shadow: inset -3px 0 8px rgba(50, 55, 85, 0.6);
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #b0b5d1;
    transition: width 0.3s ease;
  }

  .sidebar.collapsed {
    width: 70px;
  }

.sidebar.collapsed + .content {
  margin-left: 80px;
}

/* --- Menu --- */
.menu {
  list-style: none;
  padding: 0 12px;
  margin: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.menu-item {
  border-radius: 12px;
  overflow: hidden;
  transition: background-color 0.25s ease, box-shadow 0.3s ease;
}
.menu-item.active {
  box-shadow: 0 0 10px #6a5effaa;
  color: white;
  font-weight: 700;
}
.menu-item:hover:not(.active) {
  background: rgba(106, 94, 255, 0.15);
  color: #d0d3ff;
  cursor: pointer;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 14px 18px;
  color: inherit;
  text-decoration: none;
  font-size: 14px;
  user-select: none;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.menu-link.clickable {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.menu-link i {
  font-size: 22px;
  width: 28px;
  text-align: center;
  flex-shrink: 0;
  color: inherit;
  transition: color 0.3s ease;
}

.sidebar.collapsed .menu-link {
  justify-content: center;
  position: relative;
}

.sidebar.collapsed .menu-link:hover::after {
  content: attr(title);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #6a5eff;
  color: white;
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0.95;
  box-shadow: 0 4px 12px rgba(106, 94, 255, 0.6);
  z-index: 2500;
}

/* Метка меню (текст) */
.menu-label {
  margin-left: 10px;

  font-size: 13px;
  user-select: none;
  transition: opacity 0.3s ease;
}

/* --- Submenu --- */
/* --- Submenu --- */
/* Улучшенный стиль подменю */
.submenu {
  background: linear-gradient(135deg, #3a3f5c 0%, #2a3042 100%);
  border-left: 5px solid #7c5cff; /* Акцентный фиолет */
  padding-left: 28px;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-12px);
  transition:
      max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.35s ease,
      transform 0.35s ease,
      box-shadow 0.3s ease;
  box-shadow: 0 12px 24px rgba(124, 92, 255, 0.15);
  border-radius: 0 12px 12px 0;
  pointer-events: none;
  user-select: none;
  font-size: 15px;
  margin-top: 8px;
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #e0e4ff;
}

.submenu.visible {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  user-select: auto;
  padding-top: 12px;
  padding-bottom: 12px;
  box-shadow: 0 18px 40px rgba(124, 92, 255, 0.3);
}

/* Подменю элементы */
.submenu-item {
  margin: 7px 0;
  transition: background-color 0.25s ease, color 0.25s ease;
  border-radius: 8px;
}

.submenu-link {
  display: block;
  padding: 10px 18px;
  color: #c8cbff;
  border-radius: 8px;
  transition:
      background-color 0.3s ease,
      color 0.3s ease,
      transform 0.22s ease;
  cursor: pointer;
  user-select: none;
  font-size: 14.5px;
}

.submenu-link:hover,
.submenu-link.router-link-active {
  color: white;
  transform: translateX(8px);
  box-shadow: 0 4px 12px rgba(124, 92, 255, 0.6);
}

/* Иконки стрелок */
.menu-link .fas.fa-chevron-down,
.menu-link .fas.fa-chevron-up {
  color: #9a9fcb;
  font-size: 15px;
  transition: transform 0.35s ease;
  margin-left: auto;
  user-select: none;
}

.menu-link .fas.fa-chevron-up {
  transform: rotate(180deg);
}

/* Ховер и активные пункты меню */
.menu-item:hover {
  background-color: #3c4070;
  transition: background-color 0.35s ease;
}

.menu-item.active,
.menu-item.active:hover {
  color: white;
  box-shadow: inset 4px 0 0 #a06fff;
}

.menu-link {
  color: #d0d5e6;
  font-weight: 600;
  transition: color 0.3s ease;
}

.menu-link:hover {
  color: white;
}

/* Курсор для кликабельных элементов */
.menu-link.clickable {
  cursor: pointer;
  user-select: none;
}

/* Плавный и современный шрифт */
.menu-label {
  margin-left: 12px;
  font-size: 14px;
  user-select: none;
  transition: opacity 0.3s ease;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #c8cbff;
}

/* Плавное появление */
.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform-origin: top right;
}

.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.dropdown-enter-to, .dropdown-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Стрелочки */
.menu-link .fas.fa-chevron-down,
.menu-link .fas.fa-chevron-up {
  color: #8a95b8;
  font-size: 14px;
  transition: transform 0.3s ease;
  margin-left: auto;
  user-select: none;
}

.menu-link .fas.fa-chevron-up {
  transform: rotate(180deg);
}

/* Акцент при наведении на пункт меню с подменю */
.menu-item:hover {
  background-color: #3b4461;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

/* Курсор для кликабельных элементов меню */
.menu-link.clickable {
  cursor: pointer;
  user-select: none;
}

/* Уточнение размера иконок для лаконичности */
.menu-link i {
  font-size: 20px;
  width: 28px;
  text-align: center;
}

/* Акцент при наведении на пункт меню с подменю */
.menu-item:hover {
  background-color: #3b4461;
  transition: background-color 0.3s ease;
}

/* --- Content --- */
.main-content {
  display: flex;
  padding-top: 80px;
  height: auto;
  justify-content: flex-start;
  align-items: stretch;
}

.content {
  margin-left: 220px;
  flex-grow: 1;
  padding: 20px;
  max-width: 1200px;
  width: 100%;
  color: #242836;
  display: flex;
  flex-direction: column;
}
</style>
