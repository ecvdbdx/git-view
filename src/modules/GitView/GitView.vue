<template>
  <div class="flex h-full w-full overflow-hidden">
    <SideBar :branchs="branchs" />
    <div class="overflow-hidden h-full items-center">
      <p class="text-center w-full text-align-middle py-4">
        {{ folderPath }}
      </p>
      <CommitList :nb-commits="currentBranchCommits" :commits="commits" />
      <div class="h-2/5">
        <CommitDetails
          v-if="isDetailsOpened"
          @on-close="isDetailsOpened = false"
          :details="commitDetails"
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

import { CommitDetails, CommitList, SideBar } from './components';
import { useGitView } from './composables/useGitView';

export default {
  name: 'GitViewModule',

  components: {
    SideBar,
    CommitList,
    CommitDetails,
  },

  setup() {
    const { folderPath } = useFolder();
    const router = useRouter();
    const {
      getCommits,
      getBranchs,
      checkoutBranch,
      getBranchsInfo,
      headCommitSha,
      commits,
      branchs,
      currentBranchCommits,
      files,
      commitDetails,
    } = useGit();

    const { isDetailsOpened } = useGitView();

    onBeforeMount(() => {
      if (!folderPath.value) router.push('/');
      getCommits();
      getBranchs();
      getBranchsInfo();
    });

    return {
      commits,
      branchs,
      checkoutBranch,
      headCommitSha,
      folderPath,
      files,
      commitDetails,
      isDetailsOpened,
      currentBranchCommits,
    };
  },
};
</script>

<style></style>
