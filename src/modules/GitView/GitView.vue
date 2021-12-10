<template>
  <div class="flex h-full flex-col">
    <div class="relative flex justify-between py-4 px-4">
      <DsButton to="/">Back</DsButton>
      <div class="text-center absolute w-full text-align-middle">
        {{ folderPath }}
      </div>
      <div />
    </div>
    <div class="w-full flex h-full">
      <div class="flex self-center relative">
        <CommitView
          v-for="(commit, index) in commits"
          :key="index"
          :commit="commit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import { useFolder } from '@/composables/useFolder';
import { useGit } from '@/composables/useGit';

import { CommitView } from './components';

export default {
  name: 'GitViewModule',

  components: {
    CommitView,
  },

  setup() {
    const { folderPath } = useFolder();
    const router = useRouter();
    const {
      getCommits,
      getBranchs,
      checkoutCommit,
      checkoutBranch,
      headCommitSha,
      commits,
      branchs,
    } = useGit();

    onBeforeMount(() => {
      if (!folderPath.value) router.push('/');
      getCommits();
      getBranchs();
    });

    return { commits, branchs, checkoutCommit, checkoutBranch, headCommitSha };
  },
};
</script>

<style></style>
