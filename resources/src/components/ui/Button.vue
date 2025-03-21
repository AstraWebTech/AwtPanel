<script setup>
const props = defineProps({
  type: {tye: String, default: "button"}
})
</script>

<template>
  <button :type="type">
    <slot></slot>
  </button>
</template>

<style scoped>
button{
  padding: 10px 15px;
  border-radius: 17px;
  border: 0;
  gap: 5px;
  line-height: 1em;
  transition: .2s linear;
}
button:not(:disabled){
  cursor: pointer;
}
.icon{
  display: flex;
  justify-content: center;
  align-items: center;
}
.accent{
  color: #ffffff;
  background: var(--color-accent-main-a);
}
@media (hover: hover) {
  .accent:hover{
    background: var(--color-accent-main-b);
  }
}
</style>