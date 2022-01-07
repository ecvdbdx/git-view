import { ipcRenderer } from 'electron';
import { ref } from 'vue';

import { useLocalForage } from './localForage';

const folderPath = ref('');
const folderPathError = ref('');
const { storeHistory } = useLocalForage();

const registerGetFolderEvent = (router) => {
  ipcRenderer.on('getFolderPath-reply', (event, args) => {
    if (args.isGit) {
      folderPath.value = args.folderPath[0];
      storeHistory(args.folderPath[0]);
      router.push({
        name: 'GitView',
        query: { folderPath: args.folderPath[0] },
      });
    } else {
      folderPathError.value = args.error;
    }
  });
};

const getFolderPath = () => {
  ipcRenderer.send('getFolderPath-event');
};

const setFolderPath = (historyFolderPath) => {
  folderPath.value = historyFolderPath;
};

export const useFolder = () => ({
  folderPath,
  folderPathError,
  getFolderPath,
  registerGetFolderEvent,
  setFolderPath,
});
