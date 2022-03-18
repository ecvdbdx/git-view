import { exec } from 'child_process';

export default class GitReader {
  constructor() {}

  commitsParser(gitString) {
    return gitString.split('\n').map((commit) => {
      const [sha, message, date, author, refNames] = commit.trim().split('$$');
      return {
        sha: sha.replace("'format:", ''),
        message,
        date,
        author,
        isHead: refNames ? refNames.includes('(HEAD') : false,
      };
    });
  }

  branchsParser(branchList) {
    return branchList
      .split('\n')
      .map((branch) => ({
        name: branch.replace('*', '').trim(),
        isCurrent: branch.includes('*'),
      }))
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
   * @returns {Promise <Array>}
   */
  async getGitLogs(path, offset = 0, limit = 10) {
    const commandResponse = await this.execGit(
      path,
      `git log --pretty='format:%h$$%s$$%cd$$%an$$%d' --max-count=${limit} --skip=${offset} --reverse`
    );

    return this.commitsParser(commandResponse);
  }

  /**
   * @param {string} path - Path of the git folder
   * @returns Promise of Array
   */
  async getGitBranchs(path) {
    const commandResponse = await this.execGit(path, 'git branch -a');
    return this.branchsParser(commandResponse);
  }

  /**
   * @param {string} path - Path of the git folder
   * @returns Promise of Array
   */
  async getGitBranchsInfo(path) {
    const commandResponse = await this.execGit(
      path,
      'git rev-list --count HEAD'
    );
    return commandResponse;
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

  async getGitDiff(path, commit, stat) {
    const commandResponse = await this.execGit(
      path,
      `git show ${commit} --pretty="format:" ${stat ? '--stat' : ''}`
    );
    return this.commitStatParser(commandResponse);
  }

  commitStatParser(commitDetails) {
    const list = commitDetails
      .trim()
      .split('\n')
      .map((item) =>
        item
          .split('|')
          .map((value, index) => {
            if (index === 1) {
              return value.trim().split(' ');
            } else {
              return value.trim();
            }
          })
          .flat()
      );

    return {
      recap: list.pop()[0],
      files: list,
    };
  }
}
