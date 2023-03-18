<template>
	<v-app>
		<v-toolbar>
			<v-toolbar-title>
				Dashboard
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn text>
					Adicionar Redação
				</v-btn>
				<v-btn text>
					Perfil
				</v-btn>
				<v-btn text @click="logout">
					Sair
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<main class="container">
			<DashboardTable />
		</main>
	</v-app>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import DashboardTable from '@/components/DashboardTable.vue'

export default {
  components: {
    DashboardTable
  },
	setup() {
    const router = useRouter();
    const store = useStore();

    const logout = () => {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('idStudent');

      store.dispatch('resetState'); 

      router.push('/');
    };

    return { logout };
  },
}
</script>

<style>
.container {
	height: 100%;
	display: flex;
	align-items: center;
	background-color: #202324;
}
</style>