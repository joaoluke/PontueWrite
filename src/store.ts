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
    setWordings(state, wordings) { // Adicione esta mutation
      state.wordings = wordings;
    },
  },
  actions: {
    async fetchWordings({ commit }) {
      const token = window.localStorage.getItem('token');
      const idStudent = window.localStorage.getItem('idStudent');
      if (!token || !idStudent) return;
      const url = `https://desafio.pontue.com.br/index/aluno/${idStudent}`;
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
    }
  },
})
