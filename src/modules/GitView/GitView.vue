<template>
  <div class="flex h-full flex-col overflow-hidden">
    <div class="flex h-full items-center">
      <SideBar :branchs="branchs" />
      <div class="w-full flex h-full overflow-scroll relative">
        <p class="text-center absolute w-full text-align-middle py-4">
          {{ folderPath }}
        </p>
        <div
          ref="commitList"
          class="flex flex-col w-full h-full overflow-scroll justify-between"
        >
          <div class="flex items-end h-1/2">
            <div class="flex relative">
              <CommitView
                v-for="(commit, index) in commits"
                :key="index"
                :commit="commit"
                :prev-commit="index - 1 >= 0 ? commits[index - 1] : null"
              />
            </div>
          </div>
          <div class="h-2/5">
            <CommitDetails :files="files" />
          </div>
        </div>
      </div>
    </div>
    <button :disabled="!prevIsActive" @click="prev">prev</button>
    <button :disabled="!nextIsActive" @click="next">next</button>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useFolder } from '@/composables/useFolder';
import { useGit } from '@/composables/useGit';

import { CommitDetails, CommitView, SideBar } from './components';

export default {
  name: 'GitViewModule',

  components: {
    CommitView,
    SideBar,
    CommitDetails,
  },

  setup() {
    const { folderPath } = useFolder();
    const router = useRouter();
    const {
      getCommits,
      getBranchs,
      checkoutBranch,
      headCommitSha,
      commits,
      branchs,
      getGitLogsByOffset,
      files,
    } = useGit();

    const commitList = ref(null);
    const offset = ref(commits.value.totalCommits - 10);
    const prevIsActive = ref(true);
    const nextIsActive = ref(false);

    onBeforeMount(() => {
      if (!folderPath.value) router.push('/');
      getCommits();
      getBranchs();
    });

    onMounted(() => {
      commitList.value.scrollLeft = commitList.value.scrollWidth;
    });

    const next = () => {
      offset.value += 10;
      if (offset.value + 10 >= commits.value.totalCommits) {
        nextIsActive.value = false;
        prevIsActive.value = true;
      } else {
        prevIsActive.value = true;
        nextIsActive.value = true;
      }
      getGitLogsByOffset(offset.value);
    };

    const prev = () => {
      offset.value -= 10;
      if (offset.value < 0) {
        offset.value = 0;
        prevIsActive.value = false;
      } else {
        prevIsActive.value = true;
        nextIsActive.value = true;
      }
      getGitLogsByOffset(offset.value);
    };

    return {
      commits,
      branchs,
      checkoutBranch,
      headCommitSha,
      folderPath,
      commitList,
      offset,
      next,
      prev,
      nextIsActive,
      prevIsActive,
      files,
    };
  },
};
</script>

<style></style>
