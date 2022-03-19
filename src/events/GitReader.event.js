import {
  DO_CHECKOUT,
  GET_BRANCHS,
  GET_BRANCHS_INFO,
  GET_DIFF,
  GET_FILE_DETAILS,
  GET_LOGS,
} from '@/utils/constants/GitEvents';

import GitReader from '../services/gitReader';

const gitReader = new GitReader();

export default [
  {
    name: GET_LOGS,
    fct: async (event, folderPath, offset, limit) => {
      const commitArray = await gitReader.getGitLogs(folderPath, offset, limit);
      return commitArray;
    },
  },
  {
    name: GET_BRANCHS,
    fct: async (event, folderPath) => {
      const branchsArray = await gitReader.getGitBranchs(folderPath);
      return branchsArray;
    },
  },
  {
    name: DO_CHECKOUT,
    fct: (event, folderPath, target) => {
      gitReader.checkoutBranch(folderPath, target);
    },
  },
  {
    name: GET_BRANCHS_INFO,
    fct: async (event, folderPath) => {
      const nbCommit = await gitReader.getGitBranchsInfo(folderPath);
      return nbCommit;
    },
  },
  {
    name: GET_DIFF,
    fct: async (event, folderPath, target, stat) => {
      const details = await gitReader.getGitDiff(folderPath, target, stat);
      return details;
    },
  },
  {
    name: GET_FILE_DETAILS,
    fct: async (event, folderPath, sha, prevSha, fileName) => {
      const details = await gitReader.getFileDetails(
        folderPath,
        sha,
        prevSha,
        fileName
      );
      return details;
    },
  },
];
