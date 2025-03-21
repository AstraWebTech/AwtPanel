import {ref} from 'vue';
import axios from "axios";

/**
 * Хук управления состоянием запроса
 */
export function useRequest() {
    const isLoading = ref(false);
    const isError = ref(false);
    const message = ref("");

    /** Отправка axios запроса **/
    const request = (params) => {
        return new Promise((resolve, reject) => {
            isLoading.value = true;
            isError.value = false;

            axios(params)
                .then(response => {
                    isLoading.value = false;
                    resolve(response);
                })
                .catch(error => {
                    isLoading.value = false;
                    isError.value = true;
                    message.value = error.response?.data?.message || error;
                    reject(error);
                })
        });
    };

    /** Вызов action с аргументами args, для выполнения запроса  **/
    const actionRequest = (action, args) => {
        return new Promise((resolve, reject) => {
            action(args)
                .then(response => {
                    isLoading.value = false;
                    resolve(response);
                })
                .catch(error => {
                    isLoading.value = false;
                    isError.value = true;
                    message.value = error.response?.data?.message || error;
                    reject(error);
                })
        });
    };

    return { request, actionRequest, isLoading, isError, message };
}
