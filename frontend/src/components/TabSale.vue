<template>
  <div class="container">
    <h1 class="head_txt" ref="title">Управляйте своими продажами</h1>

    <div class="tabs-header">
      <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="{ active: currentTab === tab.id }"
          @click="changeTab(tab.id)"
      >
        {{ tab.button }}
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

import img1 from "../assets/data.png";
import img2 from "../assets/dynamics.png";
import img3 from "../assets/history.png";
import img4 from "../assets/geo.png";

export default {
  setup() {
    const currentTab = ref("sales");
    const title = ref(null);
    const textContent = ref(null);
    const tabImage = ref(null);

    const tabs = [
      {
        id: "sales",
        button: "Сводные данные",
        title: "Сводные данные по вашим продажам",
        description:
            "Отслеживайте ваши продажи, заказы и остатки в реальном времени",
        image: img1,
      },
      {
        id: "sales dynamics",
        button: "Динамика продаж",
        title: "Ваши продажи в динамике",
        description:
            "Изучите динамику изменений ваших продаж и масштабируйте причины роста",
        image: img2,
      },
      {
        id: "history",
        button: "История выкупа",
        title: "Детализация по дням",
        description:
            "Покажем историю ваших заказов и продаж в формате календаря",
        image: img3,
      },
      {
        id: "geography sales",
        button: "География продаж",
        title: "Все ваши продажи по регионам",
        description:
            "Отслеживайте, в каких регионах ваши товары продаются больше всего",
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

.container {
  margin-top: 10%;
}

.tabs-header {
  margin-bottom: 20px;
  display: inline-block;
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

.container {
  margin-bottom: 10%;
}

@media (max-width: 900px) {
  .tabs-content {
    flex-direction: column;
    align-items: center;
  }

  .text-content {
    margin-right: 0;
    width: 100%;
  }

  .tab-image {
    width: 100%;
    margin-top: 20px;
  }

  h2 {
    font-size: 24px;
  }

  p {
    font-size: 16px;
    width: 100%;
  }

  .tabs-header button {
    font-size: 14px;
    padding: 8px 16px;
  }

  .head_txt {
    font-size: 28px;
  }
}

/* Для мобильных устройств */
@media (max-width: 600px) {
  .tabs-header button {
    width: 100%;
    font-size: 16px;
    padding: 10px 0;
    margin-bottom: 5px;
  }

  .tabs-content {
    flex-direction: column;
  }

  .text-content {
    margin-right: 0;
    text-align: center;
  }

  .tab-image {
    width: 100%;
    margin-top: 20px;
  }

  h2 {
    font-size: 20px;
  }

  p {
    font-size: 14px;
    width: 90%;
    margin: 0 auto;
  }

  .head_txt {
    font-size: 24px;
  }
}

</style>
