import { exec } from 'child_process';

export default class GitReader {
  constructor() {
    this.commitList = [];
    this.totalCommit = 0;
  }

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
   * @returns {Promise <Array>}
   */
  async getGitLogs(path) {
    const commandResponse = await this.execGit(
      path,
      `git log --pretty='format:%h$$%s$$%cd$$%an$$%d'`
    );

    this.commitList = this.commitsParser(commandResponse);
    this.totalCommit = this.commitList.length;

    return this.getGitLogsByOffset(this.totalCommit - 10);
  }

  /**
   * @param {number} offset - Offset of commits
   * @param {number} limit - Number of commits to return
   * @returns {Promise <Array>}
   */
  async getGitLogsByOffset(offset, limit = 10) {
    const commitsByOffset = this.commitList.slice(offset, offset + limit);
    return {
      commits: commitsByOffset,
      totalCommits: this.totalCommit,
    };
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

  async getGitDiff(path, commit) {
    const commandResponse = await this.execGit(
      path,
      `git show ${commit} --pretty="format:" --stat`
    );
    return this.commitStatParser(commandResponse);
  }

  commitStatParser(commitFileList) {
    const list = commitFileList
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
      details: list.pop()[0],
      files: list,
    };
  }
}
