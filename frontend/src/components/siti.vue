<script setup>
import { computed, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { useSalesStore } from '../stores/salesStore';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const salesStore = useSalesStore();

onMounted(() => {
  salesStore.refreshData(true);
});

const isLoading = computed(() => salesStore.isLoading);
const errorMessage = computed(() => salesStore.errorMessage);

const chartData = computed(() => {
  if (isLoading.value || errorMessage.value) return null;

  const labels = [
    'Выручка (₽)',
    'Заказов',
    'Средний чек (₽)',
    'Уникальных SKU',
    'Процент отмен (%)',
  ];

  const data = [
    salesStore.totalSales || 0,
    salesStore.orders || 0,
    salesStore.averageCheck || 0,
    salesStore.uniqueSKUCount || 0,
    Number(salesStore.cancelRate) || 0,
  ];

  return {
    labels,
    datasets: [
      {
        label: 'Показатели',
        data,
        backgroundColor: 'rgba(124, 92, 255, 0.7)',
        borderColor: 'rgba(124, 92, 255, 1)',
        borderWidth: 1,
        borderRadius: 4,
        maxBarThickness: 40,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label(context) {
          const label = context.dataset.label || '';
          const value = context.parsed.y ?? context.parsed;
          if (context.label.includes('Выручка') || context.label.includes('Средний чек')) {
            return `${label}: ₽${value.toLocaleString('ru-RU')}`;
          }
          if (context.label.includes('Процент отмен')) {
            return `${label}: ${value}%`;
          }
          return `${label}: ${value}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback(value) {
          return value.toLocaleString();
        },
      },
    },
  },
};
</script>

<template>
  <div class="dashboard-chart">
    <h3>📈 Сводка ключевых показателей</h3>

    <div v-if="errorMessage" class="error-banner">{{ errorMessage }}</div>

    <div v-if="isLoading" class="loader"></div>

    <Bar v-if="chartData && !isLoading" :data="chartData" :options="chartOptions" />

    <p v-else-if="!isLoading && !chartData">Нет данных для отображения</p>

    <p v-if="!isLoading && salesStore.avgDeliveryTime !== '—'">
      ⏳ Среднее время доставки: {{ salesStore.avgDeliveryTime }}
    </p>
  </div>
</template>

<style scoped>
.dashboard-chart {
  background: #2b2c3d;
  border-radius: 15px;
  padding: 20px;
  max-width: 73%;
  margin: 26px 0 120px 310px;
  color: #f5f5f7;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}
h3 {
  margin-bottom: 20px;
  font-weight: 600;
}
.error-banner {
  color: #ff4c4c;
  font-weight: 700;
  margin-bottom: 15px;
  text-align: center;
}
.loader {
  width: 40px;
  height: 40px;
  margin: 40px auto;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: #7c5cff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
