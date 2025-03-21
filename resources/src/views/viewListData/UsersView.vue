<script setup>
import ViewListData from "@/components/ViewListData.vue";
import {useUsers} from "@/utils/useUsers";

</script>

<template>
  <ViewListData :hook="useUsers" :addBtn="{name: 'UserForm'}"/>
</template>

<style scoped>

</style>