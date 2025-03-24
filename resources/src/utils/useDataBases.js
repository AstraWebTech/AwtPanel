import {useVueListData} from "@/hooks/useVueListData";
import {computed} from "vue";
import i18n from '@/i18n';

export function useDataBases(){
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
                    name: i18n.global.t('parameters.type'),
                    code: "type",
                    filterCode: "type_name"
                },
                {
                    name: i18n.global.t('parameters.user'),
                    code: "user",
                    filterCode: "user"
                },
                {
                    name: i18n.global.t('parameters.host'),
                    code: "host",
                    filterCode: "server_id"
                },
            ],
            rows: data.value.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    type: item.type.name,
                    user: item.user,
                    host: item.server.host,
                }
            })
        }
    });

    table.value = 'databases';

    return { getList, deleteRecord, table, tableData, search, sort_column, sort_order, isLoading, isError, message, pagination }
}
