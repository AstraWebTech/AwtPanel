import {ref, watch} from "vue";
import {useRequest} from "@/hooks/useRequest.js";
import {usePagination} from "@/hooks/usePagination.js";

export function useVueListData(){
    const table = ref('');
    const data = ref([]);
    const search = ref('');
    const sort_column = ref('name');
    const sort_order = ref('asc');
    const enrich = ref(true);
    const { request, isLoading, isError, message } = useRequest();
    const pagination = usePagination({size: 10});

    const getList = () => {
        return new Promise((resolve, reject) => {
            request({
                method: 'get',
                url: import.meta.env.VITE_API_URL + '/list',
                params: {
                    table: table.value,
                    sort_column: sort_column.value,
                    sort_order: sort_order.value,
                    ...(search.value && {search: search.value}),
                    from: pagination.from.value,
                    ...(pagination.size.value && {size: pagination.size.value}),
                    enrich: enrich.value,
                },
            }).then(response => {
                data.value = response.data.data;
                pagination.total.value = response.data.total;
                resolve(response.data);
            }).catch(error => {
                console.error('Error:', error);
                reject(error);
            });
        });
    };

    const deleteRecord = (id) => {
        return new Promise((resolve, reject) => {
            request({
                method: 'delete',
                url: import.meta.env.VITE_API_URL + '/element',
                params: {
                    table: table.value,
                    id: id,
                },
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.error('Error:', error);
                reject(error);
            });
        });
    };

    watch(() => sort_column.value + sort_order.value + search.value, (sum) => {
        getList();
    });

    watch(() => pagination.from.value, (from) => {
        getList();
    });

    return { getList, deleteRecord, data, table, search, sort_column, sort_order, enrich, isLoading, isError, message, pagination }
}
