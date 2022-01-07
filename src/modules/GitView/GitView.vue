<template>
  <div class="flex h-full flex-col overflow-hidden">
    <div class="flex h-full items-center">
      <SideBar :branchs="branchs" />
      <div class="w-full flex h-full overflow-scroll relative">
        <p class="text-center absolute w-full text-align-middle py-4">
          {{ folderPath }}
        </p>
        <div ref="commitList" class="flex w-full h-full overflow-scroll">
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
import { onBeforeMount, onMounted, ref } from 'vue';
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

    const commitList = ref(null);
    const commitsLength = commits._rawValue.length;
    const offset = ref(0);
    const limit = 10;

    onBeforeMount(() => {
      if (!folderPath.value) router.push('/');
      getCommits();
      getBranchs();
    });

    onMounted(() => {
      commitList.value.scrollLeft = commitList.value.scrollWidth;
    });

    return {
      commits,
      branchs,
      checkoutCommit,
      checkoutBranch,
      headCommitSha,
      folderPath,
      commitList,
      commitsLength,
      offset,
      limit,
    };
  },
};
</script>

<style></style>
