<script setup>
import Button from "@/components/ui/Button.vue";
import PreLoader from "@/components/PreLoader.vue";

const props = defineProps({
  fields: {type: Array, required: true},
  hiddenFields: {type: Array, required: false, default: []},
  buttonLabel: {type: String, required: false},
  error: {type: String, required: false},
  isLoading: {type: Boolean, required: false, default: false},
  showOkMessage: {type: Boolean, required: false, default: false},
  errorMessage: {type: String, required: false}
});

const emit = defineEmits(["submit"])

const submit = (event) => {
  emit("submit", event)
};
</script>

<template>
  <form @submit.prevent.stop="submit" autocomplete="off">
    <div class="errorMessage" v-if="props.errorMessage">
      <small>{{ props.errorMessage }}</small>
    </div>
    <template v-if="hiddenFields.length > 0">
      <input v-for="(field, index) in hiddenFields" :type="field.type" :name="field.name" :id="field.name + index" hidden>
    </template>
    <template v-for="(field, index) in fields" :key="index">
      <template v-if="field.type === 'selectRequest'">
        <label class="awtSelect" style="flex: 1 1 auto">
          <select
              :id="field.id"
              :disabled="field.disabled || field.options?.length === 0"
              v-model="field.value" :required="field.required">
            <option v-for="option in field.options" :key="option.value" :value="option.value">{{ option.name }}</option>
          </select>
          <p>{{ field.label }}</p>
          <small v-if="!!field.error">{{ field.error }}</small>
        </label>
      </template>
      <template v-else-if="field.type === 'select'">
        <label class="awtSelect">
          <select
              :id="field.id"
              :disabled="field.disabled || field.options.length === 0"
              v-model="field.value" :required="field.required">
            <option v-for="option in field.options" :key="option.value" :value="option.value">{{ option.name }}</option>
          </select>
          <p>{{ field.label }}</p>
          <small v-if="!!field.error">{{ field.error }}</small>
        </label>
      </template>
      <template v-else-if="field.type === 'text' || field.type === 'number' || field.type === 'password'">
        <label class="awtInput">
          <input
              :id="field.id"
              :name="field.name" :type="field.type"
              v-model="field.value"
              :required="field.required"
              @blur="field.touched = true"
              :class="{'invalid': !!field.error && field.touched}"
              autocomplete="off"
          />
          <p>{{ field.label }}</p>
          <small v-if="!!field.error">{{ field.error }}</small>
        </label>

      </template>
      <template v-else-if="field.type === 'radio' || field.type === 'checkbox'">
        <div class="flex items-center">
          <input type="checkbox" :id="field.name + index" v-model="field.value"/>
          <label :for="field.name + index" v-html="field.label"/>
        </div>
      </template>
    </template>

    <slot></slot>

    <template v-if="$slots.buttons">
      <slot name="buttons"></slot>
    </template>

    <Button type="submit" style="width: fit-content" class="accent">
      {{ buttonLabel }}
    </Button>

    <template v-if="isLoading">
      <div class="formShadow"></div>
      <PreLoader aria-label="Loading"/>
    </template>

    <template v-if="showOkMessage">
      <div class="formShadow"></div>
      <div class="okMessage">
        Всё ок!
      </div>
    </template>
  </form>
</template>

<style scoped>
form{
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px 0;

  --color-light: white;
  --color-dark: var(--color-background-default);
  --color-signal: var(--color-accent-warning);
  --color-text: var(--color-accent-neutral);
  --size-bezel: .5rem;
  --size-radius: 4px;
  --color-accent: var(--color-accent-main-a);
  --color-background: var(--color-dark);
  --color-shadow: var(--color-accent);
}

.awtInput {
  position: relative;
}
.awtInput input{
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: 3px solid currentColor;
  padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
  color: currentColor;
  background: transparent;
  border-radius: var(--size-radius);
}
.awtInput input:focus{
  outline: none;
}
.awtInput input:focus + p, .awtInput input:not(:placeholder-shown) + p{
  transform: translate(.25rem, -55%) scale(.8);
  color: var(--color-accent);
  border: 1px solid;
  border-radius: 5px;
}
.awtInput p{
  position: absolute;
  left: 0;
  top: 0;
  padding: calc(var(--size-bezel) * 0.25) calc(var(--size-bezel) * .5);
  margin: calc(var(--size-bezel) * 0.25 + 3px) calc(var(--size-bezel) * .5);
  white-space: nowrap;
  transform: translate(0, 0);
  transform-origin: 0 0;
  background: var(--color-background);
  transition: transform 120ms ease-in;
  font-weight: bold;
  line-height: 1.2;
}

.awtSelect{
  position: relative;
}
.awtSelect select{
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: 3px solid currentColor;
  padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
  color: currentColor;
  background: transparent;
  border-radius: var(--size-radius);
}
.awtSelect select:focus{
  outline: none;
}
.awtSelect p{
  position: absolute;
  left: 0;
  top: 0;
  padding: calc(var(--size-bezel) * 0.25) calc(var(--size-bezel) * .5);
  margin: calc(var(--size-bezel) * 0.25 + 3px) calc(var(--size-bezel) * .5);
  transform: translate(.25rem, -55%) scale(.8);
  color: var(--color-accent);
  white-space: nowrap;
  background: var(--color-background);
  font-weight: bold;
  line-height: 1.2;
  border: 1px solid;
  border-radius: 5px;
}
small{
  color: var(--color-accent-critical);
}
.formShadow {
  backdrop-filter: blur(2px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.okMessage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5em;
  color: var(--color-accent-success);
  font-weight: bold;
}
</style>