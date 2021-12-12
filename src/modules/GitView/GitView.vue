<template>
  <div class="flex h-full flex-col">
    <div class="relative flex justify-between py-4 px-4">
      <DsButton to="/">Back</DsButton>
      <div class="text-center absolute w-full text-align-middle">
        {{ folderPath }}
      </div>
      <div />
    </div>
    <ul class="flex text-xs">
      <li
        class="p-2"
        v-for="(branch, bindex) in branchs"
        :key="bindex"
        @click="checkoutBranch(branch)"
      >
        {{ branch }}
      </li>
    </ul>
    <div class="w-full flex h-full">
      {{ headCommitSha }}
      <div class="flex self-center line relative">
        <CommitView
          v-for="(commit, index) in commits"
          :key="index"
          :commit="commit"
          @click="checkout(commit.sha)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import { computed, onBeforeMount, ref } from 'vue';
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
    const branchs = ref([]);
    const headCommitSha = computed({
      get: () => commits.value.find((commit) => commit.isHead)?.sha,
      set: (newValue) => {
        commits.value.map((commit) => {
          commit.isHead = commit.sha === newValue;
          return commit;
        });
      },
    });

    const checkout = (commitSha) => {
      ipcRenderer.send('gitCheckout', props.folderPath, commitSha);
      headCommitSha.value = commitSha;
    };

    const checkoutBranch = (branchName) => {
      ipcRenderer.send('gitCheckout', props.folderPath, branchName);
      getCommit();
    };

    const getCommit = () => {
      ipcRenderer.send('getGitLogs-event', props.folderPath);
      ipcRenderer.on('getGitLogs-reply', (event, args) => {
        commits.value = args;
      });
    };
    const getBranchs = () => {
      ipcRenderer.send('getGitBranchs-event', props.folderPath);

      ipcRenderer.on('getGitBranchs-reply', (event, args) => {
        branchs.value = args;
      });
    };

    onBeforeMount(() => {
      getCommit();
      getBranchs();
    });

    return {
      folderPath,
      commits,
      branchs,
      checkout,
      checkoutBranch,
      headCommitSha,
    };
  },
};
</script>

<style></style>
