import { ipcRenderer } from 'electron';
import { computed, ref } from 'vue';

import { useFolder } from './useFolder';

const { folderPath } = useFolder();

const commits = ref([]);
const branchs = ref([]);
const totalCommits = ref(0);
const limit = ref(10);
const index = ref(0);
const offset = computed(() => limit.value * index.value);

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

export const useGit = () => ({
  getCommits,
  checkoutBranch,
  getBranchs,
  checkoutCommit,
  commits,
  branchs,
  headCommitSha,
  getGitLogsByOffset,
  totalCommits,
  index,
});
