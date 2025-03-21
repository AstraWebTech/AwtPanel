<script setup>
import LeftMenuItem from "./LeftMenuItem.vue"
const props = defineProps({
  items: {type: Array, default: []}
});
</script>

<template>
<aside>
  <header>
    <div class="header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
  </header>
  <nav v-if="items.length > 0">
    <ul>
      <LeftMenuItem v-for="item in items" :item="item"/>
    </ul>
  </nav>
  <footer v-if="$slots.footer">
    <slot name="footer"></slot>
  </footer>
</aside>
</template>

<style scoped>
aside{
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--color-background-alternate);
  box-shadow: var(--shadow-small-default);
  padding-bottom: 1em;
}
aside:deep(ul){
  list-style: none;
  padding: 0;
  margin: 0;
}
aside:deep(ul) ul{
  padding-left: 1em;
}
footer{
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-end;
}
</style>