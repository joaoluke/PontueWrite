<template>
  <v-card class="mx-auto" color="#432576ab" theme="dark" max-width="500" min-width="400">
    <v-toolbar dark color="#a73266">
      <v-toolbar-title>Login PONTUE</v-toolbar-title>
    </v-toolbar>
    <v-form @submit.prevent="login" style="padding: 10px;">
      <v-text-field id="email" name="email" type="email" v-model="email" label="Email"></v-text-field>
      <v-text-field id="password" name="password" type="password" v-model="password" label="Password"></v-text-field>
      <v-btn id="submit" color="#9570d4" type="submit" block class="mt-2">Submit</v-btn>
      <p v-if="errorLogin" style="margin-top: 6px; color: #cb1010; font-size: 11px; text-align: center;">Erro ao fazer
        login, verifique suas credenciais e tente novamente</p>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, Store } from 'vuex';

import axiosInstance from '@/services/connection'
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
      return axiosInstance.post('auth/login', { email: this.email, password: this.password })
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