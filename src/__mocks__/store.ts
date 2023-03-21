import type { WordingsStudent } from '@/types/wordingStudent';
import { createStore } from 'vuex';

export const storeMock = createStore({
  state: {
    wordings: [] as WordingsStudent[],
    deleteModalOpen: false as boolean,
    wordingId: 'test-id' as string,
    formWordingOpen: false as boolean,
    formWordingMode: '' as string,
    formWordingTitle: '' as string
  },
  getters: {
    getWordings: (state) => state.wordings,
    getIsLoading: () => false,
    getFormWordingOpen: () => storeMock.state.formWordingOpen,
    getFormWordingMode: () => storeMock.state.formWordingMode,
    getFormWordingTitle: () => storeMock.state.formWordingTitle
  },
  mutations: {
    setDeleteModalOpen: () => {}
  },
  actions: {
    deleteWording: () => Promise.resolve(true),
    closeDeleteModal: () => {}
  }
});