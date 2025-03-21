<script setup>
import { ref } from 'vue';

const props = defineProps({
  item: {type: Object, required: true}
});
const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <li>
    <router-link v-if="item.route" :to="item.route" @click.stop.prevent="toggleMenu" class="expandable" :class="{ active: isOpen }">
      <span>
        <i v-if="item.icon" v-html="item.icon"></i>
        {{ item.title }}
      </span>
      <span class="tools">
        <i
            v-if="item.children"
            class="dropdown"
            :class="{ active: isOpen }"
        >
          <svg width="11" height="7" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292308 0.33248C-0.0974361 0.700555 -0.0974361 1.29658 0.292308 1.66372L8.55588 9.44788C9.33636 10.184 10.6025 10.184 11.383 9.44788L19.7075 1.60735C20.0933 1.24303 20.0983 0.654448 19.7175 0.285427C19.3288 -0.091122 18.6882 -0.0956861 18.2935 0.275217L10.6765 7.45124C10.2857 7.81931 9.65315 7.81931 9.26241 7.45124L1.70538 0.33248C1.31564 -0.0356054 0.683051 -0.0356054 0.292308 0.33248Z"/>
          </svg>
        </i>
      </span>
    </router-link>
    <div v-else @click.stop.prevent="toggleMenu" class="expandable" :class="{ active: isOpen }">
      <span>
        <i v-if="item.icon" v-html="item.icon"></i>
        {{ item.title }}
      </span>
      <span class="tools">
        <i
            v-if="item.children"
            class="dropdown"
            :class="{ active: isOpen }"
        >
          <svg width="11" height="7" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292308 0.33248C-0.0974361 0.700555 -0.0974361 1.29658 0.292308 1.66372L8.55588 9.44788C9.33636 10.184 10.6025 10.184 11.383 9.44788L19.7075 1.60735C20.0933 1.24303 20.0983 0.654448 19.7175 0.285427C19.3288 -0.091122 18.6882 -0.0956861 18.2935 0.275217L10.6765 7.45124C10.2857 7.81931 9.65315 7.81931 9.26241 7.45124L1.70538 0.33248C1.31564 -0.0356054 0.683051 -0.0356054 0.292308 0.33248Z"/>
          </svg>
        </i>
      </span>
    </div>
    <ul v-if="item.children" v-show="isOpen">
      <LeftMenuItem
          v-for="child in item.children"
          :key="child.route"
          :item="child"
      ></LeftMenuItem>
    </ul>
  </li>
</template>
<style scoped>
.expandable{
  padding: 13px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: .2s linear;
}
div.expandable{
  border-bottom: 1px solid var(--color-background-stroke);
}
svg{
  transition: .2s linear;
}
svg path{
  fill: var(--color-accent-neutral);
}
.dropdown.active svg {
  transform: rotate(180deg);
}
ul{
  border-bottom: 1px solid var(--color-background-stroke);
}
a{
  color: var(--color-accent-main-a);
  text-decoration: none;
  transition: .2s linear;
}
@media (hover: hover) {
  .expandable:hover{
    background: var(--color-content-inverted-secondary);
    box-shadow: var(--shadow-small-default);
  }
  a:hover{
    color: var(--color-accent-main-b)
  }
}
</style>