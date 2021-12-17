'use strict';

import { ipcRenderer } from 'electron';

export function getGitLogs(folderPath) {
  ipcRenderer.send('getGitLogs-event', folderPath);
  return new Promise((resolve, reject) => {
    ipcRenderer.on('getGitLogs-reply', (event, args) => {
      if (args.error) {
        reject(args.message);
      }
      resolve(args);
    });
  });
}
