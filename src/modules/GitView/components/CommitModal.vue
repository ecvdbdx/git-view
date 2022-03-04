<template>
  <div class="absolute top-20" ref="modalContainer">
    <div
      class="border-black border-solid border-width-2 p-4 w-40 max-h-250px h-200px w-300px bg-white flex flex-col justify-between"
    >
      <div>
        <p>{{ message }}</p>
        <p>
          Author : <b>{{ author }}</b>
        </p>
      </div>
      <div class="flex justify-around">
        <DsButton @click="checkoutCommit(sha)" class="mb-4 mt-4">
          Checkout
        </DsButton>
        <DsButton
          @click="
            () => {
              isDetailsOpened = true;
              shaCommit = sha;
            }
          "
          class="mb-4 mt-4"
        >
          View details
        </DsButton>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { onClickOutside } from '@vueuse/core';

import { useGit } from '@/composables/useGit';

import { useGitView } from '../composables/useGitView';

export default {
  name: 'CommitModal',

  props: {
    commit: {
      type: Object,
      required: true,
    },
  },

  emits: ['onClose'],

  setup(props, { emit }) {
    const { checkoutCommit } = useGit();

    const { isDetailsOpened, shaCommit } = useGitView();

    const author = computed(() => props.commit.author);
    const message = computed(() => props.commit.message);
    const sha = computed(() => props.commit.sha);

    const modalContainer = ref(null);
    onClickOutside(modalContainer, () => emit('onClose'));

    return {
      author,
      message,
      sha,
      checkoutCommit,
      modalContainer,
      isDetailsOpened,
      shaCommit,
    };
  },
};
</script>
