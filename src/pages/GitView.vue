<template>
  <div class="flex h-full flex-col">
    <div class="flex justify-between py-4 px-4">
      <router-link to="/" class="bg-green-500 px-5 py-2 text-white rounded"
        >Back</router-link
      >
      <div>{{ folderPath }}</div>
      <div></div>
    </div>
    <div class="w-full flex h-full">
      <div class="flex self-center line relative">
        <div
          v-for="commit in commits"
          :key="commit.sha"
          class="px-4 text-center"
        >
          <div class="bg-gray-300 rounded-1/2 w-24 h-24"></div>
          <p class="pt-2">{{ commit.sha }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

import commits from '../mocks/commits.js';

export default {
  setup() {
    const route = useRoute();
    const { folderPath } = route.query;

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
