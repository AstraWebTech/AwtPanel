<script setup>
import Button from "@/components/ui/Button.vue";
import { useI18n } from 'vue-i18n';
import { useUserStore } from "@/stores/useUserStore.js";

const { t } = useI18n();
const userStore = useUserStore();
const theme = ["theme-light", "theme-dark"];

</script>

<template>
  <section>
    <h2>{{ t('subtitles.app_theme') }}</h2>
    <div class="list" >
      <div class="card" v-for="item in theme" @click.prevent.stop="userStore.setUserAppTheme(item)" :class="{active: userStore.getUserAppTheme === item}">
        <div class="preview" :class="item">
          <aside></aside>
          <div class="main">
            <Button>{{ t('misc_words.button') }}</Button>
            <Button class="accent">{{ t('misc_words.button') }}</Button>
            <a>{{ t('misc_words.link') }}</a>
          </div>
          <footer></footer>
        </div>
        {{ item }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.list{
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card{
  text-align: center;
  flex: 0 0 140px;
}
.preview{
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 90% 10%;
  aspect-ratio: 1;
  border: 5px solid var(--color-background-stroke);
  border-radius: 8px;
  box-shadow: var(--shadow-medium-default);
  background: var(--color-background-default);
}
.card.active .preview{
  border-color: var(--color-accent-main-a)
}
aside{
  background: var(--color-background-alternate);
  box-shadow: var(--shadow-small-default);
}
.main{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5%;
  gap: 10%;
}
footer{
  grid-column: 1/3;
  background: var(--color-background-alternate);
  box-shadow: var(--shadow-small-default);
  color: var(--color-content-secondary);
}
</style>