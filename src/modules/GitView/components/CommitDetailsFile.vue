<template>
  <div class="bg-gray-100 border-gray-200 rounded-lg border-width-2 mt-2 pb-2">
    <div v-for="({ hunks }, fileKey) in fileDetails" :key="`${fileKey}-file`">
      <div
        v-for="({ content, changes }, hunkKey) in hunks"
        :key="hunkKey"
        class="text-xs"
      >
        <p class="text-gray-500 p-2">{{ content }}</p>
        <div
          v-for="(
            {
              content: lineContent,
              isDelete,
              isInsert,
              isNormal,
              lineNumber,
              newLineNumber,
              oldLineNumber,
            },
            lineKey
          ) in changes"
          :key="`${lineKey}-line`"
          class="flex items-center h-6"
          :class="[
            {
              'bg-red-100': isDelete,
              'bg-green-100': isInsert,
              'bg-white': isNormal,
            },
          ]"
        >
          <div
            class="flex gap-1 text-center h-full items-center"
            :class="[
              {
                'bg-red-200': isDelete,
                'bg-green-200': isInsert,
                'bg-white': isNormal,
              },
            ]"
          >
            <span class="min-w-10 block">{{ oldLineNumber }}</span>
            <span class="min-w-10 block">{{
              lineNumber ? lineNumber : newLineNumber
            }}</span>
          </div>
          <span
            :class="[
              'font-bold block text-center min-w-4',
              {
                'text-red-500': isDelete,
                'text-green-500': isInsert,
              },
            ]"
            >{{ isDelete ? '-' : isInsert ? '+' : ' ' }}</span
          >
          <pre
            class="flex-1"
            v-highlightjs="lineContent"
          ><code class="javascript bg-transparent"></code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'prismjs/themes/prism.css';

import { onMounted, watch } from 'vue';

import { useGit } from '@/composables/useGit';

import { useGitView } from '../composables/useGitView';

export default {
  name: 'CommitDetailsFiles',

  setup() {
    const { getFileDetails, fileDetails } = useGit();
    const { prevShaCommit, shaCommit, fileName } = useGitView();

    onMounted(() => {
      getFileDetails(shaCommit.value, prevShaCommit.value, fileName.value);
    });

    watch(shaCommit, (newSha) => {
      getFileDetails(newSha, prevShaCommit.value, fileName.value);
    });

    return {
      fileDetails,
    };
  },
};
</script>
