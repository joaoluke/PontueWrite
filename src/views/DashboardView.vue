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
import DashboardTable from '@/components/DashboardTable.vue'

export default {
  components: {
    DashboardTable
  },
  methods: {
    logout() {
      // Implemente a lógica de logout aqui
    }
  }
}
</script>

<style>
.container {
	height: 100vh;
	display: flex;
	align-items: center;
	background-color: #202324;
}
</style>