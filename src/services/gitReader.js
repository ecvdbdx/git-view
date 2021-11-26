import { exec } from 'child_process';

export default class GitReader {
  constructor() {}

  parser(gitString) {
    const gitArray = gitString.split('ùù');
    console.log(`gitArray`, gitArray);
    return gitArray.map((commit) => {
      const commitArray = gitString.split('$$');
      console.log(`commitArray`, commitArray);
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
      `git log HEAD --max-count=3 --pretty='format:%h$$%s$$%cd$$%anùù'`,
      { cwd: path },
      function (err, stdout) {
        console.log(this.parser(stdout));
      }
    );
  }
}
