<template>
  <div class="reviews-section">
    <h1 class="reviews-title">Отзывы</h1>
    <div class="reviews-container">
      <div class="slider-wrapper">
        <div class="slider" ref="slider">
          <div v-for="(review, index) in repeatedReviews" :key="index" class="review-card">
            <p class="review-text">{{ review.text }}</p>
            <div class="stars">
              <span v-for="n in review.rating" :key="n" class="star">★</span>
            </div>
            <h4 class="review-author">{{ review.author }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  data() {
    return {
      reviews: [
        { text: "Отличный сервис, помогает анализировать продажи!", author: "Андрей Соколов", rating: 5 },
        { text: "Очень удобно, теперь закупки автоматизированы!", author: "Мария Иванова", rating: 4 },
        { text: "Понравился интерфейс, всё понятно!", author: "Игорь Кузнецов", rating: 5 },
        { text: "Рекомендую всем продавцам на WB!", author: "Елена Смирнова", rating: 4 },
        { text: "Сервис значительно упростил аналитику!", author: "Олег Петров", rating: 5 }
      ],
    };
  },
  computed: {
    repeatedReviews() {
      return [...this.reviews, ...this.reviews];
    },
  },
  mounted() {
    this.initSliderAnimation();
  },
  methods: {
    initSliderAnimation() {
      gsap.to(this.$refs.slider, {
        x: "-50%",
        duration: 20, // Медленный слайдер
        repeat: -1,
        ease: "linear",
      });
    },
  },
};
</script>

<style scoped>
.reviews-section {
  background-color: #242836;
  padding: 0 6%;
  overflow: hidden;
}

.reviews-title {
  font-size: 36px;
  color: white;
  text-align: left;
  margin-bottom: 30px;
}

.reviews-container {
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.slider-wrapper {
  width: 100%;
  overflow: hidden;
}

.slider {
  display: flex;
  gap: 30px;
  width: 200%;
}

.review-card {
  background: #2a3b49;
  padding: 25px;
  border-radius: 12px;
  min-width: 350px;
  max-width: 450px;
  color: white;
  text-align: center;
}

.review-text {
  font-size: 18px;
  margin-bottom: 10px;
}

.review-author {
  font-size: 18px;
  font-weight: bold;
  color: #00FF6F;
}

.stars {
  color: #FFD700;
  font-size: 22px;
  margin-bottom: 10px;
}

.star {
  margin-right: 3px;
}
</style>
