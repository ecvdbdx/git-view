import {
  GET_GIT_BRANCHS_EVENT,
  GET_GIT_BRANCHS_REPLY,
  GET_GIT_DIFF_EVENT,
  GET_GIT_DIFF_REPLY,
  GET_GIT_LOGS_BY_OFFSET_EVENT,
  GET_GIT_LOGS_BY_OFFSET_REPLY,
  GET_GIT_LOGS_EVENT,
  GET_GIT_LOGS_REPLY,
  GIT_CHECKOUT,
} from '../../utils/constants';
import GitReader from '../services/gitReader';
const gitReader = new GitReader();

export default [
  {
    name: GET_GIT_LOGS_EVENT,
    fct: () => (event, folderPath) => {
      gitReader.getGitLogs(folderPath).then((commitArray) => {
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
    name: GET_GIT_LOGS_BY_OFFSET_EVENT,
    fct: () => (event, offset) => {
      gitReader.getGitLogsByOffset(offset).then((commits) => {
        event.reply(GET_GIT_LOGS_BY_OFFSET_REPLY, commits);
      });
    },
  },
  {
    name: GET_GIT_DIFF_EVENT,
    fct: () => (event, folderPath, target, stat) => {
      gitReader.getGitDiff(folderPath, target, stat).then((details) => {
        event.reply(GET_GIT_DIFF_REPLY, details);
      });
    },
  },
];
