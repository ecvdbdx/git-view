<template>
  <div class="flex h-full flex-col">
    <div class="relative flex justify-between py-4 px-4">
      <DsButton to="/">Back</DsButton>
      <div class="text-center absolute w-full text-align-middle">
        {{ folderPath }}
      </div>
      <div />
    </div>
    <div class="flex h-full items-center">
      <ul
        class="
          flex flex-col
          justify-center
          text-xs
          border-r-green-400 border-solid border-r-width-2
          h-full
          flex-shrink-0
          p-r-4
        "
      >
        <li
          class="p-2 cursor-pointer"
          :class="{ 'text-green-500': isCurrent }"
          v-for="({ name, isCurrent }, bindex) in branchs"
          :key="bindex"
          @click="checkoutBranch(name)"
        >
          {{ name }}
        </li>
      </ul>
      <div class="w-full flex h-full overflow-scroll">
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
