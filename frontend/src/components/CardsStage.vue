<template v-auto-animate>
  <div class="container">
    <h1 class="txt_Ser">Сервис полезен на всех стадиях <br>развития на<span class="gradient_green_blue">Wildberries</span> </h1>
  <div class="card-container" v-auto-animate>
    <div class="card"  v-for="card in cards" :key="card.id" :class="{ gradient: card.gradient } ">
      <div class="card-content">
        <h2 :class="{ number: card.number }">{{ card.id }}</h2>
        <h3>{{ card.title }}</h3>
        <p :class="{ txt_color: card.black}">{{ card.description }}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          id: '01',
          title: 'Выбор ниши и продукта',
          description: 'Начинаете работать на маркетплейсе или планируете ввести новый продукт? Сервис поможет быстро провести анализ и избежать ошибок на этапе выбора товара.',
          gradient: false,
          number: true,
          black: true,
        },
        {
          id: '02',
          title: 'Уверенный старт',
          description: 'Получите всю информацию о конкурентах и их продуктах, поймете, как выделиться, научитесь торговать на примере лидеров рынка.',

          gradient: true,
          number: false,
          black: false,
        },
        {
          id: '03',
          title: 'Быстрый рост',
          description: 'Получите всю информацию о конкурентах и их продуктах, поймете, как выделиться, научитесь торговать на примере лидеров рынка.',
          gradient: false,
          number: true,
          black: true,
        },
        {
          id: '04',
          title: 'Выход из кризиса',
          description: 'Наши инструменты помогут найти и устранить проблемы роста, найти товары-лидеры.',
          gradient: true,
          number: false,
          black: false,
        },
        {
          id: '05',
          title: 'Эффективное продвижение',
          description: 'Оптимизируйте карточки, обходите конкурентов и занимайте лидирующие позиции с помощью автоматизации внутренней рекламы, SEO и искусственного интеллекта.',
          gradient: false,
          number: true,
          black: true,
        },
        {
          id: '06',
          title: 'Выбор ниши и продукта',
          description: 'Автоматизируйте рутинные процессы и сосредоточьтесь на действительно важных задачах.',
          gradient: false,
          number: true,
          black: true,
        },
      ],
    };
  },
};
</script>

<style scoped>

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}


.card {
  cursor: pointer;
  background-color: white;
  height: 200px;
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

.gradient {
  background: linear-gradient( 120deg,#8981FF, #00FF6F);
  color: white;
}

h1.txt_Ser {
  font-size: 36px;
}

h2 {
  font-size: 24px;
  margin: 10px 0;
}

h3 {
  font-size: 18px;
}

p {
  font-size: 16px;
}



.txt_Ser {
  color: white;
  font-size: 36px;
  padding-bottom: 5%;
}
 .gradient_green_blue {
   padding-left: 1%;
  background-image: linear-gradient(to right,#8981FF, #00FF6F );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.number {
  background-image: linear-gradient(#8981FF, #00FF6F );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.txt_color {
  color: rgb(0,0,0, 64%);
}
@media (max-width: 900px) {
  .card-container {
    grid-template-columns: repeat(2, 1fr); /* Две колонки для планшетов */
    gap: 30px;
  }

  h1.txt_Ser {
    font-size: 28px; /* Уменьшаем размер заголовка для планшетов */
  }

  h2 {
    font-size: 20px; /* Уменьшаем размер заголовка карточки */
  }

  h3 {
    font-size: 18px; /* Уменьшаем размер текста в карточке */
  }
  p {
    font-size: 16px; /* Уменьшаем размер текста в карточке */
  }
}

@media (max-width: 600px) {
  .card {
    height: 150px; /* Высота карточек для мобильных устройств */
  }

  .card-container {
    grid-template-columns: 1fr; /* Одна колонка для мобильных */
    gap: 20px; /* Меньшее расстояние между карточками */
  }

  h1.txt_Ser {
    font-size: 24px; /* Уменьшаем размер заголовка для мобильных */
  }

  h2 {
    font-size: 18px; /* Уменьшаем размер заголовка карточки */
  }

  h3 {
    font-size: 16px; /* Уменьшаем размер текста в карточке */
  }

  p {
    font-size: 14px; /* Уменьшаем размер текста в карточке */
  }
}
</style>