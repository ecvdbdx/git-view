import {
  GET_FILE_DETAILS_EVENT,
  GET_GIT_BRANCHS_EVENT,
  GET_GIT_BRANCHS_INFO_EVENT,
  GET_GIT_DIFF_EVENT,
  GET_GIT_LOGS_EVENT,
  GIT_CHECKOUT,
} from '../../utils/constants';
import GitReader from '../services/gitReader';
const gitReader = new GitReader();

export default [
  {
    name: GET_GIT_LOGS_EVENT,
    fct: async (event, folderPath, offset, limit) => {
      const commitArray = await gitReader.getGitLogs(folderPath, offset, limit);
      return commitArray;
    },
  },
  {
    name: GET_GIT_BRANCHS_EVENT,
    fct: async (event, folderPath) => {
      const branchsArray = await gitReader.getGitBranchs(folderPath);
      return branchsArray;
    },
  },
  {
    name: GIT_CHECKOUT,
    fct: (event, folderPath, target) => {
      gitReader.checkoutBranch(folderPath, target);
    },
  },
  {
    name: GET_GIT_BRANCHS_INFO_EVENT,
    fct: async (event, folderPath) => {
      const nbCommit = await gitReader.getGitBranchsInfo(folderPath);
      return nbCommit;
    },
  },
  {
    name: GET_GIT_DIFF_EVENT,
    fct: async (event, folderPath, target, stat) => {
      const details = await gitReader.getGitDiff(folderPath, target, stat);
      return details;
    },
  },
  {
    name: GET_FILE_DETAILS_EVENT,
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
