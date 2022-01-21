<template>
  <div
    id="sidebar"
    class="
      flex flex-col
      h-full
      border-r-green-400 border-solid border-r-width-2
    "
  >
    <DsButton class="mx-4 mt-4" to="/">Back</DsButton>
    <div class="overflow-scroll">
      <ul
        class="
          flex flex-col
          justify-center
          text-xs
          flex-shrink-0
          p-4
          flex-grow-0
        "
      >
        <li
          class="p-2 cursor-pointer"
          :class="{ 'text-green-500 font-semibold': isCurrent }"
          v-for="({ name, isCurrent }, index) in branchs"
          :key="index"
          @click="checkoutBranch(name)"
        >
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useGit } from '@/composables/useGit';
export default {
  name: 'SideBar',

  props: {
    branchs: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const { checkoutBranch } = useGit();
    return {
      checkoutBranch,
    };
  },
};
</script>

<style></style>
