<script setup>
import ViewListData from "@/components/ViewListData.vue";
import {useServers} from "@/utils/useServers.js";

</script>

<template>
  <ViewListData :hook="useServers" :addBtn="{name: 'ServersForm'}"/>
</template>

<style scoped>

</style>