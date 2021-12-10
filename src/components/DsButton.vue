<template>
  <component
    :is="buttonType"
    :to="to"
    :href="href"
    class="
      bg-green-500
      px-5
      py-2
      text-white
      rounded
      block
      cursor-pointer
      no-underline
    "
  >
    <slot />
  </component>
</template>

<script>
import { computed } from '@vue/reactivity';

export default {
  name: 'DsButton',

  props: {
    to: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const buttonType = computed(() => {
      if (props.to) {
        return 'router-link';
      }

      if (props.href) {
        return 'a';
      }

      return 'button';
    });
    return {
      buttonType,
    };
  },
};
</script>
