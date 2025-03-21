<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {useUserStore} from "@/stores/useUserStore.js";

import LoginForm from "@/components/forms/LoginForm.vue";

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  userStore.initializeUser();
});

if(userStore.isAuthenticated){
  router.push({name: 'Main'});
}
</script>

<template>
  <div class="container theme-light">
    <div class="auth-container">
      <LoginForm/>
    </div>
  </div>
</template>

<style scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
}
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid var(--color-background-stroke);
  border-radius: 8px;
  box-shadow: var(--shadow-medium-default);
  background: var(--color-background-alternate);
}
</style>