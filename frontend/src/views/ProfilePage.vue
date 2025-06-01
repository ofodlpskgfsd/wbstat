<template>
  <HeaderHome />
  <div class="profile-page">
    <h2 class="profile-title">Личный кабинет</h2>
    <div class="profile-container">
      <div class="profile-info">
        <h3 class="section-subtitle">Личные данные</h3>
        <div v-if="user" class="user-details">
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Имя:</strong> {{ user.name }}</p>
          <p><strong>Телефон:</strong> {{ user.phone }}</p>
        </div>
        <div v-else>
          <p>Загрузка...</p>
        </div>
      </div>

      <div class="api-key-section">
        <h3>Настройки API</h3>

        <div v-if="!editMode">
          <div v-if="user" class="user-details api-key-box">
            <p>
              <strong>API ключ:</strong>
              <span class="masked-key">{{ maskedApiKey }}</span>
              <BaseButton @click="copyApiKey" btnClass="btn-secondary" class="copy-key-btn">
                Скопировать
              </BaseButton>
            </p>
          </div>
          <BaseButton @click="enableEdit" btnClass="btn-primary" class="edit-btn">
            Редактировать
          </BaseButton>
        </div>

        <div v-else>
          <BaseInput
              v-model="apiKey"
              placeholder="Введите новый API Key"
              class="api-key-input large-input"
          />
          <BaseButton @click="saveApiKey" btnClass="btn-primary" class="save-btn">
            Сохранить
          </BaseButton>
          <BaseButton @click="cancelEdit" btnClass="btn-secondary" class="cancel-btn">
            Отмена
          </BaseButton>
        </div>
      </div>
    </div>
    <button @click="logout" class="logout-btn logout-standalone">Выйти</button>
  </div>
  <footerHome/>
</template>

<script>
import axios from "axios";
import BaseButton from '../components/UI/BaseButton.vue';
import BaseInput from '../components/UI/BaseInput.vue';
import HeaderHome from "../components/layout/HeaderHome.vue";
import footerHome from '../components/layout/footerHome.vue'

export default {
  components: { HeaderHome, BaseButton, BaseInput, footerHome },
  data() {
    return {
      user: null,
      apiKey: "",
      editMode: false,
    };
  },
  computed: {
    maskedApiKey() {
      return this.user?.apiKey ? this.user.apiKey.slice(0, 4) + "••••••••••" : "";
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:3000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.user = response.data;
      this.apiKey = this.user.apiKey;
    } catch (error) {
      console.error("Ошибка загрузки профиля:", error);
    }
  },
  methods: {
    async saveApiKey() {
      try {
        const token = localStorage.getItem("authToken");
        await axios.patch(
            "http://localhost:3000/api/profile/api-key",
            { apiKey: this.apiKey },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        this.user.apiKey = this.apiKey;
        this.editMode = false;
      } catch (error) {
        console.error("Ошибка сохранения API ключа:", error);
      }
    },
    logout() {
      localStorage.removeItem("authToken");
      this.$router.push("/login");
    },
    enableEdit() {
      this.editMode = true;
      this.apiKey = this.user.apiKey;
    },
    cancelEdit() {
      this.editMode = false;
      this.apiKey = this.user.apiKey;
    },
    async copyApiKey() {
      try {
        await navigator.clipboard.writeText(this.user.apiKey);
        alert("API ключ скопирован в буфер обмена");
      } catch (err) {
        console.error("Не удалось скопировать API ключ", err);
      }
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

.profile-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: rgb(36, 40, 54);
}

.profile-title {
  font-size: 32px;
  color: #a8c0ff;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.profile-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: calc(100% - 250px);
  border-radius: 16px;
  padding: 40px;
  overflow-wrap: break-word;
  word-break: break-word;
  box-sizing: border-box;
  margin-left: 250px;
  background: #2a2c3d;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.profile-info {
  flex: 1;
  margin-right: 40px;
}

.user-details {
  background-color: #343753;
  border: 1px solid #4a4f7a;
  box-shadow: 0 3px 8px rgba(0, 0, 50, 0.2);
  border-radius: 12px;
  padding: 24px 28px;
  animation: fadeIn 0.4s ease-in-out;
  transition: all 0.3s ease;
}

.user-details p {
  font-size: 17px;
  margin: 12px 0;
  line-height: 1.6;
  color: #c7cdfa;
}
.user-details strong {
  display: inline-block;
  width: 90px;
  color: #8fa0ff;
  font-weight: 600;
}

.section-subtitle {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
}

.profile-info h2,
.section-subtitle,
.api-key-section h3 {
  color: #d0d9ff;
}

.api-key-section {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.api-key-section h3 {
  font-size: 22px;
  color: #ffffff;
  margin-bottom: 20px;
  font-weight: 600;
}

.api-key-input.large-input {
  padding: 20px 24px;
  font-size: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  width: 100%;
  background-color: #41466b;
  border: 2px solid #5a6dff;
  color: #d0d9ff;
  transition: all 0.3s ease;
}

.api-key-input.large-input:focus {
  outline: none;
  border-color: #7a8aff;
  box-shadow: 0 0 10px rgba(122, 138, 255, 0.9);
  background-color: #505f9e;
  color: #fff;
}

.cancel-btn {
  background-color: #999;
  color: #fff;
  margin-top: 5px;
  width: 100%;
}

.cancel-btn:hover {
  background-color: #777;
}

.api-key-input {
  padding: 10px 14px;
  font-size: 16px;
  border-radius: 8px;
  margin-bottom: 15px;
  width: 100%;
  transition: all 0.3s ease;
  background-color: #41466b;
  border: 2px solid #5a6dff;
  color: #d0d9ff;
}

.api-key-input:focus {
  outline: none;
  border-color: #7a8aff;
  box-shadow: 0 0 8px rgba(122, 138, 255, 0.8);
  background-color: #505f9e;
  color: #fff;
}

.edit-btn, .save-btn, .logout-btn {
  padding: 14px 22px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
  margin-bottom: 15px;
  width: 100%;
  min-width: 150px;
  background-color: #5a6dff;
  color: #f0f4ff;
}

.edit-btn:hover, .save-btn:hover, .logout-btn:hover {
  background-color: #3949ff;
}

.edit-btn:focus, .save-btn:focus, .logout-btn:focus {
  outline: none;
}

.logout-btn {
  background-color: #ff5566;
}

.logout-btn:hover {
  background-color: #e03f4f;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
    padding: 20px;
  }
  .profile-info, .api-key-section {
    margin-right: 0;
    margin-bottom: 20px;
  }
  .profile-title {
    font-size: 28px;
  }
  .edit-btn, .save-btn, .logout-btn {
    font-size: 16px;
    padding: 12px 18px;
  }
}

.api-key-box {
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 20px;
  position: relative;
  background-color: #2e3150;
  border: 2px dashed #8a95d8;
}

.masked-key {
  font-family: 'Courier New', monospace;
  padding: 6px 10px;
  border-radius: 6px;
  margin-left: 10px;
  background-color: #5b6dc1;
  color: #e1e7ff;
  font-size: 16px;
}

.logout-standalone {
  margin-top: 30px;
  width: 200px;
  align-self: center;
}

.copy-key-btn {
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.3s ease;
  background-color: #d0d9ff;
  color: #3949ff;
  border: 1px solid #7a8aff;
  box-shadow: 0 2px 6px rgba(58, 70, 255, 0.3);
}

.copy-key-btn:hover {
  transform: translateY(-1px);
  background-color: #aabaff;
  color: white;
}

.copy-key-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(90, 109, 255, 0.6);
}
</style>
