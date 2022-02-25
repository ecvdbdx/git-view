import { ipcRenderer } from 'electron';
import { computed, ref } from 'vue';

import { useFolder } from './useFolder';

const { folderPath } = useFolder();

const commits = ref([]);
const branchs = ref([]);
const limit = ref(10);
const index = ref(0);
const offset = computed(() => limit.value * index.value);
const currentBranchCommits = ref(0);

const headCommitSha = computed({
  get: () => commits.value.find((commit) => commit.isHead)?.sha,
  set: (newValue) => {
    commits.value.map((commit) => {
      commit.isHead = commit.sha === newValue;
      return commit;
    });
  },
});

ipcRenderer.on('getGitLogs-reply', (event, commitList) => {
  commits.value = [...commitList, ...commits.value];
});

const getCommits = () =>
  ipcRenderer.send(
    'getGitLogs-event',
    folderPath.value,
    offset.value,
    limit.value
  );

const checkoutBranch = (branchName) => {
  ipcRenderer.send('gitCheckout', folderPath.value, branchName);
  getBranchs();
  getBranchsInfo();
  getCommits();
};

const getBranchs = () => {
  ipcRenderer.send('getGitBranchs-event', folderPath.value);

  ipcRenderer.on('getGitBranchs-reply', (event, branchList) => {
    branchs.value = branchList;
  });
};
ipcRenderer.on('getGitBranchsInfo-reply', (event, branchInfo) => {
  currentBranchCommits.value = branchInfo;
});
const getBranchsInfo = () => {
  ipcRenderer.send('getGitBranchsInfo-event', folderPath.value);
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
  getBranchsInfo,
  commits,
  branchs,
  headCommitSha,
  index,
});
