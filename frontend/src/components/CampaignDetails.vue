<template>
  <div class="container">
    <h3 class="title">📊 Статистика по ключевым словам для кампании</h3>

    <!-- Загрузка или ошибка -->
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Таблица статистики по ключевым словам -->
    <div v-if="keywords.length > 0" class="keywords-table">
      <table>
        <thead>
        <tr>
          <th>Ключевое слово</th>
          <th>Просмотры</th>
          <th>Клики</th>
          <th>CTR (%)</th>
          <th>CPC (₽)</th>
          <th>Затраты (₽)</th>
          <th>Добавления в корзину</th>
          <th>Заказы</th>
          <th>CR (%)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(keyword, index) in keywords" :key="index">
          <td>{{ keyword.word }}</td>
          <td>{{ keyword.views }}</td>
          <td>{{ keyword.clicks }}</td>
          <td>{{ keyword.ctr }}</td>
          <td>{{ keyword.cpc }}</td>
          <td>{{ keyword.sum }}</td>
          <td>{{ keyword.basket }}</td>
          <td>{{ keyword.orders }}</td>
          <td>{{ keyword.cr }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Сообщение при отсутствии данных -->
    <div v-else class="no-data">Нет данных для ключевых слов.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const apiKey = import.meta.env.VITE_WB_API_KEY;
const campaignId = 21184552;  // Подставляем ID кампании
const keywords = ref([]);
const loading = ref(false);
const error = ref(null);

// Функция для загрузки статистики по ключевым словам
const fetchKeywordsStats = async () => {
  if (!campaignId) return;

  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(`https://advert-api.wildberries.ru/adv/v1/stat/words?id=${campaignId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`Ошибка при загрузке данных. Статус: ${response.status}`);

    const data = await response.json();

    console.log('API Response:', data);  // Лог для отладки

    if (data && data.words) {
      keywords.value = data.words;
    } else {
      throw new Error('Нет данных для ключевых слов');
    }
  } catch (err) {
    console.error(err);  // Лог ошибки для отладки
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Загружаем данные при монтировании компонента
onMounted(fetchKeywordsStats);
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 50px auto;
  padding: 30px;
  background: #2b2d42;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #f0f0f0;
}

.title {
  font-size: 26px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 30px;
}

.keywords-table table {
  width: 100%;
  border-collapse: collapse;
}

.keywords-table th, .keywords-table td {
  padding: 10px;
  text-align: left;
}

.keywords-table th {
  background-color: #3a3e5c;
  color: #ffffff;
}

.keywords-table td {
  background-color: #f0f0f0;
}

.no-data {
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
}

.loading, .error {
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
}
</style>
