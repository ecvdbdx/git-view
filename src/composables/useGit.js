import { ipcRenderer } from 'electron';
import { computed, ref } from 'vue';

import { useFolder } from './useFolder';

const { folderPath } = useFolder();

const commits = ref([]);
const branchs = ref([]);
const totalCommits = ref(0);
const files = ref([]);
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

const getCommits = async () => {
  const result = await ipcRenderer.invoke('getGitLogs-event', folderPath.value);
  commits.value = result;
};

const checkoutBranch = async (branchName) => {
  await ipcRenderer.invoke('gitCheckout', folderPath.value, branchName);
  await getBranchs();
  await getCommits();
};

const getBranchs = async () => {
  const result = await ipcRenderer.invoke(
    'getGitBranchs-event',
    folderPath.value
  );
  branchs.value = result;
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
  getDiffCommit,
  commits,
  branchs,
  headCommitSha,
  totalCommits,
  files,
  commitDetails,
});
