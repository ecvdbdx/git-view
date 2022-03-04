<template>
  <p class="pt-4 px-4">{{ recap }}</p>
  <ul
    class="flex flex-col justify-center text-sm flex-shrink-0 p-4 flex-grow-0"
  >
    <li
      class="flex items-center"
      v-for="([filename, affected_line, stat], index) in files"
      @click="
        () => {
          isFileDetailsOpened = true;
          fileName = filename;
        }
      "
      :key="index"
    >
      <span class="mr-2">{{ filename }}</span>
      <span class="mr-2">{{ affected_line }}</span>
      <span class="mb-0.5" v-html="formatStat(stat)"></span>
    </li>
  </ul>
</template>

<script>
import { computed, onMounted, watch } from 'vue';

import { useGit } from '@/composables/useGit';

import { useGitView } from '../composables/useGitView';

export default {
  name: 'CommitDetailsFiles',
  setup() {
    const { getDiffCommit, commitDetails } = useGit();
    const { shaCommit, isFileDetailsOpened, fileName } = useGitView();

    const recap = computed(() => commitDetails.value.recap);
    const files = computed(() => commitDetails.value.files);

    onMounted(() => {
      getDiffCommit(shaCommit.value);
    });

    watch(shaCommit, (newSha) => {
      getDiffCommit(newSha);
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

    return {
      recap,
      files,
      getDiffCommit,
      formatStat,
      isFileDetailsOpened,
      fileName,
    };
  },
};
</script>
