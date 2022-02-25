<template>
  <div
    id="details-sidebar"
    class="flex flex-col border-t-green-400 border-solid border-t-width-2"
  >
    <DsButton @click="closeDetail" class="mx-4 mt-4">Close</DsButton>
    <p class="pt-4 px-4">{{ recap }}</p>
    <ul
      class="flex flex-col justify-center text-sm flex-shrink-0 p-4 flex-grow-0"
    >
      <li
        class="flex items-center"
        v-for="([filename, affected_line, stat], index) in files"
        :key="index"
      >
        <span class="mr-2">{{ filename }}</span>
        <span class="mr-2">{{ affected_line }}</span>
        <span class="mb-0.5" v-html="formatStat(stat)"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';

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

    const regex = /(\+*)(-*)/;
    const formatStat = (stat) => {
      if (stat) {
        const match = stat.match(regex);
        return (
          '<span class="text-green-700 text-xl">' +
          match[1] +
          '</span>' +
          ' <span class="text-red-700 text-xl tracking-2px">' +
          match[2] +
          '</span>'
        );
      }
    };
    const closeDetail = () => emit('onClose');

    return {
      recap,
      files,
      formatStat,
      getDiffCommit,
      closeDetail,
    };
  },
};
</script>
