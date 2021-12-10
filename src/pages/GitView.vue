<template>
  <GitViewModule :folder-path="folderPath" />
</template>

<script>
import { useRoute } from 'vue-router';

import GitViewModule from '@/modules/GitView';

export default {
  name: 'GitViewPage',

  components: {
    GitViewModule,
  },

  setup() {
    const route = useRoute();
    const { folderPath } = route.query;

    return { folderPath };
  },
};
</script>
