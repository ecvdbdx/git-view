<template>
  <div class="pt-4 px-4">
    <p>Coucou</p>
  </div>
</template>

<script>
import { onMounted, watch } from 'vue';

import { useGit } from '@/composables/useGit';

import { useGitView } from '../composables/useGitView';

export default {
  name: 'CommitDetailsFiles',
  setup() {
    const { getFileDetails, fileDetails } = useGit();
    const { prevShaCommit, shaCommit, fileName } = useGitView();

    onMounted(() => {
      getFileDetails(shaCommit.value, prevShaCommit.value, fileName.value);
    });

    watch(fileDetails, (newFileDetails) => {
      console.log(newFileDetails);
    });
  },
};
</script>
