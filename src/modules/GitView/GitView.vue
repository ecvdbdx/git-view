<template>
  <div class="flex h-full w-full overflow-hidden">
    <SideBar :branchs="branchs" />
    <div class="overflow-hidden h-full items-center">
      <p class="text-center w-full text-align-middle py-4">
        {{ folderPath }}
      </p>
      <CommitList :nb-commits="currentBranchCommits.value" :commits="commits" />
    </div>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import { useFolder } from '@/composables/useFolder';
import { useGit } from '@/composables/useGit';

import { CommitList, SideBar } from './components';

export default {
  name: 'GitViewModule',

  components: {
    SideBar,
    CommitList,
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
    } = useGit();

    onBeforeMount(() => {
      if (!folderPath.value) router.push('/');
      getCommits();
      getBranchs();
      getBranchsInfo();
    });
    console.log('GIT VIEW' + currentBranchCommits.value);

    return {
      commits,
      branchs,
      checkoutBranch,
      headCommitSha,
      folderPath,
    };
  },
};
</script>

<style></style>
