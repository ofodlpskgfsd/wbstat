<template>
  <div class="container">
    <h2 class="heading">Отзывы наших пользователей</h2>
    <div class="slider-container">
      <button class="slider-btn prev-btn" @click="moveSlide('prev')">◀</button>
      <div class="reviews-slider">
        <transition-group name="fade" tag="div" class="reviews-wrapper">
          <div
              class="review-card"
              v-for="(review, index) in reviews"
              :key="index"
              :class="['review-card', { 'active': index === currentIndex }]"
          >
            <p class="review-text">{{ review.text }}</p>
            <div class="reviewer">
              <span class="reviewer-name">{{ review.name }}</span>
              <span class="reviewer-rating">★ {{ review.rating }}</span>
            </div>
          </div>
        </transition-group>
      </div>
      <button class="slider-btn next-btn" @click="moveSlide('next')">▶</button>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  data() {
    return {
      currentIndex: 0,
      reviews: [
        { text: "Отличный сервис! Все работает быстро и без сбоев.", name: "Иван Иванов", rating: 5 },
        { text: "Очень удобный инструмент для анализа продаж на Wildberries!", name: "Мария Петрова", rating: 4 },
        { text: "Рекомендую всем! Помогли улучшить бизнес.", name: "Олег Сидоров", rating: 5 },
        { text: "Немного не хватает функционала, но в целом хороший сервис.", name: "Анна Волкова", rating: 4 },
        { text: "Лучшее, что я пробовал для анализа своей торговли!", name: "Алексей Смирнов", rating: 5 },
      ],
    };
  },
  methods: {
    moveSlide(direction) {
      if (direction === "next") {
        this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
      } else if (direction === "prev") {
        this.currentIndex = (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
      }
      this.animateSlider();
    },
    animateSlider() {
      const cards = this.$refs.reviewCards;
      gsap.fromTo(
          cards[this.currentIndex],
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
      );
      cards.forEach((card, index) => {
        if (index !== this.currentIndex) {
          gsap.set(card, { opacity: 0 });
        }
      });
    },
  },
  mounted() {
    this.animateSlider();
  },
};
</script>

<style scoped>
.container {
  padding-top: 5%;
  text-align: center;
}

.heading {
  color: #ffffff;
  font-size: 34px;
  margin-bottom: 20px;
}

.slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.reviews-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  position: relative;
  transition: transform 0.5s ease-in-out;
}

.review-card {
  background: #2a333f;
  border-radius: 10px;
  padding: 20px;
  margin: 0 15px;
  max-width: 100%;
  min-width: 320px;
  color: white;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  transform: scale(0.9);
}

.review-card.active {
  opacity: 1;
  transform: scale(1);
}

.review-text {
  font-size: 16px;
  margin-bottom: 10px;
}

.reviewer {
  font-size: 14px;
  color: #8981ff;
}

.reviewer-name {
  font-weight: bold;
}

.reviewer-rating {
  color: #00ff6f;
}

.slider-btn {
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 10px;
  font-size: 18px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s ease;
}

.prev-btn {
  left: 10px;
}

.next-btn {
  right: 10px;
}

.slider-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

@media (max-width: 768px) {
  .slider-container {
    flex-direction: column;
  }
  .reviews-wrapper {
    width: 100%;
    overflow: hidden;
  }
  .review-card {
    width: 90%;
    margin: 10px 0;
  }
}
</style>
