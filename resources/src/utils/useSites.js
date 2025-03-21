import {useVueListData} from "@/hooks/useVueListData";
import {computed} from "vue";
import i18n from '@/i18n';

export function useSites(){
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
                    name: i18n.global.t('parameters.url'),
                    code: "url",
                    filterCode: "url"
                },
                {
                    name: i18n.global.t('parameters.server'),
                    code: "server",
                    filterCode: "server_id"
                },
                {
                    name: i18n.global.t('parameters.database'),
                    code: "database",
                    filterCode: "database_id"
                }
            ],
            rows: data.value.map(item => {
                return {
                    id: item.id,
                    name: {
                        title: item.name,
                        router: {name: 'SiteDetail', params: {id: item.id}}
                    },
                    url: item.url,
                    server: item.server?.host || "-",
                    database: item.database?.name || "-",
                }
            })
        }
    });

    table.value = 'sites';

    return { getList, deleteRecord, table, tableData, search, sort_column, sort_order, isLoading, isError, message, pagination }
}
