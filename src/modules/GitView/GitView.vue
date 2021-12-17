<template>
  <div class="flex h-full flex-col">
    <div class="relative flex justify-between py-4 px-4">
      <DsButton to="/">Back</DsButton>
      <div class="text-center absolute w-full text-align-middle">
        {{ folderPath }}
      </div>
      <div />
    </div>
    <div class="w-full flex h-full">
      <div class="flex self-center relative">
        <CommitView
          v-for="(commit, index) in commits"
          :key="index"
          :commit="commit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import { CommitView } from './components';
import { getGitLogs } from './services/gitView';

export default {
  name: 'GitViewModule',

  components: {
    CommitView,
  },

  setup(props) {
    const route = useRoute();
    const { folderPath } = route.query;

    const commits = ref([]);

    onBeforeMount(() => {
      getGitLogs(props.folderPath)
        .then((commitsArray) => {
          commits.value = commitsArray;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return { commits, folderPath };
  },
};
</script>

<style></style>
