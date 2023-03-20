<template>
	<div class="mx-auto">
		<v-table fixed-header height="450px" style="background-color: #422576; border-radius: 10px; color: white">
			<thead>
				<tr>
					<th class="text-left" style="background-color: #f0f0f0">Número</th>
					<th class="text-left" style="background-color: #f0f0f0">Data de criação</th>
					<th class="text-left header-action" style="background-color: #f0f0f0">Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in paginatedWordings" :key="item.id">
					<td>{{ item.numero || null }}</td>
					<td>{{ formatDate(item.created_at) }}</td>
					<td>
						<v-btn small color="#bb3f94" style="color: white" @click="editEssay(item.id)">Editar</v-btn>
					</td>
				</tr>
			</tbody>
		</v-table>
		<v-pagination class="custom-pagination" rounded="circle" :length="pagination.pageCount" v-model="pagination.page"
			@update:modelValue="updatePaginatedWordings"></v-pagination>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import type { WordingsStudent } from '../types/wordingStudent'
export default defineComponent({
	name: 'DashboardTableStudent',
	setup() {
		const wordings = ref<WordingsStudent[]>([]);
		const paginatedWordings = ref<WordingsStudent[]>([]);
		const pagination = ref({ page: 1, pageCount: 1, itemsPerPage: 10 });
		const tableWrapper = ref<HTMLElement | null>(null);
		function scrollToTop() {
			if (tableWrapper.value) {
				tableWrapper.value.scrollTop = 0;
			}
		}
		function editEssay(essayId: string) {
			console.log('Editar redação com ID:', essayId);
		}
		async function fetchWordings() {
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

				wordings.value = response.data.data;
				pagination.value.pageCount = Math.ceil(wordings.value.length / pagination.value.itemsPerPage);
				updatePaginatedWordings();
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
		function updatePaginatedWordings() {
			const start = (pagination.value.page - 1) * pagination.value.itemsPerPage;
			const end = start + pagination.value.itemsPerPage;
			paginatedWordings.value = wordings.value.slice(start, end);
			scrollToTop();
		}
		onMounted(fetchWordings);
		return { wordings, paginatedWordings, pagination, formatDate, updatePaginatedWordings, editEssay };
	},
});
</script>

<style>
.mx-auto {
	min-width: 530px;
	width: 60%;
}

.header-action {
	padding-top: 10px;
	padding-bottom: 10px;
}

.custom-pagination .v-pagination__item {
	color: white !important;
}

.custom-pagination .v-pagination__item--active {
	background-color: white !important;
	color: black !important;
}
</style>