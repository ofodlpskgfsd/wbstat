// stores/salesStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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

async function getSalesData(date, retries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await axios.get(
                'https://statistics-api.wildberries.ru/api/v1/supplier/sales',
                {
                    headers: { Authorization: token, 'Content-Type': 'application/json' },
                    params: { dateFrom: date.toISOString() },
                }
            );
            return res.data;
        } catch (err) {
            if (attempt === retries) throw createReadableError(err);
            await sleep(delay * attempt);
        }
    }
}

export const useSalesStore = defineStore('sales', {
    state: () => ({
        totalSales: 0,
        orders: 0,
        averageCheck: 0,
        uniqueSKUCount: 0,
        cancelRate: 0,
        avgDeliveryTime: '—',
        isLoading: false,
        errorMessage: '',
    }),
    actions: {
        async refreshData() {
            this.isLoading = true;
            this.errorMessage = '';
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            try {
                const sales = await getSalesData(yesterday);

                const totalSales = sales.reduce((acc, s) => acc + s.totalPrice, 0);
                const orders = sales.length;
                const averageCheck = orders ? Math.round(totalSales / orders) : 0;
                const skuSet = new Set(sales.map(s => s.sku).filter(Boolean));
                const uniqueSKUCount = skuSet.size;
                const canceledOrders = sales.filter(sale => sale.canceled === true).length;
                const cancelRate = orders ? ((canceledOrders / orders) * 100).toFixed(1) : 0;
                const totalDeliveryDays = sales.reduce((acc, sale) => {
                    if (sale.shippedAt && sale.deliveredAt) {
                        const diffMs = new Date(sale.deliveredAt) - new Date(sale.shippedAt);
                        return acc + diffMs / (1000 * 60 * 60 * 24);
                    }
                    return acc;
                }, 0);
                const avgDeliveryTime = orders ? (totalDeliveryDays / orders).toFixed(1) + ' д' : '—';

                this.totalSales = totalSales;
                this.orders = orders;
                this.averageCheck = averageCheck;
                this.uniqueSKUCount = uniqueSKUCount;
                this.cancelRate = cancelRate;
                this.avgDeliveryTime = avgDeliveryTime;
            } catch (e) {
                this.errorMessage = e.message || 'Ошибка загрузки данных';
            } finally {
                this.isLoading = false;
            }
        }
    }
});
