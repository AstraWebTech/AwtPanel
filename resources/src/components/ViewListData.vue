<script setup>
import PaginationButtons from "@/components/PaginationButtons.vue";
import Button from "@/components/ui/Button.vue";
import PreLoader from "@/components/PreLoader.vue";
import { useI18n } from 'vue-i18n';

const props = defineProps({
  hook: {},
  addBtn: {},
});

const { t } = useI18n();
const { getList, deleteRecord, table, tableData, search, sort_column, sort_order, isLoading, isError, message, pagination } = props.hook();
const { size } = pagination;

getList();

const clickToHeader = (item) => {
  if(sort_column.value === item.filterCode){
    sort_order.value = (sort_order.value === "asc") ? "desc" : "asc";
  } else {
    sort_column.value = item.filterCode;
    sort_order.value = "asc";
  }
};

const deleteElement = (id) => {
  deleteRecord(id)
      .then(r => {
        getList();
      })
      .catch(e => {
        console.error("e", e)
      });
};

</script>

<template>
  <section>
    <section>
      <header>
        <input type="search" :placeholder="t('functional_phrases.search')" v-model="search">
        <section class="tools">
          <router-link :to="addBtn">
            <Button class="accent icon">
                <i>+</i>
                <span>{{ t('functional_phrases.add_record') }}</span>
            </Button>
          </router-link>
        </section>
      </header>
      {{ props.hook.sort_column }}
      <section class="content">
        <table>
          <thead>
          <tr>
            <th v-for="item in tableData.headers" :key="item.code" @click.prevent.stop="clickToHeader(item)">
              <i v-if="sort_column === item.filterCode">
                <template v-if="sort_order === 'asc'">▲</template>
                <template v-else>▼</template>
              </i>
              {{ item.name }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in tableData.rows">
            <td v-for="item in tableData.headers">
              <template v-if="typeof row[item.code] === 'object' && row[item.code]?.router">
                <router-link :to="row[item.code].router">
                  {{ row[item.code].title }}
                </router-link>
              </template>
              <template v-else>
                {{ row[item.code] }}
              </template>
            </td>
            <td>
              <div class="btns">
                <Button class="icon" @click="deleteElement(row.id)">
                  <span>{{ t('functional_phrases.delete') }}</span>
                </Button>
                <router-link :to="{name: addBtn.name, params: {id: row.id}}">
                  <Button class="icon">
                    <span>{{ t('functional_phrases.edit') }}</span>
                  </Button>
                </router-link>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <PreLoader v-if="isLoading"/>
      </section>
      <footer>
        <PaginationButtons :hook="pagination"/>
        <div>
          <span>{{ t('functional_phrases.show_by') }}:  </span>
          <select v-model="size">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="70">70</option>
            <option value="100">100</option>
          </select>
        </div>
      </footer>
    </section>
  </section>
</template>

<style scoped>
.content{
  position: relative;
}
table {
  width: 100%;
  border: none;
  margin: 20px 0;
  border-collapse: collapse;
}
table thead th {
  text-align: left;
  font-weight: bold;
  padding: 15px 10px;
  cursor: pointer;
  user-select: none;
}
table tbody td {
  padding: 15px 10px;
  border-top: 1px solid;
}
header, footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
input {
  border: 0;
  border-bottom: 1px solid var(--color-accent-neutral);
  background: none;
  padding: 10px 25px;
  min-width: 350px;
  color: var(--color-accent-neutral);
}
input:focus, input:focus-visible{
  outline: none;
}
.btns{
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 3px;
}
</style>