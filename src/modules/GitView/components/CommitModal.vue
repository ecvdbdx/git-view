<template>
  <div class="absolute -top-full border border-black p-4 w-40" v-if="isOpen">
    <p>{{ message }}</p>
    <p>
      Author : <b>{{ author }}</b>
    </p>
    <DsButton @click="$emit('onCheckout', sha)" class="mb-4 mt-4">
      Checkout
    </DsButton>
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
    const author = computed(() => props.commit.author);
    const message = computed(() => props.commit.message);
    const sha = computed(() => props.commit.sha);

    return {
      author,
      message,
      sha,
    };
  },
};
</script>
