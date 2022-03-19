import { ipcRenderer } from 'electron';
import gitDiffParser from 'gitdiff-parser';
import { computed, ref } from 'vue';

import {
  DO_CHECKOUT,
  GET_BRANCHS,
  GET_BRANCHS_INFO,
  GET_DIFF,
  GET_FILE_DETAILS,
  GET_LOGS,
} from '@/utils/constants/GitEvents';

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
const fileDetails = ref([]);

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
    GET_LOGS,
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
  await ipcRenderer.invoke(DO_CHECKOUT, folderPath.value, branchName);
  await getBranchs();
  await getBranchsInfo();
  resetState();
  await getCommits();
};

const getBranchs = async () => {
  const result = await ipcRenderer.invoke(GET_BRANCHS, folderPath.value);
  branchs.value = result;
};

const getBranchsInfo = async () => {
  const branchInfo = await ipcRenderer.invoke(
    GET_BRANCHS_INFO,
    folderPath.value
  );
  currentBranchCommits.value = parseInt(branchInfo);
};

const checkoutCommit = (commitSha) => {
  ipcRenderer.invoke(DO_CHECKOUT, folderPath.value, commitSha);
  headCommitSha.value = commitSha;
};

const getDiffCommit = async (commitSha, stat = true) => {
  commitDetails.value = await ipcRenderer.invoke(
    GET_DIFF,
    folderPath.value,
    commitSha,
    stat
  );
};
const getFileDetails = async (commitSha, prevShaCommit, fileName) => {
  const data = await ipcRenderer.invoke(
    GET_FILE_DETAILS,
    folderPath.value,
    commitSha,
    prevShaCommit,
    fileName
  );

  fileDetails.value = gitDiffParser.parse(data);
};

export const useGit = () => ({
  getCommits,
  checkoutBranch,
  getBranchs,
  checkoutCommit,
  getBranchsInfo,
  getDiffCommit,
  getFileDetails,
  commits,
  branchs,
  headCommitSha,
  index,
  currentBranchCommits,
  files,
  commitDetails,
  fileDetails,
  resetState,
});
