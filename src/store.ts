import { createStore } from 'vuex'
import axios from 'axios'

import type { RootState } from './types/store';

export default createStore({
  state: {
    token: null,
    idStudent: null,
  },
  mutations: {
    login(state: RootState, payload: { token: string, idStudent: number }) {
      state.token = payload.token;
      state.idStudent = payload.idStudent;
    }
  },
  actions: {
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
    }
  },
  modules: {
    // Defina seus módulos aqui
  }
})
