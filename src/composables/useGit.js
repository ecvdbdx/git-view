import { ipcRenderer } from 'electron';
import { computed, ref } from 'vue';

import { useFolder } from './useFolder';

const { folderPath } = useFolder();

const commits = ref([]);
const branchs = ref([]);

const headCommitSha = computed({
  get: () => commits.value.find((commit) => commit.isHead)?.sha,
  set: (newValue) => {
    commits.value.map((commit) => {
      commit.isHead = commit.sha === newValue;
      return commit;
    });
  },
});

const getCommits = () => {
  ipcRenderer.send('getGitLogs-event', folderPath.value);
  ipcRenderer.on('getGitLogs-reply', (event, commitList) => {
    commits.value = commitList;
  });
};

const checkoutBranch = (branchName) => {
  ipcRenderer.send('gitCheckout', folderPath.value, branchName);
  getBranchs();
  getCommits();
};

const getBranchs = () => {
  ipcRenderer.send('getGitBranchs-event', folderPath.value);

  ipcRenderer.on('getGitBranchs-reply', (event, branchList) => {
    branchs.value = branchList;
  });
};

const checkoutCommit = (commitSha) => {
  ipcRenderer.send('gitCheckout', folderPath.value, commitSha);
  headCommitSha.value = commitSha;
};

export const useGit = () => ({
  getCommits,
  checkoutBranch,
  getBranchs,
  checkoutCommit,
  commits,
  branchs,
  headCommitSha,
});
