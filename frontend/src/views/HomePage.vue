<template >
  <HeaderHome/>
  <Stock/>
  <PopularProducts/>
</template>

<script>
import HeaderHome from '../components/HeaderHome.vue'
import Stock from '../components/StockList.vue'
import PopularProducts from '../components/CampaignList.vue'
export default {
  components: {HeaderHome,Stock,PopularProducts},
  mounted() {
    if (!localStorage.getItem('authToken')) {
      this.$router.push('/login'); // Если нет токена, перенаправляем на страницу логина
    }
  },
};
</script>
