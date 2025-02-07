<template>
  <div class="under-construction">
    <div class="content">
      <button @click="goBack" class="back-button">← Назад</button>
      <h1>🚧 Страница в разработке 🚧</h1>
      <p>Мы усердно работаем над этим разделом. Скоро здесь появится полезный контент!</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router ? this.$router.back() : window.history.back();
    }
  }
};
</script>

<style scoped>
.under-construction {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
  padding: 20px;
}

.content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

h1 {
  color: #3079FF;
  font-size: 28px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  color: #555;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #3079FF;
  font-weight: bold;
  transition: 0.3s;
}

.back-button:hover {
  color: #205ecf;
}
</style>
