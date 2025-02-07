<template>
  <div class="chatbot-container">
    <div class="chatbot-button pulse" @click="toggleChat">💬</div>

    <transition name="fade">
      <div v-if="isOpen" class="chatbot-window">
        <div class="chatbot-header">
          <span>Чат-помощник</span>
          <button class="close-btn" @click="closeChat">✖</button>
        </div>
        <div class="chatbot-messages" ref="messageContainer" @click.self="closeChat">
          <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.type]">
            <span v-if="msg.type === 'suggestion'" class="suggestion" @click="sendMessage(msg.text)">
              🔹 {{ msg.text }}
            </span>
            <span v-else>{{ msg.text }}</span>
          </div>
        </div>
        <div class="chatbot-input">
          <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Напишите ваш вопрос..." />
          <button @click="sendMessage">➤</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      userMessage: '',
      messages: [{ text: 'Привет! Я ваш помощник по аналитике Wildberries. Чем могу помочь?', type: 'bot' }],
      responses: {
        "поддержка": "Наш сервис аналитики Wildberries бесплатный. Если у вас есть вопросы, пишите в поддержку в ЛК.",
        "цены": "Цена нашего сервиса — 0 рублей. Все инструменты аналитики доступны бесплатно.",
        "конкуренты": "Мы анализируем конкурентов по ценам, продажам и стратегиям продвижения.",
        "анализ": "Наш сервис собирает данные через WB API, анализирует продажи и дает полезные рекомендации.",
        "автоматизация": "Наш AI-ассистент помогает автоматически формировать закупки и анализировать рынок.",
        "продажи": "Вы можете отслеживать динамику продаж, изменения спроса и ключевые тренды в нашем сервисе.",
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.isOpen = true;
    }, 30000); // Автооткрытие через 30 секунд
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
    },
    closeChat() {
      this.isOpen = false;
    },
    sendMessage(message = null) {
      if (message instanceof Event) {
        message = this.userMessage.trim();
      }
      if (!message) return;

      this.messages.push({ text: message, type: 'user' });

      let lowerMessage = message.toLowerCase();
      let response = this.responses[lowerMessage];

      if (response) {
        this.messages.push({ text: response, type: 'bot' });
      } else {
        this.messages.push({ text: "Я пока не знаю ответа на этот вопрос. Но могу ответить на:", type: 'bot' });
        this.showAvailableQuestions();
      }

      this.userMessage = '';
      this.scrollToBottom();
    },
    showAvailableQuestions() {
      Object.keys(this.responses).forEach(question => {
        this.messages.push({ text: question, type: 'suggestion' });
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
      });
    }
  }
}
</script>

<style scoped>
/* Основной контейнер */
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 9999;
}

/* Кнопка чата */
.chatbot-button {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00b4db, #0083b0);
  color: white;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 5px rgba(0, 180, 219, 0.3); }
  50% { transform: scale(1.05); box-shadow: 0 0 10px rgba(0, 180, 219, 0.5); }
  100% { transform: scale(1); box-shadow: 0 0 5px rgba(0, 180, 219, 0.3); }
}

/* Окно чата */
.chatbot-window {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 360px;
  background: #002f4b;
  color: white;
  border-radius: 14px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chatbot-header {
  background: linear-gradient(135deg, #00b4db, #0083b0);
  padding: 14px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.chatbot-messages {
  padding: 12px;
  height: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.message {
  padding: 10px 14px;
  margin-bottom: 10px;
  border-radius: 12px;
  max-width: 80%;
  font-size: 14px;
}

.user { align-self: flex-end; background: #00b4db; }
.bot { align-self: flex-start; background: #0083b0; }

.suggestion {
  cursor: pointer;
  color: #00b4db;
  text-decoration: underline;
}

.suggestion:hover { color: #ffffff; }

.chatbot-input {
  display: flex;
  padding: 12px;
  background: #001f3f;
}

.chatbot-input input {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  outline: none;
}

.chatbot-input button {
  background: #00b4db;
  color: white;
  border: none;
  padding: 12px;
  margin-left: 12px;
  border-radius: 8px;
  cursor: pointer;
}

/* 📱 Мобильная адаптация */
@media (max-width: 600px) {
  .chatbot-window {
    width: 95%;
    bottom: 20px;
    right: 2.5%;
  }

  .chatbot-messages { height: 250px; }

  .chatbot-button { width: 50px; height: 50px; font-size: 24px; }
}
</style>
