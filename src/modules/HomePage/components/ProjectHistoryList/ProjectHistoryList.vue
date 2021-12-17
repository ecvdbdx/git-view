<template>
  <div>
    <h2 class="text-2xl font-bold text-green-500 text-center">Last projects</h2>
    <h3 v-if="projectList.error" class="text-xl text-red-500 text-center">
      {{ projectList.message }}
    </h3>
    <ul v-else>
      <ProjectHistoryItem
        v-for="(project, index) in projectList.message"
        :key="index"
        :project-path="project"
      />
    </ul>
  </div>
</template>

<script>
import ProjectHistoryItem from '../ProjectHistoryItem';
export default {
  name: 'ProjectHistoryList',
  components: { ProjectHistoryItem },
  props: {
    projectList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
