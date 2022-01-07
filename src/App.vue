<template>
  <router-view />
</template>

<script>
import 'windi.css';

import { useRouter } from 'vue-router';

export default {
  name: 'App',
  components: {},
  setup() {
    const router = useRouter();
    router.push('/');
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
</style>
