import {
  GET_GIT_BRANCHS_EVENT,
  GET_GIT_BRANCHS_INFO_EVENT,
  GET_GIT_BRANCHS_REPLY,
  GET_GIT_LOGS_EVENT,
  GET_GIT_LOGS_REPLY,
  GIT_CHECKOUT,
} from '../../utils/constants';
import GitReader from '../services/gitReader';
const gitReader = new GitReader();

export default [
  {
    name: GET_GIT_LOGS_EVENT,
    fct: () => (event, folderPath, offset, limit) => {
      gitReader.getGitLogs(folderPath, offset, limit).then((commitArray) => {
        event.reply(GET_GIT_LOGS_REPLY, commitArray);
      });
    },
  },
  {
    name: GET_GIT_BRANCHS_EVENT,
    fct: () => (event, folderPath) => {
      gitReader.getGitBranchs(folderPath).then((branchsArray) => {
        event.reply(GET_GIT_BRANCHS_REPLY, branchsArray);
      });
    },
  },
  {
    name: GIT_CHECKOUT,
    fct: () => async (event, folderPath, target) => {
      gitReader.checkoutBranch(folderPath, target).catch((error) => {
        console.error(error);
      });
    },
  },
  {
    name: GET_GIT_BRANCHS_INFO_EVENT,
    fct: () => async (event, folderPath) => {
      gitReader.getGitBranchsInfo(folderPath).catch((error) => {
        console.error(error);
      });
    },
  },
];
