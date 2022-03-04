import { ipcRenderer } from 'electron';
import { computed, ref } from 'vue';

import { useFolder } from './useFolder';

const { folderPath } = useFolder();

const commits = ref([]);
const branchs = ref([]);
const totalCommits = ref(0);
const commitDetails = ref([]);

const headCommitSha = computed({
  get: () => commits.value.find((commit) => commit.isHead)?.sha,
  set: (newValue) => {
    commits.value.commits.map((commit) => {
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

const getGitLogsByOffset = (offset) => {
  ipcRenderer.send('getGitLogsByOffset-event', offset);

  ipcRenderer.on('getGitLogsByOffset-reply', (event, commitObject) => {
    totalCommits.value = commitObject.totalCommits;
    commits.value = commitObject;
  });
};
const getDiffCommit = (commitSha, stat = true) => {
  ipcRenderer.send('getGitDiff-event', folderPath.value, commitSha, stat);

  ipcRenderer.on('getGitDiff-reply', (event, detailsList) => {
    commitDetails.value = detailsList;
  });
};

export const useGit = () => ({
  getCommits,
  checkoutBranch,
  getBranchs,
  checkoutCommit,
  getGitLogsByOffset,
  getDiffCommit,
  commits,
  branchs,
  headCommitSha,
  totalCommits,
  commitDetails,
});
