import { ipcRenderer } from 'electron';
import { ref } from 'vue';

import { useLocalForage } from './localForage';

const { storeHistory } = useLocalForage();

const folderPath = ref('');
const folderPathError = ref('');

const openFolderWindow = async () => {
  const response = await ipcRenderer.invoke('getFolderPath-event');

  if (response.isGit) {
    setFolderPath(response.folderPath[0]);
    storeHistory(response.folderPath[0]);
  } else folderPathError.value = response.error;
};

const setFolderPath = (historyFolderPath) => {
  folderPath.value = historyFolderPath;
};

export const useFolder = () => ({
  folderPath,
  folderPathError,
  openFolderWindow,
  setFolderPath,
});
