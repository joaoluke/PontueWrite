<template>
  <v-card class="mx-auto" color="#432576ab" theme="dark" min-width="400">
    <v-toolbar dark color="#a73266">
      <v-toolbar-title>Login PONTUE</v-toolbar-title>
    </v-toolbar>
    <v-form @submit.prevent="login" style="padding: 10px;">
      <v-text-field type="email" v-model="email" label="Email"></v-text-field>
      <v-text-field type="password" v-model="password" label="Password"></v-text-field>
      <v-btn color="#9570d4" type="submit" block class="mt-2">Submit</v-btn>
      <p v-if="errorLogin" style="margin-top: 6px; color: #cb1010; font-size: 11px; text-align: center;">Erro ao fazer
        login, verifique suas credenciais e tente novamente</p>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, Store } from 'vuex';
import axios from 'axios';

import type { RootState } from '@/types/store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}

export default defineComponent({
  name: 'FormLogin',
  mixins: [mapState(['token', 'idStudent'])],
  data: () => ({
    email: '',
    errorLogin: false,
    password: '',
  }),
  methods: {
    authenticate() {
      return axios.post('https://desafio.pontue.com.br/auth/login', { email: this.email, password: this.password })
        .then(response => {
          window.localStorage.setItem("token", response.data.access_token)
          window.localStorage.setItem("idStudent", response.data.aluno_id)
          return response.data;
        })
        .catch(error => {
          console.error(error)
          return false
        });
    },
    async login() {
      this.errorLogin = false
      const response = await this.authenticate()
      if (response) {
        this.$router.push('dashboard')
        const { token, idStudent } = response;
        this.$store.commit('login', { token, idStudent });
      } else {
        this.errorLogin = true
      }
    }
  }
});
</script>