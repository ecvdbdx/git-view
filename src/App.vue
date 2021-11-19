<template>
  <homepage msg="Welcome to Vue.js App" />
</template>

<script>

import 'windi.css'
import Homepage from './components/Homepage.vue';

export default {
  name: "App",
  components: {
    Homepage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
