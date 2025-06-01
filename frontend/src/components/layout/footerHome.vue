<template>
  <footer class="footer">
    <div class="footer__bottom">
      © {{ new Date().getFullYear() }} WbStat. Все права защищены.
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");

function clearSearch() {
  searchQuery.value = "";
}

function onSearch() {
  alert(`Ищем по сайту: "${searchQuery.value}"`);
}
</script>

<style scoped>
.footer {
  margin-left: 220px;
  color: #cbd5e1;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 32px 20px 16px;
  user-select: none;
}

.footer__bottom {
  margin-top: 32px;
  text-align: center;
  font-size: 13px;
  color: #64748b;
  border-top: 1px solid #334155;
  padding-top: 16px;
  user-select: none;
}

/* Responsive */

@media (max-width: 768px) {
  .footer__container {
    flex-direction: column;
    padding-left: 20px;
    gap: 24px;
    align-items: flex-start;
  }

  .footer__search-wrapper {
    width: 100%;
  }
}
</style>
