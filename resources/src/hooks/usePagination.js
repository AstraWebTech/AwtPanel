import {computed, ref} from "vue";

/**
 * Хук пагинации
 */
export function usePagination(data) {
    const from = ref(0);
    const size = ref(data.size);
    const total = ref(0);

    const totalPages = computed(() => Math.ceil(total.value / size.value));
    const currentPage = computed(() => Math.floor(from.value / size.value) + 1);
    const visiblePages = computed(() => {
        const pages = [];
        const range = 2;

        let start = Math.max(1, currentPage.value - range);
        let end = Math.min(totalPages.value, currentPage.value + range);

        if (end - start < 4) {
            if (start === 1) end = Math.min(totalPages.value, start + 4);
            else if (end === totalPages.value) start = Math.max(1, end - 4);
        }
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;

    });

    /**
     * Предыдущая страница
     */
    const prev = () => {
        from.value = currentPage.value * size.value - size.value - size.value;
    };

    /**
     * Следующая страница
     */
    const next = () => {
        from.value = currentPage.value * size.value;
    };

    /**
     * Перейти на страницу
     * @param page
     */
    const changePage = (page) => {
        from.value = page * size.value - size.value;
    };

    /**
     * Переход на первую страницу
     */
    const first = () => {
        from.value = 0;
    };

    /**
     * Переход на последнюю страницу
     */
    const last = () => {
        from.value = (totalPages.value - 1) * size.value;
    };


    return {
        from,
        size,
        total,
        totalPages,
        currentPage,
        visiblePages,
        prev,
        next,
        first,
        last,
        changePage
    }
}