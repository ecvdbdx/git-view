<template>
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-4xl font-bold text-green-500 text-center">
      Explore your repo
    </h1>
    <p class="mt-8 text-center text-grey-400">
      Select a git folder to begin your exploration.
    </p>
    <div class="mt-4">
      <DsButton @click="onButtonClick()"> Select a folder </DsButton>
      <p class="mt-2 text-sm text-red-500 text-center">
        {{ folderPathError }}
      </p>
    </div>
    <ProjectHistoryList
      v-if="projectsHistory"
      :project-list="projectsHistory"
    />
  </div>
</template>

<script>
import { onBeforeMount, ref } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

import { useLocalForage } from '@/composables/localForage';
import { useFolder } from '@/composables/useFolder';

import { ProjectHistoryList } from './components';

export default {
  components: { ProjectHistoryList },
  setup() {
    const router = useRouter();
    const { openFolderWindow, folderPathError } = useFolder();
    const { getProjectsHistory, folderPath } = useLocalForage();

    const projectsHistory = ref(null);

    const onButtonClick = async () => {
      await openFolderWindow();

      router.push({
        name: 'GitView',
        query: { folderPath },
      });
    };

    onBeforeMount(() => {
      getProjectsHistory().then((res) => {
        projectsHistory.value = res;
      });
    });

    return { onButtonClick, folderPathError, projectsHistory };
  },
};
</script>
