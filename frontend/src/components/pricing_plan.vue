<template>
  <headerHome/>
  <section class="pricing-section">
    <h2 class="section-title">Тарифы для продавцов</h2>
    <p class="section-subtitle">
      Выберите тариф, который соответствует текущему масштабу и целям вашего бизнеса. У нас нет скрытых платежей — только прозрачные условия и полный набор инструментов для роста.
    </p>

    <div class="plans-container">
      <div v-for="plan in plans" :key="plan.name" class="plan-card" :class="{ recommended: plan.recommended }">
        <h3 class="plan-title">{{ plan.name }}</h3>
        <p class="plan-price">{{ plan.price }}</p>
        <p class="plan-period">в месяц</p>

        <ul class="plan-features">
          <li v-for="feature in plan.features" :key="feature">✔ {{ feature }}</li>
        </ul>

        <BaseButton :btnClass="plan.recommended ? 'btn-primary' : 'btn-secondary'" class="choose-btn">
          Выбрать
        </BaseButton>
      </div>
    </div>

    <p class="note">
      * Все тарифы включают круглосуточную поддержку, регулярные обновления платформы и полный доступ к API аналитики для интеграции с вашими системами.
    </p>
  </section>

  <section class="benefits-section">
    <h2 class="section-title">Почему выбирают нас</h2>
    <p class="section-description">
      Мы предлагаем комплексное решение, адаптированное под динамику современного рынка и задачи любого продавца. Вот несколько ключевых преимуществ, которые выделяют нас среди конкурентов:
    </p>
    <div class="benefits-container">
      <div class="benefit-card">
        <h4>🚀 Молниеносный запуск</h4>
        <p>Быстрая и простая интеграция — вы можете начать работу за 15 минут без привлечения IT-специалистов. Сосредоточьтесь на бизнесе, а не на настройках.</p>
      </div>
      <div class="benefit-card">
        <h4>📊 Комплексная и прозрачная аналитика</h4>
        <p>Все данные об объёмах продаж, спросе и ключевых показателях собираются и визуализируются в едином личном кабинете. Забудьте о хаосе в Excel и бесконечных сводных таблицах.</p>
      </div>
      <div class="benefit-card">
        <h4>🧠 Интеллектуальные рекомендации на базе машинного обучения</h4>
        <p>Система автоматически выявляет тренды, прогнозирует изменения спроса и сигнализирует об аномалиях, давая вам преимущество перед конкурентами.</p>
      </div>
      <div class="benefit-card">
        <h4>🔒 Безопасность и надёжность</h4>
        <p>Используем современные стандарты защиты данных и резервного копирования, чтобы ваши данные всегда были под контролем и в безопасности.</p>
      </div>
      <div class="benefit-card">
        <h4>🤝 Персональная поддержка</h4>
        <p>Наша команда поддержки доступна 24/7, а пользователи тарифов «Бизнес» и «ПРО» получают выделенных менеджеров для решения любых вопросов оперативно и эффективно.</p>
      </div>
    </div>
  </section>

  <section class="faq-section">
    <h2 class="section-title">Часто задаваемые вопросы</h2>
    <div class="faq-container">
      <div class="faq-item">
        <h4>Можно ли изменить тариф позже?</h4>
        <p>Абсолютно. Вы можете переключаться между тарифами в любое удобное время через личный кабинет. Мы понимаем, что бизнес развивается — наши условия гибкие.</p>
      </div>
      <div class="faq-item">
        <h4>Есть ли демо-доступ?</h4>
        <p>Да, мы предоставляем бесплатный пробный период по запросу. Напишите в службу поддержки — и мы активируем демо-доступ с полным функционалом на ограниченное время.</p>
      </div>
      <div class="faq-item">
        <h4>Как работает служба поддержки?</h4>
        <p>Пользователи тарифа «Старт» получают поддержку по электронной почте с ответом в течение рабочего дня. Для тарифов «Бизнес» и «ПРО» доступна оперативная поддержка в Telegram и Slack, а также персональные менеджеры.</p>
      </div>
      <div class="faq-item">
        <h4>Можно ли интегрировать систему с CRM и другими инструментами?</h4>
        <p>Конечно. Мы предоставляем полноценный API, который позволит вам подключить нашу платформу к вашим бизнес-процессам и системам для автоматизации и синхронизации данных.</p>
      </div>
      <div class="faq-item">
        <h4>Какие гарантии конфиденциальности данных?</h4>
        <p>Мы строго соблюдаем стандарты GDPR и российского законодательства по защите персональных данных, а также регулярно проводим внутренние аудиты безопасности.</p>
      </div>
    </div>
  </section>

  <footerHome/>
