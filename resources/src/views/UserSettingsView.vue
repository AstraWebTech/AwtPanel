<script setup>
import { ref, onMounted, computed } from "vue";
import { useI18n } from 'vue-i18n';
import { useUserStore } from "@/stores/useUserStore.js";
import ThemeSelect from "@/components/ThemeSelect.vue";

const { t, locale, messages } = useI18n();
const userStore = useUserStore();

const language = ref(localStorage.getItem('lang') || 'en');
const languages = ref([]);

const currentLanguage = computed({
  get: () => userStore.getUserLanguage,
  set: (newLang) => {
    userStore.setUserLanguage(newLang);
    locale.value = newLang;
  }
});

const changeLanguage = () => {
  currentLanguage.value = language.value;
};

onMounted(() => {
  languages.value = Object.keys(messages.value).map(code => ({
    name: messages.value[code]?.languageName || code,
    code
  }));
});
</script>

<template>
  <ThemeSelect />
  <h2>{{ t('subtitles.language') }}</h2>
  <label for="language-select">
    <select id="language-select" @change="changeLanguage" v-model="language">
      <option v-for="item in languages" :key="item.code" :value="item.code">
        {{ item.name }}
      </option>
    </select>
  </label>
</template>

<style scoped>

</style>