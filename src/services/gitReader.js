import { exec } from 'child_process';

export default class GitReader {
  parser(gitString) {
    const gitArray = gitString.split(/\r?\n/g);
    return gitArray
      .map((commit) => {
        const [sha, message, date, author, refNames] = commit
          .trim()
          .split('$$');
        return {
          sha,
          message,
          date,
          author,
          isHead: refNames ? refNames.includes('(HEAD') : false,
        };
      })
      .reverse();
  }

  /**
   * @param {string} path - Path of the git folder
   * @param {string} command - Git command
   * @returns {Promise <string>}
   */
  execGit(path, command) {
    return new Promise((resolve, reject) => {
      exec(command, { cwd: path }, (err, stdout) => {
        if (err) {
          return reject(err);
        }
        resolve(stdout);
      });
    });
  }

  /**
   * @param {string} path - Path of the git folder
   * @param {number} nbCommit - Number of commit
   * @returns {Promise <Array>}
   */
  async getGitLogs(path) {
    const commandResponse = await this.execGit(
      path,
      `git log --pretty='format:%h$$%s$$%cd$$%an$$%d'`
    );
    return this.commitsParser(commandResponse);
  }

  /**
   * @param {string} path - Path of the git folder
   * @returns Promise of Array
   */
  async getGitBranchs(path) {
    const commandResponse = await this.execGit(path, 'git branch');
    return commandResponse.split('\n').map((branch) => branch.trim());
  }

  /**
   * @param {string} path - Path of the git folder
   * @param {string} branch - Name of the branch to checkout
   * @returns {void}
   */
  async checkoutBranch(path, branch) {
    await this.execGit(path, `git checkout ${branch}`);
  }

  /**
   * @param {string} path - Path of the git folder
   * @returns {void}
   */
  async fetchAllGit(path) {
    await this.execGit(path, 'git fetch --all');
  }
}
