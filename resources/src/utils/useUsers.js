import {useVueListData} from "@/hooks/useVueListData";
import {computed} from "vue";
import i18n from '@/i18n';

export function useUsers(){
    const { getList, deleteRecord, table, data, search, sort_column, sort_order, enrich, isLoading, isError, message, pagination } = useVueListData();
    const tableData = computed(() => {
        return {
            headers: [
                {
                    name: "ID",
                    code: "id",
                    filterCode: "id"
                },
                {
                    name: i18n.global.t('parameters.user'),
                    code: "login",
                    filterCode: "login"
                },
            ],
            rows: data.value.map(item => {
                return {
                    id: item.id,
                    login: item.login,
                }
            })
        }
    });

    table.value = 'users';
    sort_column.value = 'id';

    return { getList, deleteRecord, table, tableData, search, sort_column, sort_order, isLoading, isError, message, pagination }
}
