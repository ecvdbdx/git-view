import { GET_FOLDER_PATH_EVENT } from '../../utils/constants';
import FolderReader from '../services/folderReader';

export default [
  {
    name: GET_FOLDER_PATH_EVENT,
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
