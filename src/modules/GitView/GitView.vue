<template>
  <div class="flex h-full w-full overflow-hidden">
    <SideBar :branchs="branchs" />
    <div class="overflow-hidden h-full items-center relative">
      <p class="text-center w-full text-align-middle py-4">
        {{ folderPath }}
      </p>
      <CommitList :nb-commits="currentBranchCommits" :commits="commits" />
      <CommitDetails
        class="h-2/5 absolute bottom-0 bg-white w-full"
        v-if="isDetailsOpened"
        @on-close="isDetailsOpened = false"
        :details="commitDetails"
      />
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted } from 'vue';
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
      resetState,
    } = useGit();

    const { isDetailsOpened } = useGitView();

    onBeforeMount(async () => {
      if (!folderPath.value) router.push('/');
      resetState();
      await getCommits();
      await getBranchs();
      await getBranchsInfo();
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
