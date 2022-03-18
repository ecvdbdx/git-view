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
const files = ref([]);
const commitDetails = ref([]);

const headCommitSha = computed({
  get: () => commits.value.find((commit) => commit.isHead)?.sha,
  set: (newValue) => {
    commits.value.map((commit) => {
      commit.isHead = commit.sha === newValue;
      return commit;
    });
  },
});

const getCommits = async () => {
  const result = await ipcRenderer.invoke(
    'getGitLogs-event',
    folderPath.value,
    offset.value,
    limit.value
  );
  commits.value = [...result, ...commits.value];
};

const resetState = () => {
  commits.value = [];
  index.value = 0;
  currentBranchCommits.value = 0;
};

const checkoutBranch = async (branchName) => {
  await ipcRenderer.invoke('gitCheckout', folderPath.value, branchName);
  await getBranchs();
  await getBranchsInfo();
  resetState();
  await getCommits();
};

const getBranchs = async () => {
  const result = await ipcRenderer.invoke(
    'getGitBranchs-event',
    folderPath.value
  );
  branchs.value = result;
};

const getBranchsInfo = async () => {
  const branchInfo = await ipcRenderer.invoke(
    'getGitBranchsInfo-event',
    folderPath.value
  );
  currentBranchCommits.value = parseInt(branchInfo);
};

const checkoutCommit = (commitSha) => {
  ipcRenderer.invoke('gitCheckout', folderPath.value, commitSha);
  headCommitSha.value = commitSha;
};

const getDiffCommit = async (commitSha, stat = true) => {
  commitDetails.value = await ipcRenderer.invoke(
    'getGitDiff-event',
    folderPath.value,
    commitSha,
    stat
  );
};

export const useGit = () => ({
  getCommits,
  checkoutBranch,
  getBranchs,
  checkoutCommit,
  getBranchsInfo,
  getDiffCommit,
  commits,
  branchs,
  headCommitSha,
  index,
  currentBranchCommits,
  files,
  commitDetails,
  resetState,
});
