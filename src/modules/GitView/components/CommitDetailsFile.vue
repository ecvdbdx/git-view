<template>
  <div class="pt-4 px-4">
    <div class="bg-gray-200 p-2 px-4">
      <div>
        <p>{{ newFile }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue';

import { useGit } from '@/composables/useGit';

import { useGitView } from '../composables/useGitView';

export default {
  name: 'CommitDetailsFiles',
  setup() {
    const { getFileDetails, fileDetails } = useGit();
    const { prevShaCommit, shaCommit, fileName } = useGitView();

    const newFile = computed(() => fileDetails.value.newFile);

    onMounted(() => {
      getFileDetails(shaCommit.value, prevShaCommit.value, fileName.value);
    });

    watch(shaCommit, (newSha) => {
      getFileDetails(newSha.value, prevShaCommit.value, fileName.value);
    });

    watch(fileDetails, (newFileDetails) => {
      console.log(newFileDetails);
    });

    return {
      newFile,
    };
  },
};
</script>
