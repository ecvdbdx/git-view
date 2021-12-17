import localforage from 'localforage';

const storeHistory = async (project) => {
  await localforage.getItem('projectsHistory').then((projectsHistory) => {
    if (projectsHistory === null) {
      localforage.setItem('projectsHistory', [project]);
    } else {
      if (!checkFolderPathExist(projectsHistory, project)) {
        if (projectsHistory.length === 4) {
          projectsHistory[0] = project;
        } else {
          projectsHistory.push(project);
        }
        localforage.setItem('projectsHistory', projectsHistory);
      }
    }
  });
};

const getProjectsHistory = () => {
  return localforage.getItem('projectsHistory').then((projectsHistory) => {
    if (projectsHistory === null) {
      return { error: true, message: 'You have not yet selected any projects' };
    }
    return { error: false, message: projectsHistory };
  });
};

const checkFolderPathExist = (projectsHistory, folderPath) => {
  return projectsHistory.includes(folderPath);
};

export const localForage = () => ({
  getProjectsHistory,
  storeHistory,
});
