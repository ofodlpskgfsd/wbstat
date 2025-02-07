<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const isConnected = ref(null);
const loadingPing = ref(false);
const errorPing = ref(null);

const checkConnection = async () => {
  loadingPing.value = true;
  errorPing.value = null;

  try {
    const apiKey = import.meta.env.VITE_WB_API_KEY;
    if (!apiKey) throw new Error("🚨 API-ключ не найден!");

    console.log("🔑 API Key:", apiKey);

    const response = await fetch("https://common-api.wildberries.ru/ping", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`Ошибка API: ${response.status}`);

    isConnected.value = "✅ Подключение успешно!";
    animateSuccess();
  } catch (err) {
    console.error("❌ Ошибка подключения:", err);
    errorPing.value = err.message;
    isConnected.value = "❌ Ошибка подключения";
    animateError();
  } finally {
    loadingPing.value = false;
  }
};

const animateSuccess = () => {
  gsap.fromTo(
      ".status",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", color: "#4caf50" }
  );
};

const animateError = () => {
  gsap.fromTo(
      ".status",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", color: "#ff5252" }
  );
};

onMounted(() => {
  gsap.fromTo(
      ".container",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
  );
});
</script>

<template>
  <div class="container">
    <h3 class="title">🔌 Проверка подключения к WB API</h3>
    <button @click="checkConnection" :disabled="loadingPing" class="btn">
      🔄 {{ loadingPing ? "Проверяем..." : "Проверить" }}
    </button>
    <p v-if="isConnected" class="status">{{ isConnected }}</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #1e1e2f;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 15px;
}

.btn {
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #ff5252, #673ab7);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.btn:hover {
  background: linear-gradient(135deg, #673ab7, #ff5252);
  transform: scale(1.05);
}

.btn:disabled {
  background: gray;
  cursor: not-allowed;
  transform: none;
}

.status {
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
  color: white;
}
</style>
