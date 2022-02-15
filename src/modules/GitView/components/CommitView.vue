<template>
  <div class="flex-col justify-center">
    <CommitModal v-if="isOpen" :commit="commit" @on-close="isOpen = false" />
    <div
      class="dot-wrapper bg-gray-400 rounded-1/2 w-16 h-16 border-4 border-gray-700 ml-4 mr-4 mb-2"
      :class="{ 'bg-indigo-400 border-indigo-700': isHead }"
      @click="isOpen = !isOpen"
    ></div>

    <div>
      <p class="pl-4">{{ sha }}</p>
    </div>

    <p class="pl-4" v-if="isHead">HEAD</p>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';

import CommitModal from './CommitModal.vue';

export default {
  name: 'CommitView',

  components: {
    CommitModal,
  },

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
    const message = computed(() => props.commit.message);

    const isOpen = ref(false);

    return {
      sha,
      author,
      isHead,
      message,
      isOpen,
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
