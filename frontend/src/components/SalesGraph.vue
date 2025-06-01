<!-- SalesGraph.vue -->
<template>
  <div class="sales-graph">
    <h3>Динамика продаж</h3>
    <LineChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { ref, watch, onMounted } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

export default {
  components: {
    LineChart: Line,
  },
  props: {
    data: Array, // Данные для графика
  },
  setup(props) {
    const chartData = ref({
      labels: [], // Дни или другие метки по оси X
      datasets: [
        {
          label: 'Продажи',
          data: [],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          fill: true,
        },
      ],
    });

    const chartOptions = ref({
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    });

    // Обновление данных графика, когда они приходят
    watch(
        () => props.data,
        (newData) => {
          const labels = newData.map((item) => item.date);
          const values = newData.map((item) => item.sales);
          chartData.value.labels = labels;
          chartData.value.datasets[0].data = values;
        },
        { immediate: true }
    );

    return {
      chartData,
      chartOptions,
    };
  },
};
</script>

<style scoped>
.sales-graph {
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

h3 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
