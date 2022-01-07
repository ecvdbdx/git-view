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
    <ProjectHistoryList :project-list="projectsHistory" />
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

import { useLocalForage } from '@/composables/localForage';
import { useFolder } from '@/composables/useFolder';

import { ProjectHistoryList } from './components';

export default {
  components: { ProjectHistoryList },
  setup() {
    const { getFolderPath, registerGetFolderEvent, folderPathError } =
      useFolder();

    const { getProjectsHistory } = useLocalForage();
    const router = useRouter();
    const projectsHistory = ref();

    const onButtonClick = async () => {
      getFolderPath();
    };

    getProjectsHistory().then((res) => {
      projectsHistory.value = res;
    });

    onMounted(() => {
      registerGetFolderEvent(router);
    });

    return { onButtonClick, folderPathError, projectsHistory };
  },
};
</script>
