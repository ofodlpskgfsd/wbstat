<template>
  <div class="container">
    <div class="all_cards">
    <h1 class="txt_Ser">С нами зарабатывают</h1>
    <div class="card-container">
      <div class="card" v-for="card in cards" :class="{ black: card.black, gradient: card.gradient} ">
        <div class="card-content"  >
          <h3 :class="{ white_text: card.white_text}">{{ card.title }}</h3>
          <p :class="{ white_text: card.white_text}">{{ card.description }}</p>
          <img :src="card.image" alt="" draggable="false" />
        </div>
      </div>
    </div>
    </div>
  </div>

</template>
<script>
import image1 from '../assets/headphone.png'
import image2 from '../assets/hudi.png'
import image3 from '../assets/sale.png'
export default {
  data() {
    return {
      cards: [
        {
          title: 'Выбор ниши и продукта',
          description: 'Начинаете работать на маркетплейсе или планируете ввести новый продукт? Сервис поможет быстро провести анализ и избежать ошибок на этапе выбора.',
          black: true,
          white_text: false,
          gradient: false,
          image: image1 ,
        },
        {
          id: '02',
          title: 'Уверенный старт',
          description: 'Получите всю информацию о конкурентах и их продуктах, поймете, как выделиться, научитесь торговать на примере лидеров рынка.',
          black: false,
          white_text: true,
          gradient: true,
          image: image2 ,
        },
        {
          id: '03',
          title: 'Быстрый рост',
          description: 'Начинаете работать на маркетплейсе или планируете ввести новый продукт? Сервис поможет быстро провести анализ и избежать ошибок на этапе выбора.',
          black: true,
          white_text: true,
          gradient: false,
          image: image3 ,
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 10%;
}

.card-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 70px;
}

.card {
  cursor: pointer;
  background-color: white;
  height: 400px;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 26px 0 rgba(255, 255, 255, 30%);
  transition: all 0.3s ease;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

h2 {
  font-size: 24px;
  margin: 0;
}

h3 {
  font-size: 20px;
  margin: 5px 0;
}

p {
  font-size: 18px;
  margin: 0;
}

.txt_Ser {
  color: white;
  font-size: 36px;
  padding-bottom: 2%;
}

img {
  width: 300px;
  padding: 10px;
}

p {
  font-weight:400;
}

h3 {
  font-size: 24px;
}

.all_cards {
  height: 80vh;
}

.gradient {
  background: linear-gradient( 120deg,#8981FF, #00FF6F);
  color: white;
}

.black {
  background: rgb(192, 208, 252, 13%);
  color: white;
}
@media (max-width: 600px) {
  .container {
    padding: 10px;
  }

  .all_cards {
    height: auto;
    margin-bottom: 20px;
  }

  .txt_Ser {
    font-size: 24px;
  }

  .card-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .card {
    height: auto;
    padding: 10px;
  }

  h3 {
    font-size: 20px;
  }

  p {
    font-size: 16px;
  }

  img {
    height: auto;
  }
}

</style>