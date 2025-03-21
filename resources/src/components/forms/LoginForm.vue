<script setup>
import {ref} from "vue";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';

import {useForm} from "@/hooks/useForm";
import VueForm from "@/components/ui/form/VueForm.vue";
import {useUserStore} from "@/stores/useUserStore.js";

const userStore = useUserStore();
const router = useRouter();
const { t } = useI18n();

const {fields, validate, getFieldsDataToRequest, clearValues} = useForm([
  { key: "login", required: true, validate: true },
  { key: "password", required: true, validate: false },
]);
const errorMessage = ref("");

const submit = () => {
  if(validate()) {
    const data = getFieldsDataToRequest();
    userStore.login(data.login, data.password)
        .then(result => {
          clearValues();
          router.push({name: 'Main'});
        })
        .catch(error => {
          errorMessage.value = error.response.data.message || error.message;
          console.error(error)
        });
  }
};
</script>

<template>
  <div class="container">
    <VueForm :fields="fields" :errorMessage="errorMessage" @submit="submit" :buttonLabel="t('functional_phrases.enter')"/>
  </div>
</template>

<style scoped>

</style>