<script setup>
import ViewListData from "@/components/ViewListData.vue";
import {useDataBases} from "@/utils/useDataBases.js";

</script>

<template>
  <ViewListData :hook="useDataBases" :addBtn="{name: 'DatabasesForm'}"/>
</template>

<style scoped>

</style>