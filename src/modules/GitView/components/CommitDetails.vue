<template>
  <div
    id="details-sidebar"
    class="flex flex-col border-t-green-400 border-solid border-t-width-2"
  >
    <DsButton class="mx-4 mt-4">Close</DsButton>
    <p>{{ files.details }}</p>
    <ul
      class="flex flex-col justify-center text-xs flex-shrink-0 p-4 flex-grow-0"
    >
      <li
        v-for="([filename, affected_line, stat], index) in files.files"
        :key="index"
      >
        <span>{{ filename }}</span>
        <span>{{ affected_line }}</span>
        <span>{{ stat }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';

export default {
  name: 'CommitDetails',
  props: {
    files: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const details = computed(() => props.files.details);
    const files = computed(() => props.files.files);
  },
};
</script>
