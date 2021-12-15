import { exec } from 'child_process';

export default class GitReader {
  commitsParser(gitString) {
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
          isHead: refNames ? refNames.includes('(HEAD') : false,
        };
      })
      .reverse();
  }
  branchsParser(branchList) {
    return branchList
      .split('\n')
      .map((branch) => ({
        name: branch.replace('*', '').trim(),
        isCurrent: branch.includes('*'),
      }))
      .reverse()
      .filter(({ name }) => name);
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
  async getGitLogs(path, nbCommit = 10) {
    const commandResponse = await this.execGit(
      path,
      `git log --max-count=${nbCommit} --pretty='format:%h$$%s$$%cd$$%an$$%d'`
    );

    return this.commitsParser(commandResponse);
  }

  /**
   * @param {string} path - Path of the git folder
   * @returns Promise of Array
   */
  async getGitBranchs(path) {
    const commandResponse = await this.execGit(path, 'git branch');
    return this.branchsParser(commandResponse);
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
