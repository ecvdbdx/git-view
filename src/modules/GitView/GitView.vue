<template>
  <div class="flex h-full flex-col overflow-hidden">
    <div class="flex h-full items-center">
      <SideBar :branchs="branchs" />
      <div class="w-full flex h-full overflow-scroll relative">
        <p class="text-center absolute w-full text-align-middle py-4">
          {{ folderPath }}
        </p>
        <div class="flex justify-end w-full h-full" :style="styleScroll">
          <div class="flex self-center relative" ref="commitList">
            <button @click="addCommits">click</button>
            <CommitView
              v-for="(commit, commitIndex) in commits"
              :key="commitIndex"
              :commit="commit"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
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
      checkoutBranch,
      headCommitSha,
      commits,
      branchs,
      index,
    } = useGit();

    const commitList = ref(null);
    const scroll = ref(0);

    const styleScroll = computed(
      () => `transform: translateX(${scroll.value}px)`
    );

    const scrollHorizontal = (e) => {
      e.preventDefault();
      if (scroll.value + e.deltaY < 0) scroll.value = 0;
      else scroll.value += e.deltaY;
    };

    const addCommits = () => {
      index.value++;

      getCommits();
    };

    onBeforeMount(() => {
      if (!folderPath.value) router.push('/');
      getCommits();
      getBranchs();
    });

    onMounted(() => {
      commitList.value.addEventListener('wheel', scrollHorizontal);
    });

    return {
      commits,
      branchs,
      checkoutBranch,
      headCommitSha,
      folderPath,
      commitList,
      addCommits,
      styleScroll,
    };
  },
};
</script>

<style></style>