</template>

<script>
import BaseButton from '../components/UI/BaseButton.vue';
import headerHome from '../components/layout/HeaderHome.vue';
import footerHome from '../components/layout/footerHome.vue';

export default {
  name: 'PricingPlans',
  components: { BaseButton, headerHome, footerHome },
  data() {
    return {
      plans: [
        {
          name: 'Старт',
          price: '₽3990',
          features: [
            'История заказов за 7 дней',
            'Базовая аналитика спроса',
            'Выгрузка отчётов в Excel',
            'Доступ к мобильному приложению',
            'Ежемесячные вебинары с экспертами',
          ],
        },
        {
          name: 'Бизнес',
          price: '₽7990',
          recommended: true,
          features: [
            'История заказов 30 дней',
            'Продвинутая аналитика ключевых показателей',
            'Отчёты по категориям и регионам',
            'Поддержка в Telegram 24/7',
            'Настройка пользовательских дашбордов',
            'Возможность интеграции с CRM',
          ],
        },
        {
          name: 'ПРО',
          price: '₽9990',
          features: [
            'Глубокая аналитика конкурентов и рынка',
            'Интерактивная тепловая карта спроса',
            'Полный API-доступ и возможность кастомизации',
            'Выделенный аналитик с поддержкой в Slack',
            'Приоритетное решение запросов',
            'Эксклюзивные обучающие материалы и кейсы',
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
/* === Глобальные секции === */
.pricing-section,
.benefits-section,
.faq-section {
  padding: 60px 20px;
  color: #e1e7ff;
  margin-left: 210px;
  text-align: center;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #ffffff;
}

.section-subtitle,
.section-description {
  font-size: 18px;
  margin-bottom: 40px;
  color: #aab3df;
}

/* === Карточки тарифов === */
.plans-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.plan-card {
  background: #2b2f3e;
  border: 1px solid #3a3e52;
  border-radius: 14px;
  padding: 30px 24px;
  width: 320px;

  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.plan-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(90, 109, 255, 0.2);
}

.recommended {
  border-color: #5a6dff;
  box-shadow: 0 0 12px rgba(90, 109, 255, 0.4);
}

.plan-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #ffffff;
}

.plan-price {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #5a6dff;
}

.plan-period {
  font-size: 14px;
  color: #b1b9e9;
  margin-bottom: 20px;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
  text-align: left;
  flex-grow: 1; /* Растягиваем список, чтобы кнопка внизу */
}

.plan-features li {
  margin-bottom: 12px;
  font-size: 15px;
  color: #d4d8f0;
}

.choose-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border-radius: 10px;
  margin-top: auto; /* Отталкивает кнопку вниз */
}

/* === Кнопка выбора === */
.choose-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border-radius: 10px;
}

/* === Преимущества и FAQ === */
.benefits-container,
.faq-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
}

.benefit-card,
.faq-item {
  background: #2a2d3c;
  border: 1px solid #3a3e52;
  border-radius: 12px;
  padding: 28px 24px;
  transition: border 0.3s ease, background 0.3s ease;
  text-align: left;
}

.benefit-card:hover,
.faq-item:hover {
  border-color: #5a6dff;
  background: #32364b;
}

.benefit-card h4,
.faq-item h4 {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 14px;
}

.benefit-card p,
.faq-item p {
  font-size: 16px;
  color: #c4c8e2;
  line-height: 1.6;
}

/* === Сноска === */
.note {
  margin-top: 40px;
  font-size: 14px;
  color: #888ea8;
}
</style>
