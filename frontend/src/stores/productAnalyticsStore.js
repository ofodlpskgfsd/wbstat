import { defineStore } from 'pinia';
import axios from 'axios';

const token = import.meta.env.VITE_WB_API_KEY;

function createReadableError(err) {
    if (err.response) {
        switch (err.response.status) {
            case 429: return new Error('⏱ Слишком много запросов. Попробуйте позже.');
            case 401: return new Error('🔒 Неверный API-ключ.');
            case 500: return new Error('💥 Сервер Wildberries не справился. Попробуйте позже.');
            default: return new Error(`🚨 Ошибка ${err.response.status}: ${err.response.statusText}`);
        }
    } else if (err.request) {
        return new Error('📡 Сервер не ответил. Проверьте интернет.');
    } else {
        return new Error(err.message || 'Неизвестная ошибка');
    }
}

async function fetchAnalyticsAPI(params, retries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const { data } = await axios.post(
                'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail',
                params,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                }
            );
            if (data.error) {
                throw new Error(data.errorText || 'Ошибка от Wildberries');
            }
            return data.data;
        } catch (err) {
            if (attempt === retries) throw createReadableError(err);
            await new Promise(res => setTimeout(res, delay * attempt));
        }
    }
}

export const useProductAnalyticsStore = defineStore('productAnalytics', {
    state: () => ({
        cards: [],
        isNextPage: false,
        isLoading: false,
        errorMessage: '',
        page: 1,
        isLoaded: false,
        lastParams: null,
    }),
    actions: {
        async fetchAnalytics(params, force = false) {
            console.log('[fetchAnalytics] Вызов с params:', params, 'force:', force);

            const paramsString = JSON.stringify(params);
            const lastParamsString = JSON.stringify(this.lastParams);

            // Если параметры совпадают, кроме номера страницы, то force нужен для обновления
            // Проверяем отдельно page
            const isSameParamsExceptPage = (() => {
                if (!this.lastParams) return false;
                const { page: lastPage, ...lastRest } = this.lastParams;
                const { page, ...currentRest } = params;
                return JSON.stringify(lastRest) === JSON.stringify(currentRest);
            })();

            // Логика добавления или перезаписи
            if (!force && isSameParamsExceptPage && params.page > 1) {
                // Добавляем данные к уже существующим
            } else if (!force && paramsString === lastParamsString) {
                console.log('[fetchAnalytics] Используем кэшированные данные, запрос пропущен');
                return;
            } else {
                // force или новые параметры — перезапись
                this.cards = [];
            }

            this.isLoading = true;
            this.errorMessage = '';

            try {
                const data = await fetchAnalyticsAPI(params);

                if (params.page && params.page > 1) {
                    // Добавляем новые карточки к уже существующим
                    this.cards = [...this.cards, ...(data.cards || [])];
                } else {
                    // Перезаписываем при page=1
                    this.cards = data.cards || [];
                }

                this.isNextPage = data.isNextPage || false;
                this.page = data.page || params.page || 1;
                this.isLoaded = true;
                this.lastParams = { ...params };

                console.log('[fetchAnalytics] Данные загружены, всего cards:', this.cards.length);
            } catch (e) {
                this.errorMessage = e.message;
                // При ошибке данные не чистим, чтобы не потерять ранее загруженные
                this.isNextPage = false;
                this.isLoaded = false;
                console.error('[fetchAnalytics] Ошибка загрузки данных:', e.message);
            } finally {
                this.isLoading = false;
            }
        },

        clearCache() {
            console.log('[clearCache] Очистка кэша стора');
            this.cards = [];
            this.isNextPage = false;
            this.page = 1;
            this.isLoaded = false;
            this.errorMessage = '';
            this.lastParams = null;
        }
    }
});
