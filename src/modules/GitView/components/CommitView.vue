<template>
  <div class="px-4 text-center relative">
    <CommitModal :is-open="isOpen" :commit="commit" @on-checkout="onCheckout" />
    <div
      class="bg-gray-300 rounded-1/2 w-24 h-24"
      :class="{ 'border-4 border-green-500': isHead }"
      @click="isOpen = !isOpen"
    ></div>
    <p class="pt-2">{{ sha }}</p>

    <p class="pt-2" v-if="isHead">HEAD</p>
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
    const onCheckout = (commitId) => {
      console.log(commitId);
    };

    return {
      sha,
      author,
      isHead,
      message,
      isOpen,
      onCheckout,
    };
  },
};
</script>
