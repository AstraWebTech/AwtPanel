<script setup>
import ViewListData from "@/components/ViewListData.vue";
import {useSites} from "@/utils/useSites";

</script>

<template>
  <ViewListData :hook="useSites" :addBtn="{name: 'SitesForm'}"/>
</template>

<style scoped>

</style>