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
          sha: sha.replace("'format:", ''),
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

  commitDetailsParser(commitDetails) {
    const allResultCommandLine = commitDetails;

    const allLinesSplited = allResultCommandLine.split('\n');

    let allFiles = [];

    for (let line in allLinesSplited) {
      line = parseInt(line);
      const lineValue = allLinesSplited[line];
      let lastIndex = allFiles.length - 1;
      let lastFile = allFiles[lastIndex];
      if (lineValue.includes('diff --git')) {
        allFiles.push({});
        lastIndex = allFiles.length - 1;
        lastFile = allFiles[lastIndex];
        lastFile.command = lineValue;
        lastFile.commits = allLinesSplited[line + 1];
        lastFile.oldFile = allLinesSplited[line + 2];
        lastFile.newFile = allLinesSplited[line + 3];
        lastFile.fileContent = [];
      } else if (lineValue.includes('@@ -')) {
        lastFile.fileContent.push({
          separationName: lineValue,
          separationContent: [],
        });
      } else if (
        !allLinesSplited[line - 1].includes('diff --git') &&
        !allLinesSplited[line - 2].includes('diff --git') &&
        !allLinesSplited[line - 3].includes('diff --git')
      ) {
        lastFile.fileContent[
          lastFile.fileContent.length - 1
        ].separationContent.push(lineValue);
      }
    }

    return allFiles;
  }
}
