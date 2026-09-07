import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { TOAST_TYPES } from '@components/constants';
import { store } from '@store/index';
import { showToast } from '@features/toast/toastSlice';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

const refreshClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error: AxiosError) => {
        const originalRequest = error.config as
            | RetryableRequestConfig
            | undefined;

        if (!error.response) {
            const message = 'No Internet Connection. ';

            error.message = message;

            store.dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Network Error',
                    message,
                }),
            );

            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                await refreshClient.post('/auth/refresh');

                return await apiClient(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default apiClient;
