<template>
  <div class="faq-section">
    <h1 class="faq-title">Вопросы-ответы</h1>
    <div class="faq-wrapper">
      <div class="faq-container">
        <div
            v-for="(item, index) in faqItems"
            :key="index"
            class="faq-item"
            ref="faqItems"
        >
          <div class="faq-header" @click="toggle(index)">
            <h4>{{ item.question }}</h4>
            <span :class="['arrow', { rotate: activeIndex === index }]"></span>
          </div>
          <div class="faq-content" v-show="activeIndex === index" ref="faqContents">
            <p>{{ item.answer }}</p>
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
      activeIndex: null,
      faqItems: [
        { question: "Что такое сервис веб-аналитики для Wildberries?", answer: "Это сервис, который предоставляет подробную аналитику по продажам товаров на Wildberries, включая данные о популярных товарах, продажах по категориям, брендам и поставщикам." },
        { question: "Какие метрики можно отслеживать?", answer: "Вы можете отслеживать ключевые метрики, такие как количество покупок, средний чек, конверсии, рейтинг товаров, топ продаж, а также данные по динамике цен." },
        { question: "Как можно использовать SEO-анализ?", answer: "Сервис позволяет анализировать видимость ваших товаров в поисковой выдаче Wildberries, отслеживать ключевые запросы, по которым ваш товар отображается, и сравнивать его позиции с конкурентами." },
        { question: "Можно ли выгружать данные?", answer: "Да, все данные, такие как статистика продаж и топ товаров, можно выгрузить в Excel для дальнейшего анализа и отчетности." },
        { question: "Как мониторить цены конкурентов?", answer: "С помощью сервиса вы можете отслеживать цены на товары конкурентов и сравнивать их с вашими ценами. Это позволяет выстраивать оптимальную ценовую стратегию." },
        { question: "Что такое избранное?", answer: "Вы можете добавлять интересующие вас товары в раздел «Избранное», чтобы быстро вернуться к ним и отслеживать их изменения по времени." }
      ],
    };
  },
  methods: {
    toggle(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
      this.$nextTick(() => this.animateAccordion(index));
    },
    animateAccordion(index) {
      const content = this.$refs.faqContents[index];
      if (this.activeIndex === index) {
        gsap.fromTo(content, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" });
      } else {
        gsap.to(content, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
      }
    }
  },
  mounted() {
    gsap.from(".faq-title", { opacity: 0, x: -50, duration: 0.8, ease: "power3.out" });
    gsap.from(".faq-item", { opacity: 0, y: 30, duration: 0.8, stagger: 0.2, ease: "power3.out" });
  }
};
</script>

<style scoped>
.faq-section {
  background-color: #242836;
  padding: 80px 6%;
}

.faq-title {
  font-size: 36px;
  color: white;
  text-align: left;
  margin-bottom: 30px;
}

.faq-wrapper {
  display: flex;
  justify-content: center;
}

.faq-container {
  max-width: 1100px; /* Сделал шире */
  width: 100%;
}

.faq-item {
  background: #2a3b49;
  margin: 15px 0;
  border-radius: 12px;
  overflow: hidden;
}

.faq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 30px;
  cursor: pointer;
  background: #364654;
  border-radius: 12px;
  transition: background 0.3s;
}

.faq-header:hover {
  background: #4b5c6c;
}

.faq-header h4 {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
  color: white;
}

.arrow {
  width: 20px;
  height: 20px;
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

.arrow.rotate {
  transform: rotate(-135deg);
}

.faq-content {
  padding: 22px 30px;
  background: #3e4c59;
  font-size: 20px;
  color: white;
  line-height: 1.6;
}

/* GSAP анимация */
.faq-content {
  overflow: hidden;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .faq-container {
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .faq-title {
    font-size: 28px;
  }
  .faq-header h4 {
    font-size: 22px;
  }
  .faq-content {
    font-size: 18px;
  }
}

@media (max-width: 600px) {
  .faq-header {
    padding: 18px 24px;
  }
  .faq-header h4 {
    font-size: 20px;
  }
  .faq-content {
    font-size: 16px;
  }
}
</style>
