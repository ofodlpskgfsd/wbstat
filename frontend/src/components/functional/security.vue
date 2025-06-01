<template>
  <div class="security-page">
    <HeaderHome />

    <main class="content-wrapper">
      <section class="security-section">
        <h1 class="page-title">Безопасность аккаунта</h1>

        <!-- 2FA блок (ваш уже знакомый) -->
        <div class="two-factor-auth">
          <h3>Двухфакторная аутентификация (2FA)</h3>

          <div v-if="!is2FAEnabled" class="action-block">
            <button class="btn primary" @click="enable2FA">Включить 2FA</button>
          </div>

          <div v-else class="action-block">
            <p class="status">2FA включена.</p>
            <button class="btn danger" @click="disable2FA">Отключить 2FA</button>
          </div>

          <div v-if="qrCode" class="qr-section">
            <p>Отсканируйте QR-код в приложении-генераторе:</p>
            <img :src="qrCode" alt="QR код для 2FA" class="qr-code" />
            <input
                v-model="verificationCode"
                placeholder="Введите код из приложения"
                class="input-code"
            />
            <button class="btn primary" @click="verifyCode">Подтвердить</button>
            <p v-if="error" class="error-message">{{ error }}</p>
          </div>
        </div>

        <!-- Новая секция: Контроль активных сессий -->
        <section class="sessions-section">
          <h3>Активные сессии</h3>
          <p>Управляйте устройствами и сессиями, где вы вошли в систему.</p>

          <table class="sessions-table" v-if="sessions.length">
            <thead>
            <tr>
              <th>Устройство</th>
              <th>IP адрес</th>
              <th>Последняя активность</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="session in sessions" :key="session.id">
              <td>{{ session.device }}</td>
              <td>{{ session.ip }}</td>
              <td>{{ formatDate(session.lastActive) }}</td>
              <td>
                <button
                    class="btn danger small"
                    @click="revokeSession(session.id)"
                    :disabled="session.current"
                    :title="session.current ? 'Текущая сессия' : 'Завершить сессию'"
                >
                  {{ session.current ? 'Текущая' : 'Завершить' }}
                </button>
              </td>
            </tr>
            </tbody>
          </table>

          <p v-else>Нет активных сессий.</p>
        </section>

        <!-- Новая секция: История входов -->
        <section class="login-history-section">
          <h3>История входов</h3>
          <p>Просматривайте недавние попытки входа в аккаунт.</p>

          <ul class="login-history-list" v-if="loginHistory.length">
            <li v-for="entry in loginHistory" :key="entry.id">
              <strong>{{ formatDate(entry.date) }}</strong> —
              {{ entry.ip }} — {{ entry.success ? 'Успешно' : 'Ошибка' }}
            </li>
          </ul>

          <p v-else>История входов пуста.</p>
        </section>
      </section>
    </main>
  </div>
</template>

<script>
import HeaderHome from "../layout/HeaderHome.vue";
import axios from 'axios';

export default {
  components: { HeaderHome },
  data() {
    return {
      is2FAEnabled: false,
      qrCode: null,
      verificationCode: '',
      error: '',
      sessions: [],
      loginHistory: [],
    };
  },
  methods: {
    async enable2FA() {
      try {
        const response = await axios.get('/api/2fa/setup');
        this.qrCode = response.data.qrCode;
        this.error = '';
      } catch {
        this.error = 'Ошибка при создании 2FA';
      }
    },
    async verifyCode() {
      try {
        await axios.post('/api/2fa/verify', { code: this.verificationCode });
        this.is2FAEnabled = true;
        this.qrCode = null;
        this.verificationCode = '';
        this.error = '';
      } catch {
        this.error = 'Неверный код. Попробуйте снова.';
      }
    },
    async disable2FA() {
      try {
        await axios.post('/api/2fa/disable');
        this.is2FAEnabled = false;
        this.error = '';
      } catch {
        this.error = 'Ошибка при отключении 2FA';
      }
    },
    async fetchSessions() {
      try {
        const response = await axios.get('/api/sessions/active');
        this.sessions = response.data.sessions;
      } catch {
        // можно залогировать ошибку или показать сообщение
      }
    },
    async revokeSession(sessionId) {
      try {
        await axios.post('/api/sessions/revoke', { id: sessionId });
        this.sessions = this.sessions.filter(s => s.id !== sessionId);
      } catch {
        alert('Не удалось завершить сессию');
      }
    },
    async fetchLoginHistory() {
      try {
        const response = await axios.get('/api/logins/history');
        this.loginHistory = response.data.history;
      } catch {
        // игнорируем для юзера
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleString();
    }
  },
  mounted() {
    axios.get('/api/2fa/status').then(response => {
      this.is2FAEnabled = response.data.enabled;
    });
    this.fetchSessions();
    this.fetchLoginHistory();
  }
};
</script>

<style scoped>
.security-page {
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  flex-grow: 1;
  padding: 40px 20px;
  max-width: 960px;
  margin: 0 auto;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #0b2248;
  margin-bottom: 40px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.security-section {
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 3px 12px rgb(0 0 0 / 0.12);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #222;
}

/* Сессии */
.sessions-section {
  margin-top: 50px;
}

.sessions-section h3 {
  font-weight: 600;
  font-size: 1.3rem;
  color: #0b2248;
  margin-bottom: 15px;
  text-align: center;
}

.sessions-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.sessions-table th,
.sessions-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
  font-size: 0.95rem;
}

.sessions-table th {
  background-color: #f1f3f5;
  font-weight: 700;
  color: #3b4751;
}

.btn.small {
  padding: 6px 14px;
  font-size: 0.9rem;
  border-radius: 4px;
}

/* История входов */
.login-history-section {
  margin-top: 50px;
  text-align: center;
}

.login-history-section h3 {
  font-weight: 600;
  font-size: 1.3rem;
  color: #0b2248;
  margin-bottom: 15px;
}

.login-history-list {
  list-style: none;
  padding-left: 0;
  font-size: 0.95rem;
  color: #444;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

.login-history-list li {
  padding: 8px 0;
  border-bottom: 1px solid #eaeaea;
}

.login-history-list li strong {
  color: #0b2248;
}
</style>
