import { exec } from 'child_process';

export default class GitReader {
  constructor() {}

  parser(gitString) {
    return gitString.split('\n').map((commit) => {
      const commitArray = commit.split('$$');
      return {
        sha: commitArray[0],
        message: commitArray[1],
        date: commitArray[2],
        author: commitArray[3],
      };
    });
  }

  getGitLog(path) {
    exec(
      `git log HEAD --max-count=3 --pretty='format:%h$$%s$$%cd$$%an'`,
      { cwd: path },
      function (err, stdout) {
        console.log(this.parser(stdout));
      }
    );
  }
}
