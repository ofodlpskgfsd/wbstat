<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-summary">
      <h2><i class="ri-bar-chart-2-line"></i> Общие показатели</h2>
      <p>📅 За <strong>{{ yesterdayLabelFull }}</strong> — сводка в цифрах</p>

      <div v-if="errorMessage" class="error-banner">
        <i class="ri-error-warning-line error-icon"></i>
        <span>{{ errorMessage }}</span>
      </div>

      <div class="summary-grid">
        <div
            class="card income"
            v-tooltip="'Суммарная выручка за ' + yesterdayLabelFull"
            :class="{ loading: isLoading }"
        >
          <div class="icon-wrap income">
            <i class="icon ri-line-chart-line"></i>
          </div>
          <p class="label">📦 Выручка</p>
          <p class="value">{{ isLoading ? '' : formatCurrency(totalSales) }}</p>
          <div v-if="isLoading" class="loader"></div>
        </div>

        <div
            class="card orders"
            v-tooltip="'Общее количество заказов за ' + yesterdayLabelFull"
            :class="{ loading: isLoading }"
        >
          <div class="icon-wrap orders">
            <i class="icon ri-shopping-cart-2-line"></i>
          </div>
          <p class="label">Заказов</p>
          <p class="value">{{ isLoading ? '' : orders }}</p>
          <div v-if="isLoading" class="loader"></div>
        </div>

        <div
            class="card average"
            v-tooltip="'Средняя сумма одного заказа'"
            :class="{ loading: isLoading }"
        >
          <div class="icon-wrap average">
            <i class="icon ri-wallet-line"></i>
          </div>
          <p class="label">Средний чек</p>
          <p class="value">{{ isLoading ? '' : formatCurrency(averageCheck) }}</p>
          <div v-if="isLoading" class="loader"></div>
        </div>

        <div
            class="card suppliers"
            v-tooltip="'Количество уникальных товаров (SKU) за период'"
            :class="{ loading: isLoading }"
        >
          <div class="icon-wrap suppliers">
            <i class="icon ri-bar-chart-box-line"></i>
          </div>
          <p class="label">Уникальные товары</p>
          <p class="value">{{ isLoading ? '' : uniqueSKUCount }}</p>
          <div v-if="isLoading" class="loader"></div>
        </div>

        <div
            class="card cancel-rate"
            v-tooltip="'Процент отменённых заказов'"
            :class="{ loading: isLoading }"
        >
          <div class="icon-wrap cancel-rate">
            <i class="icon ri-close-circle-line"></i>
          </div>
          <p class="label">Процент выполнения заказов</p>
          <p class="value">{{ isLoading ? '' : cancelRate + '%' }}</p>
          <div v-if="isLoading" class="loader"></div>
        </div>

        <div
            class="card avg-delivery-time"
            v-tooltip="'Среднее время доставки в днях'"
            :class="{ loading: isLoading }"
        >
          <div class="icon-wrap avg-delivery-time">
            <i class="icon ri-truck-line"></i>
          </div>
          <p class="label">Среднее время доставки</p>
          <p class="value">{{ isLoading ? '' : avgDeliveryTime }}</p>
          <div v-if="isLoading" class="loader"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, onMounted } from 'vue';
import { useSalesStore } from '../../stores/salesStore';

const salesStore = useSalesStore();
const forceRefresh = () => salesStore.refreshData(true);


const yesterdayLabelFull = new Date(Date.now() - 864e5).toLocaleDateString('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const isLoading = computed(() => salesStore.isLoading);
const errorMessage = computed(() => salesStore.errorMessage);
const totalSales = computed(() => salesStore.totalSales);
const orders = computed(() => salesStore.orders);
const averageCheck = computed(() => salesStore.averageCheck);
const uniqueSKUCount = computed(() => salesStore.uniqueSKUCount);
const cancelRate = computed(() => salesStore.cancelRate);
const avgDeliveryTime = computed(() => salesStore.avgDeliveryTime);

const formatCurrency = (value) =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(value);

const handleRefresh = async () => {
  try {
    await salesStore.refreshData();
  } catch (e) {
    console.error('Ошибка при обновлении данных:', e);
  }
};

onMounted(() => {
  const CACHE_TTL = 5 * 60 * 1000;
  if (salesStore.lastUpdated && Date.now() - salesStore.lastUpdated < CACHE_TTL) {
    return;
  }
  handleRefresh();
});
</script>




<style scoped>
@import url('https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css');

.dashboard-wrapper {
  margin-left: 240px;
  padding: 32px;
  min-height: 100vh;
  color: #eee;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 8px;
}

p {
  margin: 0 0 24px 0;
  font-size: 16px;
  color: #ccc;
}

.dashboard-summary h2 {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}
.error-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding: 14px 20px;
  background: rgba(255, 85, 85, 0.1);
  color: #ff5555;
  border-left: 4px solid #ff5555;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
}

