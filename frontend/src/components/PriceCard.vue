<template>
  <div class="container">
    <h2 class="heading">Наши тарифы</h2>
    <div class="price-card-container">
      <div
          class="price-card"
          v-for="(service, index) in services"
          :key="index"
          ref="priceCards"
          :class="{
          'price-card-large': index === 1,
          'price-card-small': index !== 1,
          'price-card-hover': index !== 1
        }"
          @mousedown.prevent
      >
        <div class="card-header">
          <h3>{{ service.name }}</h3>
          <p>{{ service.description }}</p>
        </div>
        <div class="card-body">
          <ul class="benefits">
            <li v-for="(benefit, idx) in service.benefits" :key="idx" class="benefit-item">
              <span class="emoji">{{ benefit.emoji }}</span> {{ benefit.text }}
            </li>
          </ul>
          <div class="price-container">
            <p class="price">{{ service.price }} ₽</p>
            <button class="order-button">Подписаться</button>
          </div>
        </div>
        <div v-if="index === 1" class="badge">🔥 Выгодно</div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";

export default {
  data() {
    return {
      services: [
        {
          name: "1 месяц",
          description: "Идеальный вариант для тестирования аналитики перед длительной подпиской.",
          price: "5000",
          benefits: [
            { text: "Доступ к базовым отчетам", emoji: "📊" },
            { text: "Ежемесячный анализ продаж", emoji: "📈" },
            { text: "Рекомендации по улучшению", emoji: "💡" }
          ]
        },
        {
          name: "6 месяцев",
          description: "Оптимальный тариф с расширенными возможностями аналитики.",
          price: "25000",
          benefits: [
            { text: "Полный доступ к аналитике", emoji: "📊" },
            { text: "Персонализированные советы", emoji: "🛠️" },
            { text: "Консультации по продажам", emoji: "🔍" }
          ]
        },
        {
          name: "1 год",
          description: "Максимальная выгода и эксклюзивные функции для бизнеса.",
          price: "45000",
          benefits: [
            { text: "Все премиум-отчеты", emoji: "🔑" },
            { text: "Дополнительные инструменты", emoji: "💎" },
            { text: "Приоритетная поддержка", emoji: "🔧" }
          ]
        }
      ]
    };
  },
  mounted() {
    nextTick(() => {
      this.animateCards();
    });
  },
  methods: {
    animateCards() {
      const cards = this.$refs.priceCards;
      if (!cards) return;

      cards.forEach((card, index) => {
        card.classList.add("fade-in");

        card.addEventListener("mouseover", () => {
          card.classList.add("hovered");
        });

        card.addEventListener("mouseleave", () => {
          card.classList.remove("hovered");
        });
      });
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 5%;
}

.heading {
  color: #ffffff;
  text-align: start;
  font-size: 34px;
  margin-bottom: 20px;
}

.price-card-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding-top: 40px;
  padding-bottom: 40px;
  flex-wrap: wrap;
}

.price-card {
  background: #2a333f;
  border-radius: 15px;
  width: 320px;
  max-width: 100%;
  padding: 30px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  position: relative;
  border: 2px solid transparent;
  user-select: none;
  opacity: 0;
}

.price-card-large {
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(0, 255, 111, 0.5);
}

.price-card-small {
  transform: scale(1);
}

.price-card-hover:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(137, 129, 255, 0.7);
}

.card-header {
  margin-bottom: 20px;
}

.card-header h3 {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
}

.card-header p {
  font-size: 14px;
  color: #b0b0b0;
  line-height: 1.5;
}

.card-body {
  margin-top: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.benefits {
  font-size: 14px;
  color: #b0b0b0;
  margin-bottom: 20px;
  list-style-type: none;
  padding-left: 0;
  text-align: left;
}

.benefit-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.emoji {
  margin-right: 10px;
  font-size: 18px;
}

.price-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #8981ff;
  margin-bottom: 10px;
}

.order-button {
  background: #8981ff;
  color: #fff;
  border: none;
  padding: 12px 25px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

.order-button:hover {
  background: rgba(0, 255, 111, 0.5);
  transform: translateY(-3px);
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 255, 111, 0.6);
  color: #fff;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.price-card.fade-in {
  animation: fadeIn 0.8s forwards;
}

.price-card.hovered {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .price-card-container {
    flex-direction: column;
    align-items: center;
  }
  .price-card {
    width: 90%;
    margin-bottom: 20px;
  }
}
</style>
