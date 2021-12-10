<template>
  <div class="flex h-full flex-col">
    <div class="relative flex justify-between py-4 px-4">
      <DsButton to="/">Back</DsButton>
      <div class="text-center absolute w-full text-align-middle">
        {{ folderPath }}
      </div>
      <div />
    </div>
    <div class="w-full flex h-full">
      <div class="flex self-center line relative">
        <CommitView
          v-for="(commit, index) in commits"
          :key="index"
          :commit="commit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import { CommitView } from './components';

export default {
  name: 'GitViewModule',

  components: {
    CommitView,
  },

  setup(props) {
    const route = useRoute();
    const { folderPath } = route.query;

    const commits = ref([]);

    const resolveGetGitLogs = () => {
      ipcRenderer.on('getGitLogs-reply', (event, args) => {
        commits.value = args;
      });
    };
    resolveGetGitLogs();
    onBeforeMount(() => {
      ipcRenderer.send('getGitLogs-event', props.folderPath);
    });

    return { commits, folderPath };
  },
};
</script>

<style>
.line::before {
  content: '';
  height: 2px;
  width: 100%;
  background-color: black;
  position: absolute;
  top: 40%;
  z-index: -1;
  transform: translate(-1rem, 0px);
}
</style>
