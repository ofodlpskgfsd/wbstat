<template>
  <HeaderHome/>
  <div class="report-container">
    <h2>📊 Статистика карточек товаров</h2>

    <div class="filters">
      <div class="filter-group">
        <label>Период:</label>
        <input type="date" v-model="period.begin" />
        <input type="date" v-model="period.end" />
      </div>

      <div class="filter-group">
        <label>Бренды:</label>
        <input type="text" v-model="brandInput" placeholder="Введите бренды через запятую" />
      </div>

      <div class="filter-group">
        <label>Артикулы (nmIDs):</label>
        <input type="text" v-model="nmIDsInput" placeholder="Введите артикулы через запятую" />
      </div>

      <div class="filter-buttons">
        <button class="btn-primary" @click="fetchReport">Получить отчёт</button>
        <button class="btn-secondary" @click="exportToExcel" :disabled="!filteredData.length">Экспорт в Excel</button>
      </div>
    </div>

    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="paginatedData.length">
      <thead>
      <tr>
        <th>Артикул</th>
        <th>Бренд</th>
        <th>Открытия</th>
        <th>Добавления в корзину</th>
        <th>Заказы</th>
        <th>Сумма заказов (₽)</th>
        <th>Выкупы</th>
        <th>Сумма выкупов (₽)</th>
        <th>Отказы</th>
        <th>Сумма отказов (₽)</th>
        <th>Средняя цена (₽)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in paginatedData" :key="item.nmID">
        <td>{{ item.nmID }}</td>
        <td>{{ item.brandName }}</td>
        <td>{{ item.statistics.selectedPeriod.openCardCount }}</td>
        <td>{{ item.statistics.selectedPeriod.addToCartCount }}</td>
        <td>{{ item.statistics.selectedPeriod.ordersCount }}</td>
        <td>{{ item.statistics.selectedPeriod.ordersSumRub }}</td>
        <td>{{ item.statistics.selectedPeriod.buyoutsCount }}</td>
        <td>{{ item.statistics.selectedPeriod.buyoutsSumRub }}</td>
        <td>{{ item.statistics.selectedPeriod.cancelCount }}</td>
        <td>{{ item.statistics.selectedPeriod.cancelSumRub }}</td>
        <td>{{ item.statistics.selectedPeriod.avgPriceRub }}</td>
      </tr>
      </tbody>
    </table>

    <div v-if="totalPages > 1" class="pagination">
      <button
          class="btn-page"
          :disabled="currentPage === 1"
          @click="goToPage(1)"
      >« Первая</button>

      <button
          class="btn-page"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
      >‹ Предыдущая</button>

      <button
          v-for="page in visiblePages"
          :key="page"
          class="btn-page"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
      >{{ page }}</button>

      <button
          class="btn-page"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
      >Следующая ›</button>

      <button
          class="btn-page"
          :disabled="currentPage === totalPages"
          @click="goToPage(totalPages)"
      >Последняя »</button>
    </div>
  </div>
  <footerHome/>
</template>


<script setup>
import HeaderHome from './layout/HeaderHome.vue'
import footerHome from './layout/footerHome.vue'
import { ref, computed } from 'vue';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const period = ref({
  begin: new Date().toISOString().substr(0, 10),
  end: new Date().toISOString().substr(0, 10),
});
const brandInput = ref('');
const nmIDsInput = ref('');
const reportData = ref([]);
const loading = ref(false);
const error = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

// Фильтрация данных
const filteredData = computed(() => {
  const brandList = brandInput.value.split(',').map(b => b.trim().toLowerCase()).filter(Boolean);
  const nmIDList = nmIDsInput.value.split(',').map(id => id.trim()).filter(Boolean);

  return reportData.value.filter(item => {
    const matchesBrand = !brandList.length || brandList.includes(item.brandName.toLowerCase());
    const matchesNmID = !nmIDList.length || nmIDList.includes(String(item.nmID));
    return matchesBrand && matchesNmID;
  });
});

// Пагинация данных
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredData.value.slice(start, start + itemsPerPage);
});

