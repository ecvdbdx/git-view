<template>
  <div
    id="details-sidebar"
    class="flex flex-col border-t-green-400 border-solid border-t-width-2"
  >
    <DsButton @click="closeDetail" class="mx-4 mt-4">Close</DsButton>
    <p>{{ recap }}</p>
    <ul
      class="flex flex-col justify-center text-xs flex-shrink-0 p-4 flex-grow-0"
    >
      <li
        v-for="([filename, affected_line, stat], index) in files"
        :key="index"
      >
        <span>{{ filename }}</span>
        <span>{{ affected_line }}</span>
        <span>{{ stat }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue';

import { useGit } from '@/composables/useGit';

import { useGitView } from '../composables/useGitView';

export default {
  name: 'CommitDetails',
  props: {
    details: {
      type: Object,
      required: true,
    },
  },

  emits: ['onClose'],

  setup(props, { emit }) {
    const { getDiffCommit } = useGit();
    const { shaCommit } = useGitView();

    const recap = computed(() => props.details.recap);
    const files = computed(() => props.details.files);

    onMounted(() => {
      getDiffCommit(shaCommit.value);
    });

    watch(shaCommit, (newSha) => {
      getDiffCommit(newSha);
    });

    const closeDetail = () => emit('onClose');

    return {
      recap,
      files,
      getDiffCommit,
      closeDetail,
    };
  },
};
</script>
