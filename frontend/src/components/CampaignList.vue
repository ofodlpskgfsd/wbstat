<template>
  <div class="container">
    <h3 class="title">📊 Список рекламных кампаний</h3>

    <!-- Загрузка или ошибка -->
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Список кампаний -->
    <div v-if="campaigns.length > 0" class="campaign-list">
      <div v-for="(campaign, index) in campaigns" :key="index" class="campaign-card" @click="showCampaignStats(campaign)">
        <h4>{{ campaign.name }} (ID: {{ campaign.advertId }})</h4>
        <p>Тип: {{ campaign.typeName }}</p>
        <p>Статус: {{ getStatusName(campaign.status) }}</p>
        <p>Количество кампаний: {{ campaign.count }}</p>
        <p>Последняя обновленная кампания: {{ formatDate(campaign.changeTime) }}</p>
      </div>
    </div>

    <!-- Сообщение при отсутствии данных -->
    <div v-else class="no-data">Нет данных для отображения.</div>

    <!-- Статистика кампании (по клику) -->
    <div v-if="selectedCampaign" class="campaign-details">
      <h4>Статистика кампании: ID {{ selectedCampaign.advertId }}</h4>
      <CampaignDetails :campaignId="selectedCampaign.advertId" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import CampaignDetails from './CampaignDetails.vue';  // Импорт компонента CampaignDetails

dayjs.extend(localizedFormat);
dayjs.locale('ru');

const apiKey = import.meta.env.VITE_WB_API_KEY;

const campaigns = ref([]);
const loading = ref(false);
const error = ref(null);
const selectedCampaign = ref(null);

// Функция для получения статуса кампании
const getStatusName = (status) => {
  const statuses = {
    '-1': 'Кампания в процессе удаления',
    '4': 'Готова к запуску',
    '7': 'Завершена',
    '8': 'Отказалась',
    '9': 'Идут показы',
    '11': 'На паузе',
  };
  return statuses[status] || 'Неизвестный статус';
};

// Функция для форматирования дат
const formatDate = (date) => {
  return dayjs(date).format('D MMMM YYYY, HH:mm');
};

// Функция для загрузки списка рекламных кампаний
const fetchCampaigns = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch('https://advert-api.wildberries.ru/adv/v1/promotion/count', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка при загрузке кампаний. Статус: ${response.status}`);
    }

    const data = await response.json();
    if (data.adverts && Array.isArray(data.adverts)) {
      campaigns.value = data.adverts.map(campaign => ({
        type: campaign.type,
        status: campaign.status,
        count: campaign.count,
        name: campaign.name || 'Без названия',
        advertId: campaign.advert_list[0].advertId,
        changeTime: campaign.advert_list[0].changeTime,
        typeName: getTypeName(campaign.type),
      }));
    } else {
      throw new Error('Неверный формат данных');
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Функция для получения типа кампании
const getTypeName = (type) => {
  const types = {
    '4': 'Кампания в каталоге',
    '5': 'Кампания в карточке товара',
    '6': 'Кампания в поиске',
    '7': 'Кампания в рекомендациях',
    '8': 'Автоматическая кампания',
    '9': 'Аукцион',
  };
  return types[type] || 'Неизвестный тип';
};

// Функция для выбора кампании и отображения статистики
const showCampaignStats = (campaign) => {
  selectedCampaign.value = campaign;
};

// Загружаем кампании при монтировании компонента
onMounted(fetchCampaigns);
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

.campaign-card {
  background: #3a3e5c;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background 0.3s;
}

.campaign-card:hover {
  background: #4c5580;
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

.campaign-details {
  margin-top: 30px;
}
</style>
