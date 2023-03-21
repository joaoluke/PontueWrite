import type { WordingsStudent } from '@/types/wordingStudent';
import { createStore } from 'vuex';

export const storeMock = createStore({
  state: {
    wordings: [] as WordingsStudent[],
    deleteModalOpen: false,
    wordingId: 'test-id',
    formWordingOpen: false,
    formWordingMode: '',
    formWordingTitle: ''
  },
  getters: {
    getWordings: (state) => state.wordings,
    getIsLoading: () => false,
    getFormWordingOpen: () => storeMock.state.formWordingOpen,
    getFormWordingMode: () => storeMock.state.formWordingMode,
    getFormWordingTitle: () => storeMock.state.formWordingTitle
  },
  commit: (mutation: string, payload: any) => {
    if (mutation === 'setFormWordingOpen') {
      storeMock.state.formWordingOpen = payload
    }
  },
  mutations: {
    setDeleteModalOpen: () => {}
  },
  actions: {
    deleteWording: () => Promise.resolve(true),
    closeDeleteModal: () => {}
  }
});