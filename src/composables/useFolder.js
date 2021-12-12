import { ipcRenderer } from 'electron';
import { ref } from 'vue';

const folderPath = ref('');
const folderPathError = ref('');

const registerGetFolderEvent = (router) => {
  ipcRenderer.on('getFolderPath-reply', (event, args) => {
    if (args.isGit) {
      folderPath.value = args.folderPath[0];
      router.push({
        name: 'GitView',
        query: { folderPath: args.folderPath[0] },
      });
    } else {
      folderPathError.value = args.error;
    }
  });
};

const getFolderPath = async () => {
  await ipcRenderer.send('getFolderPath-event');
};

export const useFolder = () => ({
  folderPath,
  folderPathError,
  getFolderPath,
  registerGetFolderEvent,
});
