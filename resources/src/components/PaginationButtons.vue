<script setup>
import Button from "@/components/ui/Button.vue";
const props = defineProps({
  hook: {required: true}
});
const { totalPages, currentPage, visiblePages, prev, next, first, last, changePage} = props.hook;
</script>

<template>
  <div class="pagination">
    <Button class="first" @click="first" :disabled="currentPage <= 3"><<</Button>
    <Button class="prev" @click="prev" :disabled="currentPage === 1"><</Button>
    <template v-for="(page, index) in visiblePages" :key="index">
      <Button class="page" :class="{ accent: currentPage === page }" @click="changePage(page)">{{ page }}</Button>
    </template>
    <Button class="next" @click="next" :disabled="currentPage === totalPages">></Button>
    <Button class="last" @click="last" :disabled="currentPage >= totalPages - 2">>></Button>
  </div>
</template>

<style scoped>
.pagination{
  display: flex;
  align-items: center;
  gap: 5px;
}
button{
  padding: 0;
  height: 3em;
  width: 3em;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
}
.disabled, button[disabled]{
  opacity: .8;
  pointer-events: none;
}
</style>