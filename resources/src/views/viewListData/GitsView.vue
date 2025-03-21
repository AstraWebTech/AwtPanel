<script setup>
import ViewListData from "@/components/ViewListData.vue";
import {useGits} from "@/utils/useGits.js";

</script>

<template>
  <ViewListData :hook="useGits" :addBtn="{name: 'GitForm'}"/>
</template>

<style scoped>

</style>