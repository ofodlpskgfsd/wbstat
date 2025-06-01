<script setup>
import { ref, computed, onMounted } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const salesData = ref([]);
const dateFrom = ref(new Date().toISOString().split("T")[0]);
const dateTo = ref(new Date().toISOString().split("T")[0]);  // Дата по
const error = ref(null);
const loading = ref(false);
const selectedPeriod = ref("week");  // Период выборки: день, неделя, месяц

const getStartOfWeek = (date) => {
  const currentDate = new Date(date);
  const dayOfWeek = currentDate.getDay();
  const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek == 0 ? -6 : 1);
  const startOfWeek = new Date(currentDate.setDate(diff));
  return startOfWeek;
};

const getEndOfWeek = (startOfWeek) => {
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return endOfWeek;
};

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

// Функция для получения данных с API Wildberries
const fetchSalesData = async () => {
  loading.value = true;
  error.value = null;
  salesData.value = [];

  const apiKey = import.meta.env.VITE_WB_API_KEY;

  if (!apiKey) {
    error.value = "🚨 API-ключ не найден!";
    loading.value = false;
    return;
  }

  const url = `https://statistics-api.wildberries.ru/api/v1/supplier/orders?dateFrom=${encodeURIComponent(dateFrom.value)}&dateTo=${encodeURIComponent(dateTo.value)}&flag=0`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 429) {
      // Обработка ошибки 429 — слишком много запросов
      error.value = "Слишком много запросов, пожалуйста, подождите.";
      setTimeout(fetchSalesData, 300000); // Повторить через 5 минут (300000 миллисекунд)
      return;
    }

    if (!response.ok) throw new Error(`Ошибка API: ${response.status}`);

    const data = await response.json();

    // Группируем данные по выбранному периоду
    const groupedData = data.reduce((acc, order) => {
      let periodKey = "";
      const orderDate = new Date(order.date);
      if (selectedPeriod.value === "week") {
        const startOfWeek = getStartOfWeek(order.date);
        const weekStartDate = formatDate(startOfWeek);
        const weekEndDate = formatDate(getEndOfWeek(startOfWeek));
        periodKey = `${weekStartDate} - ${weekEndDate}`;
      } else if (selectedPeriod.value === "month") {
        const monthStartDate = formatDate(new Date(orderDate.getFullYear(), orderDate.getMonth(), 1));
        const monthEndDate = formatDate(new Date(orderDate.getFullYear(), orderDate.getMonth() + 1, 0));
        periodKey = `${monthStartDate} - ${monthEndDate}`;
      } else {
        periodKey = formatDate(orderDate);
      }

      if (!acc[periodKey]) acc[periodKey] = { revenue: 0 };

      acc[periodKey].revenue += order.finishedPrice;

      return acc;
    }, {});

    // Преобразуем в массив для графика
    salesData.value = Object.keys(groupedData).map((period) => {
      const periodData = groupedData[period];
      return {
        period,
        revenue: periodData.revenue,
      };
    });
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchSalesData);

// Подготовка данных для графика
const chartData = computed(() => {
  const labels = salesData.value.map((data) => data.period);
  const revenueData = salesData.value.map((data) => data.revenue);

  return {
    labels,
    datasets: [
      {
        label: "Выручка",
        data: revenueData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
});
</script>

<template>
  <div class="container">
    <h3 class="title">📊 График выручки</h3>

    <div class="controls">
      <input type="date" v-model="dateFrom" class="date-picker" />
      <input type="date" v-model="dateTo" class="date-picker" />
      <select v-model="selectedPeriod" class="select">
        <option value="day">По дням</option>
        <option value="week">По неделям</option>
        <option value="month">По месяцам</option>
      </select>
      <button @click="fetchSalesData" :disabled="loading" class="btn">
        🔄 {{ loading ? "Загружаем..." : "Обновить данные" }}
      </button>
    </div>

    <p v-if="error" class="status error">{{ error }}</p>

    <div v-if="salesData.length > 0">
      <Bar :data="chartData" />
    </div>
    <p v-else class="status">Нет данных для отображения</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  background: #242836;
  border-radius: 15px;
  text-align: center;
  color: white;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.date-picker {
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background: #ffffff;
  color: #333;
}

.select {
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background: #ffffff;
  color: #333;
}

.btn {
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  background: #8981FF;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  color: white;
}

.btn:hover {
  background: #2bbc00;
  color: white;
}

.status {
  color: #ff5252;
}

.error {
  font-weight: bold;
}
</style>