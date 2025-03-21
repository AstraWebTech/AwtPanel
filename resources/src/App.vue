<script setup>
import {onMounted, ref, watch} from "vue";
import LeftMenu from "@/components/menu/LeftMenu/LeftMenu.vue";
import {generateMenuItems} from "@/router/index.js";
import {useRoute} from "vue-router";
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/useUserStore';
import Button from "@/components/ui/Button.vue";
import logo from "@/assets/logo.svg"


const { t } = useI18n();
const route = useRoute();
const menuItems = ref([]);
const userStore = useUserStore();

const buildMenu = () => {
  menuItems.value.push({
    title: t('pages.main'),
    children: generateMenuItems("main")
  });
  menuItems.value.push({
    title: t('pages.forms'),
    children: generateMenuItems("bdForm")
  });
  menuItems.value.push({
    title: t('pages.settings'),
    children: generateMenuItems("settings")
  });
}

onMounted(() => {
  userStore.initializeUser();
  buildMenu();
});

watch(() => userStore.language, (newLanguage) => {
  menuItems.value = [];
  buildMenu();
});
</script>

<template>
  <router-view v-if="!userStore.isAuthenticated"/>
  <section class="panel" :class="userStore.getUserAppTheme" v-else>
    <LeftMenu :items="menuItems">
      <template v-slot:header>
        <router-link :to="{name:'Main'}" class="logo">
          <img :src="logo" alt="AwtPanel">
        </router-link>
      </template>
      <template v-slot:footer>
        <Button class="accent" @click="userStore.logout()">{{ t('functional_phrases.exit') }}</Button>
      </template>
    </LeftMenu>
    <div class="container">
      <h1 v-if="!route?.meta?.notShowHead">{{ t(String(route.meta.title)) || route.name }}</h1>
      <router-view/>
    </div>
    <footer class="footer">
      <div class="container">
        <span>AstraWebTech</span>
        <span>©&nbsp;2025&nbsp;AwtPanel</span>
      </div>
    </footer>
  </section>
</template>

<style scoped>
.panel{
  display: grid;
  grid-template-columns: 252px 1fr;
  grid-template-rows: 1fr 52px;
  background: var(--color-background-default);
  color: var(--color-accent-neutral);
  width: 100%;
}
.logo{
  display: flex;
  justify-content: center;
}
.container{
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
}
h1{
  margin-top: 0;
}
footer.footer{
  grid-column: 1/3;
  background: var(--color-background-alternate);
  box-shadow: var(--shadow-small-default);
  color: var(--color-content-secondary);
  font-size: .8em;
}
footer.footer .container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
