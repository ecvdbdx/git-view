<template>
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-4xl font-bold text-green-500 text-center">
      Bienvenue sur Git View
    </h1>
    <p class="mt-8 text-center text-grey-400">
      Sélectionnez un dossier contenant un repository git.
    </p>
    <div class="mt-4">
      <DsButton @click="onButtonClick()"> Selectionner un dossier </DsButton>
      <p class="mt-2 text-sm text-red-500 text-center">
        {{ folderPathError }}
      </p>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

import { useFolder } from '@/composables/useFolder';

export default {
  setup() {
    const { getFolderPath, registerGetFolderEvent, folderPathError } =
      useFolder();
    const router = useRouter();

    const onButtonClick = async () => {
      getFolderPath();
    };

    onMounted(() => {
      registerGetFolderEvent(router);
    });

    return { onButtonClick, folderPathError };
  },
};
</script>
