import {
  GET_FOLDER_PATH_EVENT,
  GET_FOLDER_PATH_REPLY,
} from '../../utils/constants';
import FolderReader from '../services/folderReader';

export default [
  {
    name: GET_FOLDER_PATH_EVENT,
    fct: (win) => (event) => {
      const folderReader = new FolderReader(win);
      folderReader
        .getFolderPath()
        .then((path) => {
          event.reply(GET_FOLDER_PATH_REPLY, path);
        })
        .catch((error) => {
          event.reply(GET_FOLDER_PATH_REPLY, error);
        });
    },
  },
];
