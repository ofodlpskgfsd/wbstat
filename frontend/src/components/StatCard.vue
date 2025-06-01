<!-- StatCard.vue -->
<template>
  <div class="stat-card" :class="cardTypeClass">
    <div class="stat-card-header">
      <h3>{{ title }}</h3>
    </div>
    <div class="stat-card-body">
      <p class="value">{{ value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,     // Заголовок для карточки
    value: [String, Number], // Значение для карточки
    type: {            // Тип для карточки (success, danger, info)
      type: String,
      default: "info",
    },
  },
  computed: {
    cardTypeClass() {
      return {
        success: this.type === 'success',
        danger: this.type === 'danger',
        info: this.type === 'info',
      };
    }
  },
};
</script>

<style scoped>
.stat-card {
  background-color: #333;
  color: #fff;
  border-radius: 8px;
  padding: 15px;
  width: 200px;
  text-align: center;
}

.stat-card-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.stat-card-body {
  font-size: 22px;
  margin-top: 10px;
}

.value {
  font-size: 24px;
}

.stat-card.success {
  background-color: #4CAF50; /* Зеленый для успеха */
}

.stat-card.danger {
  background-color: #f44336; /* Красный для ошибок */
}

.stat-card.info {
  background-color: #2196F3; /* Синий для информации */
}
</style>
