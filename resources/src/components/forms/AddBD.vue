<script setup>
import {useRequest} from "@/hooks/useRequest";
import {useForm} from "@/hooks/useForm";
import VueForm from "@/components/ui/form/VueForm.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const { request, isLoading, isError, message } = useRequest();

const {fields, validate, getFieldsDataToRequest, clearValues} = useForm([
  { key: "name", name: 'name', required: true, validate: true },
  { key: "selectBDType", required: true, validate: false },
  { key: "name", name: 'user',  label: t('parameters.user'), required: true, validate: false },
  { key: "password", required: false, validate: false },
  { key: "selectServer", required: true, validate: false },
], [
  { key: "id", name: 'id', required: true, value: route.params.id },
]);

const showOkMessage = ref(false);
const errorMessage = ref("");


if(route.params.id){
  request({
    method: 'get',
    url: import.meta.env.VITE_API_URL + '/element',
    params: {
      table: 'databases',
      id: route.params.id
    }
  })
      .then(result => {
        Object.keys(result.data).forEach(key =>{
          fields.value.find(el => {
            if(el.name === key){
              el.value = result.data[key]
            }
            return false;
          })
        });
      })
      .catch(error => {
        console.error(error)
      });
}

const submit = () => {
  if(validate()){
    request({
      method: route.params.id ? 'put' : 'post',
      url: import.meta.env.VITE_API_URL + '/element',
      data: {
        table: 'databases',
        data: getFieldsDataToRequest()
      }
    })
        .then(result => {
          clearValues();
          showOkMessage.value = true;
          setTimeout(() => {
            showOkMessage.value = false;
          }, 3000);
        })
        .catch(error => {
          console.error(error)
        });
  }
};
</script>

<template>
  <div class="container">
    <h2>{{ t('subtitles.add_database') }}</h2>
    <div class="formAlert">Добавить базу данных вы сможете, если у вас добавлен <b>сервер</b> базы данных.</div>
    <VueForm :fields="fields" :isLoading="isLoading" :errorMessage="errorMessage" :showOkMessage="showOkMessage" @submit="submit" :buttonLabel="t('functional_phrases.add')"/>
  </div>
</template>

<style scoped>

</style>