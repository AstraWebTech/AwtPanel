import {useVueListData} from "@/hooks/useVueListData";
import {computed} from "vue";
import i18n from '@/i18n';

export function useGits(){
    const { getList, deleteRecord, table, data, search, sort_column, sort_order, enrich, isLoading, isError, message, pagination } = useVueListData();
    const tableData = computed(() => {
        return {
            headers: [
                {
                    name: i18n.global.t('parameters.url'),
                    code: "url",
                    filterCode: "url"
                },
            ],
            rows: data.value.map(item => {
                return {
                    id: item.id,
                    url: item.url,
                }
            })
        }
    });

    table.value = 'gits';
    sort_column.value = 'url';

    return { getList, deleteRecord, table, tableData, search, sort_column, sort_order, isLoading, isError, message, pagination }
}
