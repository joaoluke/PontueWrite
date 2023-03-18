<template>
	<div class="mx-auto bg-primary">
		<v-table fixed-header height="450px" style="background-color: aquamarine;">
			<thead style="background-color: aqua;">
				<tr>
					<th class="text-left" style="background-color: #f0f0f0">Aluno</th>
					<th class="text-left" style="background-color: #f0f0f0">Turma</th>
					<th class="text-left" style="background-color: #f0f0f0">Escola</th>
					<th class="text-left" style="background-color: #f0f0f0">Número</th>
					<th class="text-left" style="background-color: #f0f0f0">Data de criação</th>
					<th class="text-left" style="background-color: #f0f0f0">Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in paginatedRedacoes" :key="item.id">
					<td>{{ item.aluno.nome_completo }}</td>
					<td>{{ item.aluno.turma.nome }}</td>
					<td>{{ item.escola.nome }}</td>
					<td>{{ item.numero }}</td>
					<td>{{ formatDate(item.created_at) }}</td>
					<td>
						<v-btn small color="primary" @click="editEssay(item.id)">Editar</v-btn>
					</td>
				</tr>
			</tbody>
		</v-table>
		<v-pagination :length="6"></v-pagination>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';

import type { Wording } from '../types/wording'

export default defineComponent({
	name: 'DashboardTable',
	setup() {
		const redacoes = ref<Wording[]>([]);
		const paginatedRedacoes = ref<Wording[]>([]);
		const pagination = ref({ page: 1, pageCount: 1, itemsPerPage: 5 });

		async function fetchRedacoes() {
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

				redacoes.value = response.data.data;
				pagination.value.pageCount = Math.ceil(redacoes.value.length / pagination.value.itemsPerPage);
				updatePaginatedRedacoes();
			} catch (error) {
				console.error('Erro ao buscar as redações:', error);
			}
		}

		function formatDate(date: string) {
			const parsedDate = new Date(date);
			return parsedDate.toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			});
		}

		function editEssay(essayId: string) {
			console.log('Editar redação com ID:', essayId);
		}

		function updatePaginatedRedacoes() {
			const start = (pagination.value.page - 1) * pagination.value.itemsPerPage;
			const end = start + pagination.value.itemsPerPage;
			paginatedRedacoes.value = redacoes.value.slice(start, end);
		}

		onMounted(fetchRedacoes);

		return { redacoes, paginatedRedacoes, pagination, formatDate, editEssay, updatePaginatedRedacoes };
	},
});
</script>

<style>
.mx-auto {
	max-width: 800px;
}
</style>