<template>
  <div class="absolute top-20">
    <div
      class="border-black p-4 w-40 max-h-250px h-200px w-300px bg-red-500"
      v-if="isOpen"
      @click="away(isOpen)"
    >
      <p>{{ message }}</p>
      <p>
        Author : <b>{{ author }}</b>
      </p>
      <DsButton @click="$emit('onCheckout', sha)" class="mb-4 mt-4">
        Checkout
      </DsButton>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';

export default {
  name: 'CommitModal',

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    commit: {
      type: Object,
      required: true,
    },
  },

  emits: ['onCheckout'],

  setup(props) {
    const away = (trigger) => {
      const reversedTrigger = !trigger;
      return reversedTrigger;
    };
    const author = computed(() => props.commit.author);
    const message = computed(() => props.commit.message);
    const sha = computed(() => props.commit.sha);

    return {
      author,
      message,
      sha,
      away,
    };
  },
};
</script>
