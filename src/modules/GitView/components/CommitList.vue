<template>
  <div class="flex justify-end w-full h-full" :style="styleScroll">
    <div class="flex self-center relative" ref="commitList">
      <button @click="addCommits">click</button>
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
import { useElementVisibility } from '@vueuse/core';
import { computed, onMounted, ref, watch } from 'vue';

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

  setup() {
    const { getCommits, index } = useGit();

    const commitList = ref(null);
    const lastCommit = ref(null);
    const scroll = ref(0);
    const targetIsVisible = computed(() => {
      if (lastCommit?.value?.$el) {
        return useElementVisibility(commitList.value);
      }
      return null;
    });

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

    watch(targetIsVisible, (newValue) => {
      console.log(newValue);
    });

    return {
      addCommits,
      styleScroll,
      commitList,
      lastCommit,
    };
  },
};
</script>
