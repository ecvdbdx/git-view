<template>
  <div
    class="bg-gray-300 rounded-lg px-4 py-2 m-2 flex items-center justify-start"
    @click="handleClick()"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 mr-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
      />
    </svg>
    <p>{{ projectPath }}</p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

import { useFolder } from '@/composables/useFolder';

export default {
  name: 'ProjectHistoryItem',

  props: {
    projectPath: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { setFolderPath } = useFolder();
    const router = useRouter();

    const handleClick = () => {
      setFolderPath(props.projectPath);
      router.push({
        name: 'GitView',
        query: { folderPath: props.projectPath },
      });
    };

    return { handleClick };
  },
};
</script>
