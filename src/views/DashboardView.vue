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
				<v-btn text @click="logout">
					Sair
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<main class="container">
			<DashboardTableAdmin v-if="isUserAdmin" />
			<DashboardTableStudent v-else />
		</main>
	</v-app>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import DashboardTableAdmin from '@/components/DashboardTableAdmin.vue'
import DashboardTableStudent from '@/components/DashboardTableStudent.vue'

export default {
	components: {
		DashboardTableAdmin,
		DashboardTableStudent
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
	data() {
		return {
			isUserAdmin: false,
		};
	},
	created() {
		this.isUserAdmin = this.checkIsUserAdmin();
	},
	methods: {
		checkIsUserAdmin() {
			const idStudent = window.localStorage.getItem('idStudent');
			return idStudent === null || idStudent === 'null';
		},
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