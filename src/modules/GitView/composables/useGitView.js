import { ref } from '@vue/reactivity';

const isDetailsOpened = ref(false);
const shaCommit = ref('');

export const useGitView = () => ({ isDetailsOpened, shaCommit });
