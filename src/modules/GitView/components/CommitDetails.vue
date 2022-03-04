<template>
  <div
    id="details-sidebar"
    class="flex flex-col border-t-green-400 border-solid border-t-width-2"
  >
    <DsButton @click="closeDetail" class="mx-4 mt-4">Close</DsButton>

    <CommitDetailsFiles v-if="!isFileDetailsOpened" />
    <CommitDetailsFile v-else />
  </div>
</template>

<script>
import { watch } from 'vue';

import { useGitView } from '../composables/useGitView';
import CommitDetailsFile from './CommitDetailsFile.vue';
import CommitDetailsFiles from './CommitDetailsFiles.vue';

export default {
  name: 'CommitDetails',
  components: {
    CommitDetailsFile,
    CommitDetailsFiles,
  },

  emits: ['onClose'],

  setup(props, { emit }) {
    const { shaCommit, isFileDetailsOpened } = useGitView();

    const closeDetail = () => {
      emit('onClose');
      isFileDetailsOpened.value = false;
    };

    watch(shaCommit, () => {
      isFileDetailsOpened.value = false;
    });

    return {
      isFileDetailsOpened,
      closeDetail,
    };
  },
};
</script>
