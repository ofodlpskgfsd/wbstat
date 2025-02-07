<script setup>
import { ref } from "vue";

const orders = ref([]);
const loading = ref(false);
const error = ref(null);
const dateFrom = ref(new Date().toISOString().split("T")[0]);

const fetchOrders = async () => {
  loading.value = true;
  error.value = null;
  orders.value = [];

  const apiKey = import.meta.env.VITE_WB_API_KEY;

  if (!apiKey) {
    error.value = "🚨 API-ключ не найден! Проверь .env файл.";
    loading.value = false;
    return;
  }

  const url = `https://statistics-api.wildberries.ru/api/v1/supplier/orders?dateFrom=${encodeURIComponent(dateFrom.value)}&flag=0`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    orders.value = data;
    console.log("✅ Полученные заказы:", data);
  } catch (err) {
    console.error("❌ Ошибка при получении заказов:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const getStatusText = (isCancel) => (isCancel ? "Отменён" : "В обработке");

const formatDate = (isoDate) => {
  if (!isoDate) return "Не указано";
  const date = new Date(isoDate);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<template>
  <div class="container">
    <h3 class="title">📦 Все данные по заказам</h3>

    <label for="datePicker">Выбрать дату:</label>
    <input id="datePicker" type="date" v-model="dateFrom" class="date-picker" />

    <button @click="fetchOrders" :disabled="loading" class="btn">
      🔄 {{ loading ? "Загружаем..." : "Загрузить заказы" }}
    </button>

    <p v-if="error" class="status error">{{ error }}</p>

    <div v-if="orders.length > 0" class="orders-list">
      <div v-for="order in orders" :key="order.srid" class="order-item">
        <div class="order-header">
          <p><strong>Заказ №:</strong> {{ order.srid }}</p>
          <p class="status-badge" :class="{ canceled: order.isCancel }">
            {{ getStatusText(order.isCancel) }}
          </p>
        </div>

        <p><strong>Дата оформления:</strong> {{ formatDate(order.date) }}</p>
        <p><strong>Изменён:</strong> {{ formatDate(order.lastChangeDate) }}</p>
        <p><strong>Отмена (если была):</strong> {{ formatDate(order.cancelDate) }}</p>
        <p><strong>Бренд:</strong> {{ order.brand }}</p>
        <p><strong>Категория:</strong> {{ order.category }}</p>
        <p><strong>Наименование:</strong> {{ order.subject }}</p>
        <p><strong>Склад:</strong> {{ order.warehouseName }} ({{ order.warehouseType }})</p>
        <p><strong>Регион:</strong> {{ order.regionName }}</p>
        <p><strong>Цена без скидки:</strong> {{ order.totalPrice }} ₽</p>
        <p><strong>Цена со скидкой:</strong> {{ order.priceWithDisc }} ₽</p>
        <p><strong>Финальная цена:</strong> {{ order.finishedPrice }} ₽</p>
        <p><strong>Скидка:</strong> {{ order.discountPercent }}%</p>
        <p><strong>СПП:</strong> {{ order.spp }}%</p>
        <p><strong>Тип заказа:</strong> {{ order.orderType }}</p>
        <p><strong>Реализация:</strong> {{ order.isRealization ? "Да" : "Нет" }}</p>
        <p><strong>Поставка:</strong> {{ order.isSupply ? "Да" : "Нет" }}</p>
        <p><strong>Отменён:</strong> {{ order.isCancel ? "Да" : "Нет" }} ({{ formatDate(order.cancelDate) }})</p>

        <div class="image-container">
          <img :src="'https://basket-10.wb.ru/vol' + Math.floor(order.nmId / 100000) + '/part' + Math.floor(order.nmId / 1000) + '/' + order.nmId + '/images/c516x688.jpg'"
               alt="Изображение товара" class="product-image" />
        </div>
      </div>
    </div>

    <p v-else class="status">Нет заказов для отображения</p>
  </div>
</template>


<style scoped>
.container {
  max-width: 700px;
  margin: 50px auto;
  padding: 20px;
  background: #1e1e2f;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 22px;
  color: #ffffff;
  margin-bottom: 15px;
}

.date-picker {
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
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

.error {
  color: #ff5252;
}

.orders-list {
  margin-top: 20px;
  text-align: left;
}

.order-item {
  background: #2e2e3e;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
}

.order-item:hover {
  transform: scale(1.03);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-badge {
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  background: #ff5252;
}

.status-badge.canceled {
  background: #ff9800;
}

.image-container {
  text-align: center;
  margin-top: 10px;
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
</style>
