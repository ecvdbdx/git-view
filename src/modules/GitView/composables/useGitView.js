import { ref } from '@vue/reactivity';

const isDetailsOpened = ref(false);
const isFileDetailsOpened = ref(false);
const shaCommit = ref('');
const prevShaCommit = ref('');

export const useGitView = () => ({
  isDetailsOpened,
  isFileDetailsOpened,
  shaCommit,
  prevShaCommit,
});
