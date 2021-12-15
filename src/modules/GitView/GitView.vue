<template>
  <div class="flex h-full flex-col overflow-hidden">
    <div class="flex h-full items-center">
      <SideBar :branchs="branchs" />
      <div class="w-full flex h-full overflow-scroll relative">
        <p class="text-center absolute w-full text-align-middle py-4">
          {{ folderPath }}
        </p>
        <div class="flex w-full h-full overflow-scroll">
          <div class="flex self-center relative">
            <CommitView
              v-for="(commit, index) in commits"
              :key="index"
              :commit="commit"
              @click="checkoutCommit(commit.sha)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import { useFolder } from '@/composables/useFolder';
import { useGit } from '@/composables/useGit';

import { CommitView, SideBar } from './components';

export default {
  name: 'GitViewModule',

  components: {
    CommitView,
    SideBar,
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

    return {
      commits,
      branchs,
      checkoutCommit,
      checkoutBranch,
      headCommitSha,
      folderPath,
    };
  },
};
</script>

<style></style>
