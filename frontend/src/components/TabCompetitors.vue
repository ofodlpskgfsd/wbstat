<template>
  <div class="container">
    <h1 class="head_txt" ref="title">
      <span class="gradient_green_blue">Анализируйте конкурентов</span>
    </h1>

    <div class="tabs-header">
      <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="{ active: currentTab === tab.id }"
          @click="changeTab(tab.id)"
      >
        {{ tab.title }}
      </button>
    </div>

    <div class="tabs-content">
      <div class="text-content" ref="textContent">
        <h2>{{ currentTabContent.title }}</h2>
        <p>{{ currentTabContent.description }}</p>
        <div class="start">
          <router-link to="/register">Начать ⭢</router-link>
        </div>
      </div>
      <img
          :src="currentTabContent.image"
          alt="Illustration"
          class="tab-image"
          draggable="false"
          ref="tabImage"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import gsap from "gsap";

import img1 from "../assets/analitic.png";
import img2 from "../assets/prodaji.png";
import img3 from "../assets/seo.png";
import img4 from "../assets/save.png";

export default {
  setup() {
    const currentTab = ref("analytics");
    const title = ref(null);
    const textContent = ref(null);
    const tabImage = ref(null);

    const tabs = [
      {
        id: "analytics",
        title: "Аналитика любого уровня",
        description:
            "Покажем вам подробную статистику продаж по конкретному товару, категории, бренду, поставщику и предоставим возможность выгрузить данные в Excel",
        image: img1,
      },
      {
        id: "top-sales",
        title: "Топ продаж",
        description:
            "Каждый день предоставляем актуальную статистику по самым продаваемым товарам и самым популярным категориям",
        image: img2,
      },
      {
        id: "seo-tools",
        title: "Инструменты SEO",
        description:
            "Сравним товары по поисковым запросам. Выделим все запросы, по которым выдается конкретный товар. Покажем все товары из выдачи по определенному запросу.",
        image: img3,
      },
      {
        id: "favorites",
        title: "Избранное",
        description:
            "Добавьте любой интересующий вас товар в раздел «Избранное» и возвращайтесь к нему тогда, когда захотите",
        image: img4,
      },
    ];

    const currentTabContent = ref(tabs.find((tab) => tab.id === currentTab.value));

    const changeTab = (tabId) => {
      if (currentTab.value !== tabId) {
        gsap.to([textContent.value, tabImage.value], {
          opacity: 0,
          y: 20,
          duration: 0.3,
          onComplete: () => {
            currentTab.value = tabId;
            currentTabContent.value = tabs.find((tab) => tab.id === tabId);

            gsap.fromTo(
                [textContent.value, tabImage.value],
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
          },
        });
      }
    };

    onMounted(() => {
      gsap.fromTo(
          title.value,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
          [textContent.value, tabImage.value],
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    });

    return { currentTab, currentTabContent, changeTab, title, textContent, tabImage, tabs };
  },
};
</script>

<style scoped>
.tabs-header {
  width: 70%;
  margin-bottom: 20px;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}

.tabs-header button {
  margin: 0 10px 0 0;
  color: rgba(255, 255, 255, 0.63);
  font-size: 15px;
  padding: 10px 20px;
  border: 1px solid #4b4d56;
  background: transparent;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.tabs-header button.active {
  background: rgba(143, 143, 143, 0.36);
  color: white;
  transform: scale(1.05);
}

.tabs-content {
  margin-top: 3%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}

.text-content {
  color: white;
  flex: 1;
  margin-right: 20px;
}

.tab-image {
  width: 50%;
  height: auto;
  flex-shrink: 0;
}

.head_txt {
  color: white;
  font-size: 36px;
  padding-bottom: 2%;
}

.gradient_green_blue {
  background-image: linear-gradient(to right, #8981ff, #00ff6f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h2 {
  margin-bottom: 4%;
  font-size: 30px;
}

p {
  color: rgba(255, 255, 255, 0.63);
  width: 450px;
  font-size: 18px;
  font-weight: 200;
}

a {
  color: #00ff6f;
}

.start {
  margin-top: 5%;
}

@media (max-width: 600px) {
  .tabs-header {
    width: 100%;
  }

  .tabs-header button {
    width: 100%;
    margin: 5px 0 0 0;
  }

  .tabs-content {
    flex-direction: column;
  }

  .text-content {
    margin-right: 0;
  }

  .head_txt {
    font-size: 24px;
  }

  p {
    width: 100%;
  }

  .tab-image {
    width: 100%;
    margin-top: 10px;
  }
  .container {
    margin-bottom: 20%;
    margin-top: 10%;
  }
  h2 {
    font-size: 24px;
  }
}
</style>
