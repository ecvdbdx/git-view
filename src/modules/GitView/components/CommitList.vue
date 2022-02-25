<template>
  <div class="flex justify-end w-full h-full">
    <div
      class="flex self-center relative"
      ref="commitList"
      :style="styleScroll"
    >
      <CommitView :commit="{}" />
      <CommitView :commit="{}" ref="lastCommit" />
      <CommitView
        v-for="(commit, commitIndex) in commits"
        :key="commitIndex"
        :commit="commit"
      />
    </div>
  </div>
</template>

<script>
import { useIntersectionObserver } from '@vueuse/core';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import { useGit } from '@/composables/useGit';

import CommitView from './CommitView.vue';

export default {
  name: 'CommitList',

  components: {
    CommitView,
  },

  props: {
    commits: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const { getCommits, index } = useGit();

    const commitList = ref(null);
    const scroll = ref(0);

    const lastCommit = ref(null);
    const targetIsVisible = ref(false);

    const { stop } = useIntersectionObserver(
      lastCommit,
      ([{ isIntersecting }]) => {
        targetIsVisible.value = isIntersecting;
      }
    );

    const addCommits = () => {
      index.value++;

      getCommits();
    };

    const styleScroll = computed(
      () => `transform: translateX(${scroll.value}px)`
    );

    const scrollHorizontal = (e) => {
      e.preventDefault();
      if (scroll.value + e.deltaX < 0) scroll.value = 0;
      else scroll.value += e.deltaX;
    };

    onMounted(() => {
      commitList.value.addEventListener('wheel', scrollHorizontal);
    });
    onUnmounted(() => stop());

    watch(targetIsVisible, (newValue) => {
      if (props.commits.length > 0 && newValue) addCommits();
    });

    return {
      addCommits,
      styleScroll,
      commitList,
      lastCommit,
      targetIsVisible,
    };
  },
};
</script>
