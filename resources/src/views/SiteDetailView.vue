<script setup>
import {ref} from "vue";
import {useRequest} from "@/hooks/useRequest.js";
const { request, isLoading, isError, message } = useRequest();
import {useRoute} from "vue-router";
import { useI18n } from 'vue-i18n';
import SSHTerminal from "@/components/SSHTerminal.vue";

const { t } = useI18n();
const route = useRoute();
const detailItem = ref({});

request({
  method: 'get',
  url: import.meta.env.VITE_API_URL + '/element',
  params: {
    table: "sites",
    id: route.params.id,
    enrich: true,
  },
}).then(response => {
  detailItem.value = response.data;
}).catch(error => {
  console.error('Error:', error);
});

const getDumpBd = () => {
  request({
    method: 'get',
    url: import.meta.env.VITE_API_URL + '/get-bd-dump',
    params: {
      type: detailItem.value.database.type.code,
      host: detailItem.value.database.server.host,
      user: detailItem.value.database.user,
      password: detailItem.value.database.password,
      database: detailItem.value.database.name
    },
    responseType: 'blob'
  }).then(response => {
    const blob = new Blob([response.data], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${detailItem.value.database.name}-${Date.now()}.sql`;
    link.click();
    URL.revokeObjectURL(link.href);
  }).catch(error => {
    console.error('Error:', error);
  });
};
</script>

<template>
<section>
  <section class="intro">
    <picture>
      <img :src="detailItem.previewImg" :alt="detailItem.name">
    </picture>
    <article>
      <h2>{{ detailItem.name }}</h2>
      <div class="option">
        <b>url: </b>
        <a :href="detailItem.url" target="_blank">{{ detailItem.url }}</a>
      </div>
      <div class="option" v-if="detailItem.path">
        <b>{{ t('parameters.root_directory') }}: </b>
        <span>{{ detailItem.path }}</span>
      </div>
      <div class="option" v-if="detailItem.git">
        <b>{{ t('parameters.git') }}: </b>
        <a :href="detailItem.git.url" target="_blank">{{ detailItem.git.url }}</a>
      </div>

      <template v-if="detailItem.server">
        <br>
        <h4>{{ t('parameters.server') }}</h4>
        <div class="option" v-if="detailItem.server.name">
          <b>{{ t('parameters.name') }}: </b>
          <span>{{ detailItem.server.name }}</span>
        </div>
        <div class="option" v-if="detailItem.server.login">
          <b>{{ t('parameters.ipv4') }}: </b>
          <span>{{ detailItem.server.login }}</span>
        </div>
        <div class="option" v-if="detailItem.server.host">
          <b>{{ t('parameters.name') }}: </b>
          <span>{{ detailItem.server.host }}</span>
        </div>
      </template>
      <template v-if="detailItem.database">
        <br>
        <h4>{{ t('parameters.database') }}</h4>
        <div class="option" v-if="detailItem.database.name">
          <b>{{ t('parameters.name') }}: </b>
          <span>{{ detailItem.database.name }}</span>
        </div>
        <div class="option" v-if="detailItem.database.user">
          <b>{{ t('parameters.user') }}: </b>
          <span>{{ detailItem.database.user }}</span>
        </div>
        <div class="option" v-if="detailItem.database.type.name">
          <b>{{ t('parameters.type') }}: </b>
          <span>{{ detailItem.database.type.name }}</span>
        </div>
        <div class="option" v-if="detailItem.database.server.host">
          <b>{{ t('parameters.ipv4') }}: </b>
          <span>{{ detailItem.database.server.host }}</span>
        </div>
      </template>
    </article>
  </section>
  <section class="management">
    <a type="button" :href="detailItem.url" target="_blank">
      {{ t('functional_phrases.open_website') }}
    </a>
    <button type="button" @click.prevent.stop="getDumpBd" v-if="detailItem.database">
      {{ t('functional_phrases.get_db_dump') }}
    </button>
    <router-link :to="{name: 'SitesForm', params: {id: route.params.id}}">
      {{ t('functional_phrases.edit') }}
    </router-link>
    <router-link v-if="detailItem.server" :to="{name: 'ServersForm', params: {id: detailItem.server.id}}">
      {{ t('functional_phrases.edit_server') }}
    </router-link>
    <router-link v-if="detailItem.database" :to="{name: 'DatabasesForm', params: {id: detailItem.database.id}}">
      {{ t('functional_phrases.edit_database') }}
    </router-link>
    <router-link v-if="detailItem.git" :to="{name: 'GitForm', params: {id: detailItem.git.id}}">
      {{ t('functional_phrases.edit_git') }}
    </router-link>
  </section>
  <br><br><br>
  <SSHTerminal
      v-if="detailItem.server && detailItem.server.password && detailItem.server.login && detailItem.server.host"
      :password="detailItem.server.password" :username="detailItem.server.login" :host="detailItem.server.host"
  />
</section>
</template>

<style scoped>
.intro{
  display: flex;
  gap: 20px;
}
.intro picture{
  display: flex;
  width: 460px;
  height: auto;
  border-radius: 15px;
  overflow: hidden;
}
.intro img {
  width: 100%;
  object-fit: cover;
}
.option{
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 10px;
  margin: 10px 0;
}
h2{
  margin-top: 0;
}

.management{
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 30px 0;
}
.management > *{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 140px;
  height: 140px;
  border: 1px solid;
  border-radius: 10px;
  outline: none !important;
  background: transparent;
  text-decoration: none;
  text-align: center;
  padding: 10px;
  margin: 0;
  cursor: pointer;
  background: var(--color-background-default);
  color: var(--color-accent-neutral);
  transition: .2s linear;
  box-shadow: var(--shadow-small-default);
}
@media (hover: hover) {
  .management > *:hover{
    background: var(--color-background-alternate);
    color: var(--color-accent-neutral-hover);
    box-shadow: var(--shadow-small-hovered);
  }
}
</style>