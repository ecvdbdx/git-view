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

  getGitLogs(path) {
    return new Promise((resolve, reject) => {
      exec(
        `git log HEAD --max-count=3 --pretty='format:%h$$%s$$%cd$$%an'`,
        { cwd: path },
        function (err, stdout) {
          resolve(() => this.parser(stdout));
          reject(() => err);
        }
      );
    });
  }
}
