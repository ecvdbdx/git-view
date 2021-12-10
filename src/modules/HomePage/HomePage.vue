<template>
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-4xl font-bold text-green-500 text-center">
      Bienvenue sur Git View
    </h1>
    <p class="mt-8 text-center text-grey-400">
      Sélectionnez un dossier contenant un repository git.
    </p>
    <div class="mt-4">
      <DsButton @click="handleClick()"> Selectionner un dossier </DsButton>
      <p class="mt-2 text-sm text-red-500 text-center">
        {{ folderServiceResponse }}
      </p>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const folderServiceResponse = ref('');

    const handleClick = () => {
      ipcRenderer.send('getFolderPath-event');
    };

    const resolveFolder = () => {
      ipcRenderer.on('getFolderPath-reply', (event, args) => {
        if (args.isGit) {
          router.push({
            name: 'GitView',
            query: { folderPath: args.folderPath[0] },
          });
        } else {
          folderServiceResponse.value = args.error;
        }
      });
    };

    resolveFolder();
    return { handleClick, resolveFolder, folderServiceResponse };
  },
};
</script>
