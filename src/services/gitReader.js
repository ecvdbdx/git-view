import { exec } from 'child_process';

export default class GitReader {
  constructor() {}

  parser(gitString) {
    return gitString.split('\n').map((commit) => {
      const commitArray = commit.trim().split('$$');
      return {
        sha: commitArray[0],
        message: commitArray[1],
        date: commitArray[2],
        author: commitArray[3],
      };
    });
  }

  /**
   * @param {string} path - Path of the git folder
   * @param {number} nbCommit - Number of commit
   * @returns Promise of Array
   */
  getGitLogs(path, nbCommit = 10) {
    return new Promise((resolve, reject) => {
      exec(
        `git log HEAD --max-count=${nbCommit} --pretty='format:%h$$%s$$%cd$$%an'`,
        { cwd: path },
        (err, stdout) => {
          if (err) {
            return reject(err);
          }
          resolve(this.parser(stdout));
        }
      );
    });
  }
}
