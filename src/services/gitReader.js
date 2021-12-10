import { exec } from 'child_process';

export default class GitReader {
  parser(gitString) {
    return gitString
      .split('\n')
      .map((commit) => {
        const [sha, message, date, author, refNames] = commit
          .trim()
          .split('$$');
        return {
          sha,
          message,
          date,
          author,
          isHead: refNames ? refNames.includes('(HEAD)') : false,
        };
      })
      .reverse();
  }

  /**
   * @param {string} path - Path of the git folder
   * @param {number} nbCommit - Number of commit
   * @returns Promise of Array
   */
  getGitLogs(path, nbCommit = 10) {
    return new Promise((resolve, reject) => {
      exec(
        `git log origin --max-count=${nbCommit} --pretty='format:%h$$%s$$%cd$$%an$$%d'`,
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
