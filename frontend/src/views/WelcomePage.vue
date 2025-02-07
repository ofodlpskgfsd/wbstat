<template xmlns="http://www.w3.org/1999/html">
  <Header/>
  <div class="hello_text" v-auto-animate>
    <img src="../assets/back.png" class="bg_images1" alt="Описание изображения" draggable="false">
    <img src="../assets/planet.png" class="bg_images2" alt="planet" draggable="false">
    <img src="../assets/bg_sale.png" class="bg_images3" alt="sale" draggable="false">
    <h1 class="title">Сервис аналитики <br> <span>и увеличения продаж</span> <br>маркетплейса Wildberries</h1>
    <h2 class="subtitle">Мощный инструмент для управления продажами на маркетплейсах</h2>
    <router-link to="/login">
    <button class="button">Вход</button>
    </router-link>
  </div>
  <cardsStage/>
  <cardsMoney/>
  <tabCompetitors/>
  <TabSale/>
  <reviews/>
  <accordion/>
  <Footer/>
  <auto/>
</template>

<script>
import Header from "../components/Header.vue";
import TabCompetitors from "../components/TabCompetitors.vue";
import CardsStage from "../components/CardsStage.vue";
import CardsMoney from "../components/CardsPlusesService.vue";
import { vAutoAnimate } from '@formkit/auto-animate';
import TabSale from "../components/TabSale.vue";
import accordion from "../components/accordion.vue";
import Footer from "../components/Footer.vue";
import Reviews from "../components/Reviews.vue";
import auto from "../components/auto.vue"

export default {

  components: {Reviews, TabCompetitors, CardsMoney, CardsStage, TabSale, accordion, Footer, Header, auto}
}
</script>

<style scoped>
.bg_images1 {
  position: absolute;
  top: 100px;
  left: 0;
}

.bg_images2 {
  position: absolute;
  top: 300px;
  right: 0;
}

.bg_images3 {
  position: absolute;
  bottom: 0;
  left: 0;
}

.hello_text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.title {
  font-size: 40px;
  color: white;
  margin: 0.5em 0;
}

.subtitle {
  font-size: 20px;
  font-weight: 300;
  color: white;
}

.button {
  padding: 10px 70px;
  font-size: 1em;
  color: white;
  background: linear-gradient(90deg, rgba(0,255,111,1) 0%, rgba(39,90,220,1) 100%);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin: 2rem ;
}

.button:hover {
  background-color: #0056b3;
}

span {
  background: rgb(48, 121, 255, 0.81);
  padding: 0 5px 5px 5px;
  border-radius: 15px;
}

.hello_text {
  height: 90vh;
}

@media (max-width: 768px) {
  .title {
    font-size: 30px;
  }

  .subtitle {
    font-size: 18px;
  }

  .hello_text {
    padding: 20px;
    height: 50vh;
  }
  .bg_images1 {
    display: none;
  }
  .bg_images2 {
    display: none;
  }
  .bg_images3 {
    display: none;
  }
}
</style>