.error-icon {
  font-size: 20px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.card {
  background: linear-gradient(145deg, #2a2c3b, #1a1c29);
  border-radius: 20px;
  padding: 24px;
  color: #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  position: relative;
  transition: transform 0.2s ease;
  cursor: default;
  overflow: hidden;
}



.label {
  font-size: 14px;
  color: #bbb;
  margin-top: 16px;
}

.value {
  font-size: 28px;
  font-weight: 700;
  margin-top: 4px;
}

/* Loader и blur */
.card.loading {
  filter: blur(4px);
  pointer-events: none;
  user-select: none;
  position: relative;
  color: transparent !important;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 36px;
  height: 36px;
  margin: -18px 0 0 -18px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #3174f4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 10;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;
}



.refresh-btn:hover:not(:disabled) {
  background: linear-gradient(90deg, #255ac2, #1d4db2);
  box-shadow: 0 8px 22px rgba(37, 90, 194, 0.75);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-text {
  font-style: italic;
  opacity: 0.8;
}

.icon-wrap {
  position: absolute;
  top: -16px;
  right: -16px;
  background: #2f3246;
  padding: 16px;
  border-radius: 50%;
  opacity: 0.15;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.card:hover .icon-wrap {
  opacity: 0.3;
}

.icon {
  font-size: 36px;
  color: #fff;
}

.income .icon {
  color: #3174f4;
}
.orders .icon {
  color: #8be9fd;
}
.average .icon {
  color: #f1fa8c;
}
.suppliers .icon {
  color: #bd93f9;
}
.cancel-rate .icon {
  color: #ff5555;
}
.avg-delivery-time .icon {
  color: #ffb86c;
}

.dashboard-footer {
  margin-top: 48px;
  font-size: 14px;
  color: #888;
  text-align: center;
  user-select: none;
}
</style>


<style scoped>
@import url('https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css');

.dashboard-wrapper {
  margin-left: 240px;
  padding: 32px;
  min-height: 100vh;
  color: #eee;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.value.highlighted {
  animation: pulse 1s ease-in-out;
  color: #50fa7b !important;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.6; }
}

h1 {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 8px;
}

p {
  margin: 0 0 24px 0;
  font-size: 16px;
  color: #ccc;
}

.dashboard-summary h2 {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}
.error-message {
  margin-top: 16px;
  padding: 12px 16px;
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
}


.card {
  background: linear-gradient(145deg, #2a2c3b, #1a1c29);
  border-radius: 20px;
  padding: 24px;
  color: #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  position: relative;
  transition: transform 0.2s ease;
  cursor: default;
}


.refresh-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(to right, #3174f4, #255ac2);
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(49, 116, 244, 0.4);
  cursor: pointer;
  transition: all 0.2s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: linear-gradient(to right, #255ac2, #1d4db2);
  box-shadow: 0 6px 20px rgba(37, 90, 194, 0.5);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


.error-message {
  color: #ff5555;
  font-size: 14px;
}

.label {
  font-size: 14px;
  color: #bbb;
  margin-top: 16px;
}

.value {
  font-size: 28px;
  font-weight: 700;
  margin-top: 4px;
}

.icon-wrap {
  position: absolute;
  top: -16px;
  right: -16px;
  background: #2f3246;
  padding: 16px;
  border-radius: 50%;
  opacity: 0.15;
  transition: opacity 0.3s ease;
}

.card:hover .icon-wrap {
  opacity: 0.3;
}

.icon {
  font-size: 36px;
  color: #fff;
}

.income .icon {
  color: #50fa7b;
}
.orders .icon {
  color: #8be9fd;
}

.suppliers .icon {
  color: #bd93f9;
}
.cancel-rate .icon {
  color: #ff5555;
}
.avg-delivery-time .icon {
  color: #ffb86c;
}

.dashboard-footer {
  margin-top: 48px;
  font-size: 14px;
  color: #888;
  text-align: center;
  user-select: none;
}
</style>


<style scoped>
@import url('https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css');

.dashboard-wrapper {
  margin-left: 240px;
  padding: 32px;
  min-height: 100vh;
}

.dashboard-summary h2 {
  color: #fff;
  font-size: 28px;
  margin-bottom: 24px;
  font-weight: 600;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.card {
  background: linear-gradient(145deg, #2a2c3b, #1a1c29);
  border-radius: 20px;
  padding: 24px;
  color: #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease;
}



.label {
  font-size: 14px;
  color: #bbb;
  margin-top: 16px;
}

.value {
  font-size: 26px;
  font-weight: 700;
  margin-top: 4px;
}

.icon-wrap {
  position: absolute;
  top: -16px;
  right: -16px;
  background: #2f3246;
  padding: 16px;
  border-radius: 50%;
  opacity: 0.2;
  transition: opacity 0.3s ease;
}

.card:hover .icon-wrap {
  opacity: 0.3;
}

.icon {
  font-size: 36px;
  color: #fff;
}

.income .icon {
  color: #50fa7b;
}
.orders .icon {
  color: #8be9fd;
}

</style>
