<template>
  <HeaderHome/>
  <div class="container">
    <!-- Селектор городов -->
    <div class="city-select">
      <label for="city">Город:</label>
      <select v-model="selectedCity" id="city">
        <option v-for="city in cities" :key="city" :value="city">
          {{ city.charAt(0).toUpperCase() + city.slice(1) }}
        </option>
      </select>
    </div>

    <div class="table-container" v-if="paginatedRows.length">
      <table>
        <thead>
        <tr>
          <th>Карточка</th>
          <th>Название</th>
          <th>Цена</th>
          <th>Закупочная цена</th>
          <th>Скидка</th>
          <th>Цена со скидкой</th>
          <th>Комиссия %/rub</th>
          <th>Cкорость доставки</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in paginatedRows"
            :key="item.id || item.title"
            class="table-row"
        >
          <td>
            <img
                v-if="item.preview"
                :src="item.preview"
                alt="Preview"
                class="preview-img"
                loading="lazy"
                @click="openModal(item.preview)"
                role="button"
                tabindex="0"
                @keydown.enter="openModal(item.preview)"
                @keydown.space.prevent="openModal(item.preview)"
                title="Кликните для увеличения"
            />
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.price }}₽</td>
          <td>{{ item.purchase_price }}₽</td>
          <td>{{ item.discount }}%</td>
          <td>{{ item.discountedPrice }}₽</td>
          <td>{{ item.commission_proc }}%/{{ item.commission_rub}}₽</td>
          <td>{{ item.Delivery_rate }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="no-data">Данные отсутствуют</div>

    <div v-if="rows.length" class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">← Назад</button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Вперёд →
      </button>
    </div>

    <teleport to="body">
      <div
          v-if="modalVisible"
          class="modal"
          @click.self="closeModal"
          role="dialog"
          aria-modal="true"
      >
        <button
            class="modal-close"
            @click="closeModal"
            aria-label="Закрыть"
            autofocus
        >
          &times;
        </button>
        <img
            :src="modalImage"
            alt="Увеличенное изображение"
            class="modal-image"
        />
      </div>
    </teleport>
  </div>
</template>

<script>
import axios from "axios";
import HeaderHome from "../layout/HeaderHome.vue";

export default {
  components: { HeaderHome },
  data() {
    return {
      cities: ['Астана_Карагандинское_шоссе', 'Атакент', 'shymkent'], // сюда добавляй свои города
      selectedCity: 'astana',
      rows: [],
      currentPage: 1,
      pageSize: 10,
      modalVisible: false,
      modalImage: "",
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
    paginatedRows() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.rows.slice(start, start + this.pageSize);
    },
  },
  watch: {
    selectedCity() {
      this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:3000/api/${this.selectedCity}-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.rows = response.data;
        this.currentPage = 1;
      } catch (error) {
        console.error(`Ошибка загрузки данных для города ${this.selectedCity}:`, error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    openModal(src) {
      this.modalImage = src;
      this.modalVisible = true;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.modalVisible = false;
      this.modalImage = "";
      document.body.style.overflow = "";
    },
  },
};
</script>

<style scoped>
.container {
  padding-left: 260px;
  padding-right: 260px;
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin: 0 auto;
  border-radius: 20px;
  background: linear-gradient(145deg, #1f2235, #2b2f4a);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #e4e6ef;
}
@media (max-width: 1200px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}


.city-select {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
}

.city-select label {
  font-size: 1.1rem;
  color: #e4e6ef;
}

.city-select select {
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  background: #2e324d;
  color: #f1f1f1;
  font-size: 1rem;
  outline: none;
  transition: 0.3s ease;
}

.city-select select:hover {
  background: #3d4163;
}

.table-container {
  overflow-x: auto;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
}

thead {
  background: rgba(30, 35, 60, 0.85);
  color: #ffffff;
}

thead th {
  padding: 16px 20px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  border-bottom: 2px solid #445;
}

tbody tr {
  transition: background-color 0.25s ease;
}

tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

tbody td {
  padding: 14px 20px;
  font-size: 14px;
  color: #dcdce6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.preview-img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 10px;
  cursor: zoom-in;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
}

.preview-img:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
}

.pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  font-weight: 500;
}

.pagination button {
  background: linear-gradient(to right, #5a85f3, #4466dd);
  border: none;
  padding: 10px 24px;
  color: #fff;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease;
}

.pagination button:hover {
  background: linear-gradient(to right, #709eff, #5570f2);
}

.pagination button:disabled {
  background: #44495e;
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
}

.no-data {
  padding: 3rem 0;
  text-align: center;
  font-size: 1.3rem;
  font-style: italic;
  color: #888;
}

/* Модальное окно */
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(15, 15, 25, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-image {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.modal-close {
  position: fixed;
  top: 20px;
  right: 30px;
  background: none;
  border: none;
  font-size: 3rem;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease;
  z-index: 1001;
}

.modal-close:hover {
  color: #ff5555;
}

</style>
