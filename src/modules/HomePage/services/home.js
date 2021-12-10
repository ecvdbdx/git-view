'use strict';

import { ipcRenderer } from 'electron';

export function getFolderPath() {
  ipcRenderer.send('getFolderPath-event');
  return new Promise((resolve, reject) => {
    ipcRenderer.on('getFolderPath-reply', (event, args) => {
      if (args.isGit) {
        resolve(args.folderPath[0]);
      } else {
        reject(args.error);
      }
    });
  });
}
