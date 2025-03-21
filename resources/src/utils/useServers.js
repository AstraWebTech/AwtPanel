import {useVueListData} from "@/hooks/useVueListData";
import {computed} from "vue";
import i18n from '@/i18n';

export function useServers(){
    const { getList, deleteRecord, table, data, search, sort_column, sort_order, enrich, isLoading, isError, message, pagination } = useVueListData();
    const tableData = computed(() => {
        return {
            headers: [
                {
                    name: i18n.global.t('parameters.name'),
                    code: "name",
                    filterCode: "name"
                },
                {
                    name: i18n.global.t('parameters.user'),
                    code: "login",
                    filterCode: "login"
                },
                {
                    name: i18n.global.t('parameters.host'),
                    code: "host",
                    filterCode: "host"
                },
            ],
            rows: data.value.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    login: item.login,
                    host: item.host,
                }
            })
        }
    });

    table.value = 'servers';

    return { getList, deleteRecord, table, tableData, search, sort_column, sort_order, isLoading, isError, message, pagination }
}
