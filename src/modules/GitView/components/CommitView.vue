<template>
  <div class="px-4 text-center">
    <div class="dot-wrapper flex justify-center">
      <div
        class="bg-gray-400 rounded-1/2 w-8 h-8 border-4 border-gray-700"
        :class="{ 'bg-indigo-400 border-indigo-700': isHead }"
      ></div>
    </div>
    <p class="pt-2">{{ sha }}</p>
    <p class="pt-2">{{ author }}</p>
    <p class="pt-2" v-if="isHead">HEAD</p>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';

export default {
  name: 'CommitView',

  props: {
    commit: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    console.log(`props.commit`, props.commit);
    const sha = computed(() => props.commit.sha);
    const author = computed(() => props.commit.author);
    const isHead = computed(() => props.commit.isHead);

    return {
      sha,
      author,
      isHead,
    };
  },
};
</script>

<style scoped>
.dot-wrapper {
  position: relative;
}
.dot-wrapper::after {
  content: '';
  z-index: -1;
  width: calc(100% + 2rem);
  left: calc(-50% - 2rem);
  transform: translateY(-50%);
  @apply absolute bg-gray-700 top-1/2 h-1;
}
</style>
