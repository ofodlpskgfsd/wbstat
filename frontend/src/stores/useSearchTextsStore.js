import { defineStore } from 'pinia';
import axios from 'axios';

const token = import.meta.env.VITE_WB_API_KEY;

export const useSearchTextsStore = defineStore('searchTexts', {
    state: () => ({
        items: [],
        isLoading: false,
        errorMessage: null,
    }),
    actions: {
        async fetchSearchTexts(params) {
            this.isLoading = true;
            this.errorMessage = null;
            this.items = [];

            try {
                const response = await axios.post(
                    'https://seller-analytics-api.wildberries.ru/api/v2/search-report/product/search-texts',
                    {
                        currentPeriod: params.currentPeriod,
                        pastPeriod: params.pastPeriod,
                        nmIds: params.nmIds,
                        topOrderBy: params.topOrderBy || 'openToCart',
                        orderBy: params.orderBy || { field: 'avgPosition', mode: 'asc' },
                        limit: params.limit || 20,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                this.items = response.data.data.items || [];
            } catch (error) {
                this.errorMessage =
                    error.response?.data?.detail ||
                    error.response?.data?.message ||
                    error.message ||
                    'Ошибка запроса топа поисковых запросов';
            } finally {
                this.isLoading = false;
            }
        },
    },
});
