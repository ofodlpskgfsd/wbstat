<template >
  <HeaderHome/>
  <PopularProducts/>
  <Siti/>
  <Stock/>
  <FooterHome/>
</template>

<script>
import HeaderHome from '../components/layout/HeaderHome.vue'
import Stock from '../components/functional/StockList.vue'
import PopularProducts from '../components/functional/OrderDetails.vue'
import Siti from "../components/siti.vue"
import footerHome from '../components/layout/footerHome.vue'

export default {
  components: {HeaderHome,Stock,PopularProducts,Siti,footerHome},
  mounted() {
    if (!localStorage.getItem('authToken')) {
      this.$router.push('/login');
    }
  },
};
</script>
