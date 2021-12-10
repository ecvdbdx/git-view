<template>
  <div class="px-4 text-center">
    <div
      class="bg-gray-300 rounded-1/2 w-24 h-24"
      :class="{ 'border-4 border-green-500': isHead }"
    ></div>
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