// Отображение максимум 5 страниц рядом с текущей
const visiblePages = computed(() => {
  const pages = [];
  let start = Math.max(1, currentPage.value - 2);
  let end = Math.min(totalPages.value, currentPage.value + 2);

  if (end - start < 4) {
    if (start === 1) {
      end = Math.min(totalPages.value, start + 4);
    } else if (end === totalPages.value) {
      start = Math.max(1, end - 4);
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

const fetchReport = async () => {
  loading.value = true;
  error.value = '';
  try {
    const response = await axios.post(
        'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail',
        {
          brandNames: brandInput.value ? brandInput.value.split(',').map(b => b.trim()) : [],
          objectIDs: [],
          tagIDs: [],
          nmIDs: nmIDsInput.value ? nmIDsInput.value.split(',').map(id => parseInt(id.trim())) : [],
          timezone: 'Europe/Moscow',
          period: {
            begin: `${period.value.begin} 00:00:00`,
            end: `${period.value.end} 23:59:59`,
          },
          page: 1,
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_WB_API_KEY,
            'Content-Type': 'application/json',
          },
        }
    );
    reportData.value = response.data.data.cards;
    currentPage.value = 1;
  } catch (err) {
    error.value = 'Ошибка при получении данных';
  } finally {
    loading.value = false;
  }
};

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(filteredData.value.map(item => ({
    Артикул: item.nmID,
    Бренд: item.brandName,
    Открытия: item.statistics.selectedPeriod.openCardCount,
    'Добавления в корзину': item.statistics.selectedPeriod.addToCartCount,
    Заказы: item.statistics.selectedPeriod.ordersCount,
    'Сумма заказов (₽)': item.statistics.selectedPeriod.ordersSumRub,
    Выкупы: item.statistics.selectedPeriod.buyoutsCount,
    'Сумма выкупов (₽)': item.statistics.selectedPeriod.buyoutsSumRub,
    Отказы: item.statistics.selectedPeriod.cancelCount,
    'Сумма отказов (₽)': item.statistics.selectedPeriod.cancelSumRub,
    'Средняя цена (₽)': item.statistics.selectedPeriod.avgPriceRub,
  })));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Отчёт');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, 'report.xlsx');
};
</script>


<style scoped>
.report-container {
  margin: 10px 30px 30px 270px;
  padding: 30px;
  font-family: 'Inter', sans-serif;
  color: white;
  background: #2a2c3d;
  border-radius: 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

h2 {
  font-size: 26px;
  margin-bottom: 20px;
  color: #ffffff;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 24px;
  background-color: #2a2a3d;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
}

.filter-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}

.filters label {
  font-weight: 500;
  margin-right: 5px;
  color: #cfcfff;
  white-space: nowrap;
}

.filters input {
  padding: 8px 10px;
  border: 1px solid #55557d;
  border-radius: 6px;
  background-color: #3a3a57;
  color: #ffffff;
  min-width: 180px;
}

.filters input::placeholder {
  color: #a0a0c0;
}


table {
  width: 100%;
  border-collapse: collapse;
  background-color: #2c2c3e;
  border-radius: 10px;
  overflow: hidden;
}

thead {
  background-color: #343454;
}

table th,
table td {
  padding: 12px 14px;
  border-bottom: 1px solid #3c3c55;
  text-align: center;
  color: #f0f0ff;
}

table tr:hover {
  background-color: #38385a;
}

.error {
  color: #ff6b6b;
  margin-bottom: 10px;
}

.vue-awesome-paginate {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 32px auto 0;
  flex-wrap: wrap;
}

.vue-awesome-paginate .paginate-buttons {
  background-color: #3b3b5c;
  color: #fff;
  border: 1px solid #50507a;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  min-width: 40px;
  text-align: center;
}

.vue-awesome-paginate .paginate-buttons:hover {
  background-color: #5c5cb8;
  transform: scale(1.05);
}

.vue-awesome-paginate .active-page {
  background-color: #7c5cff;
  border-color: #7c5cff;
  font-weight: bold;
  box-shadow: 0 0 8px #7c5cff55;
}

@media screen and (max-width: 1024px) {
  .report-container {
    padding: 20px;
    margin-left: 0;
    margin-right: 0;
  }

  .filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .filters input {
    width: 100%;
  }

  table th,
  table td {
    font-size: 12px;
    padding: 8px;
  }

  h2 {
    font-size: 20px;
  }
}

@media screen and (max-width: 600px) {
  .filters input {
    min-width: unset;
    width: 100%;
  }

  .filters label {
    margin-top: 8px;
  }

  .filters {
    gap: 6px;
    padding: 15px;
  }

  table {
    font-size: 12px;
    overflow-x: auto;
  }

  .vue-awesome-paginate {
    gap: 6px;
    font-size: 13px;
  }

  .vue-awesome-paginate .paginate-buttons {
    padding: 6px 10px;
  }
}
.filter-buttons button {
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.25s ease;
  min-width: 140px;
}

.btn-primary {
  background-color: #7c5cff;
  color: #fff;
  box-shadow: 0 0 10px #7c5cffaa;
}

.btn-primary:hover:not(:disabled) {
  background-color: #6a4fff;
}

.btn-secondary {
  background-color: #55557d;
  color: #ccc;
}

.btn-secondary:disabled {
  background-color: #444466;
  cursor: not-allowed;
  color: #8888aa;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #6a6aba;
  color: white;
}

.pagination {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-page {
  background-color: #3b3b5c;
  color: #f0f0ff;
  border: 1px solid #50507a;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  min-width: 48px;
  user-select: none;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.btn-page:hover:not(:disabled) {
  background-color: #5c5cb8;
  transform: scale(1.1);
}

.btn-page:disabled {
  background-color: #2f2f4a;
  color: #7a7aa0;
  cursor: not-allowed;
  transform: none;
}

.btn-page.active {
  background-color: #7c5cff;
  border-color: #7c5cff;
  box-shadow: 0 0 10px #7c5cffbb;
  cursor: default;
  transform: none;
}
.filters input:focus {
  outline: none;
  border-color: #7c5cff;      /* Акцентный фиолетовый */
  box-shadow: 0 0 8px #7c5cff88;
  background-color: #404070;  /* Немного темнее для контраста */
  color: #ffffff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}


</style>
