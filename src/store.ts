import { createStore } from 'vuex'
import axios from 'axios'

import type { RootState } from './types/store';

export default createStore({
  state: {
    token: null,
    idStudent: null,
    formWordingOpen: false,
    formWordingMode: 'create',
    formWordingTitle: 'Adicionar redação',
    wordings: [],
    deleteModalOpen: false,
    wordingId: null,
    isLoading: false,
    urlId: ''
  },
  mutations: {
    login(state: RootState, payload: { token: string, idStudent: number }) {
      state.token = payload.token;
      state.idStudent = payload.idStudent;
    },
    resetState(state: RootState) {
      state.token = null;
      state.idStudent = null;
    },
    setFormWordingOpen(state, value) {
      state.formWordingOpen = value;
    },
    setFormWordingMode(state, value) {
      state.formWordingMode = value;
    },
    setFormWordingTitle(state, value) {
      state.formWordingTitle = value;
    },
    setWordings(state, wordings) {
      state.wordings = wordings;
    },
    setDeleteModalOpen(state, isOpen) {
      state.deleteModalOpen = isOpen;
    },
    setWordingId(state, wordingId) {
      state.wordingId = wordingId;
    },
    removeWordingById(state, wordingId) {
      state.wordings = state.wordings.filter(wording => wording.id !== wordingId);
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setURL(state, payload) {
      state.urlId = payload;
    },
  },
  actions: {
    openDeleteModal({ commit }, wordingId) {
      commit("setWordingId", wordingId);
      commit("setDeleteModalOpen", true);
    },
    closeDeleteModal({ commit }) {
      commit("setDeleteModalOpen", false);
    },
    async fetchWordings({ commit }) {
      const token = window.localStorage.getItem('token');
      const idStudent = window.localStorage.getItem('idStudent');
      if (!token || !idStudent) return;
      const isStudent = idStudent !== null && idStudent !== 'null';
			const url = isStudent
				? `https://desafio.pontue.com.br/index/aluno/${idStudent}`
				: 'https://desafio.pontue.com.br/index/admin';
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        commit('setWordings', response.data.data);
      } catch (error) {
        console.error('Erro ao buscar as redações:', error);
      }
    },
    async fetchEssay({ commit }, essayId: number) {
      commit("setWordingId", essayId);
			const token = window.localStorage.getItem('token');
			const url = `https://desafio.pontue.com.br/redacao/${essayId}`;

			try {
				const response = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const essayData = response.data.data;
				commit("setURL", essayData.urls[0].id);

			} catch (error) {
				console.error('Erro ao buscar a redação:', error);
			}
		},
    async deleteWording({ commit }, wordingId: number) {
      commit("setLoading", true);

      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
    
        const response = await axios.delete(`https://desafio.pontue.com.br/redacao/${wordingId}/delete`, config);
    

        if (response.status === 200) {
          console.info(response.data)
          commit("setDeleteModalOpen", false);
          commit("removeWordingById", wordingId);
          
          return true
        } else {
          console.error(response)
        }
      } catch (error) {
        console.error("Erro ao excluir redação:", error);
        return false
      } finally {
        commit("setLoading", false);
      }
    },
    async authenticate({ commit }, { email, password }) {
      try {
        const response = await axios.post('https://desafio.pontue.com.br/auth/login', {
          email,
          password
        })
        const { access_token: token, aluno_id: idStudent } = response.data
        commit('login', { token, idStudent })
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    resetState({ commit }) {
      commit('resetState');
    },
    openFormWording({ commit }) {
      commit('setFormWordingOpen', true);
    },
  },
  modules: {},
  getters: {
    getWordings: state => {
      return state.wordings.map(wording => wording)
    },
    isDeleteModalOpen: (state) => state.deleteModalOpen,
    wordingIdToDelete: (state) => state.wordingId,
    getIsLoading: (state) => state.isLoading,
    getUrlId: (state) => state.urlId,
  },
})
