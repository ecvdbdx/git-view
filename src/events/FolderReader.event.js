import FolderReader from '../services/folderReader';
import { GET_PATH } from '../utils/constants/FolderEvents';

export default [
  {
    name: GET_PATH,
    fct: async (event, win) => {
      try {
        const folderReader = new FolderReader(win);
        const path = await folderReader.getFolderPath();
        return path;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
];
