"use strict";

const { dialog } = require("electron");
import { access } from "fs/promises";

class folderReader {
  constructor(electronWindow) {
    this.window = electronWindow;
    this.options = {
      title: "Choose a github project",
      defaultPath: "D:\\electron-app",
      buttonLabel: "Select this folder",
      filters: [{ name: "All Files", extensions: ["*"] }],
      properties: ["openDirectory"],
    };
  }

  getFolderPath() {
    let folderPath = dialog.showOpenDialog(this.window, this.options);
    return folderPath.then((res) => {
      return this.checkIsGitFolder(res.filePaths);
    });
  }

  checkIsGitFolder(folderPath) {
    return access(`${folderPath}/.git`)
      .then(() => {
        return folderPath;
      })
      .catch(() => {
        return "This folder does not contain a git folder";
      });
  }
}
export default folderReader;
