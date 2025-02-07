<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Левая часть -->
      <div class="footer-left">
        <h2 class="footer-title">WBSTAT</h2>
        <p class="footer-description">
          Сервис веб-аналитики для продавцов на Wildberries. Отслеживайте продажи, цены и аналитику рынка.
        </p>
      </div>

      <!-- Центральная часть -->
      <div class="footer-center">
        <h3>Навигация</h3>
        <ul>
          <li><a href="#">Главная</a></li>
          <li><a href="#">Функции</a></li>
          <li><a href="#">Тарифы</a></li>
          <li><a href="#">Контакты</a></li>
        </ul>
      </div>

      <!-- Правая часть -->
      <div class="footer-right">
        <h3>Контакты</h3>
        <ul>
          <li><i class="fas fa-envelope"></i> support@wbstat.com</li>
          <li><i class="fas fa-phone"></i> +7 (999) 123-45-67</li>
          <li><i class="fas fa-map-marker-alt"></i> Москва, Россия</li>
        </ul>

        <div class="social-icons">
          <a href="#"><i class="fab fa-telegram"></i></a>
          <a href="#"><i class="fab fa-vk"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2025 WBSTAT. Все права защищены. <a href="#">Политика конфиденциальности</a></p>
    </div>
  </footer>
</template>

<script>
import gsap from "gsap";

export default {
  mounted() {
    gsap.from(".footer-container", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
    });

    gsap.utils.toArray(".footer a").forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, { color: "#8981FF", duration: 0.3 });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link, { color: "#B0B3B8", duration: 0.3 });
      });
    });
  },
};
</script>

<style scoped>
.footer {
  background-color: #1e2029;
  color: #d1d1d1;
  padding: 40px 8%;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-left {
  max-width: 300px;
}

.footer-title {
  font-size: 28px;
  font-weight: bold;
  color: white;
}

.footer-description {
  font-size: 14px;
  color: #b0b3b8;
}

.footer-center h3,
.footer-right h3 {
  font-size: 18px;
  color: white;
  margin-bottom: 10px;
}

.footer-center ul,
.footer-right ul {
  list-style: none;
  padding: 0;
}

.footer-center ul li,
.footer-right ul li {
  margin: 8px 0;
}

.footer a {
  color: #b0b3b8;
  text-decoration: none;
  transition: color 0.3s;
}

.footer a:hover {
  color: #8981FF;
}

.social-icons {
  margin-top: 15px;
}

.social-icons a {
  color: white;
  font-size: 20px;
  margin-right: 12px;
  transition: color 0.3s;
}

.social-icons a:hover {
  color: #8981FF;
}

.footer-bottom {
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #b0b3b8;
}

.footer-bottom a {
  color: #8981FF;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    text-align: center;
  }

  .footer-left,
  .footer-center,
  .footer-right {
    max-width: 100%;
  }
}
</style>
