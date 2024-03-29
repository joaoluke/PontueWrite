<template>
	<div class="mx-auto">
		<v-table fixed-header height="450px" style="background-color: #422576; border-radius: 10px; color: white">
			<thead>
				<tr>
					<th class="text-left">Aluno</th>
					<th class="text-left">Turma</th>
					<th class="text-left">Escola</th>
					<th class="text-left">Número</th>
					<th class="text-left">Data de criação</th>
					<th class="text-left" style="width: 235px;">Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in paginatedWordings" :key="item.id">
					<td class="item-table">{{ item.aluno.nome_completo }}</td>
					<td class="item-table">{{ item.aluno.turma.nome }}</td>
					<td class="item-table">{{ item.escola.nome }}</td>
					<td class="item-table">{{ item.numero }}</td>
					<td class="item-table">{{ formatDate(item.created_at) }}</td>
					<td>
						<v-btn size="small" color="#bb3f94" style="color: white; margin-right: 5px;"
							@click="editEssay(item.id)">Editar</v-btn>
						<v-btn size="small" color="#a73266" style="color: white" @click="openDeleteModal(item.id)">Excluir</v-btn>
					</td>
				</tr>
			</tbody>
		</v-table>
		<v-pagination class="custom-pagination" rounded="circle" :length="pagination.pageCount" v-model="pagination.page"
			@update:modelValue="updatePaginatedWordings"></v-pagination>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from 'vue';
import { useStore } from 'vuex'

import axiosInstance from '@/services/connection'
import type { WordingsAdmin } from '../types/wordingAdmin'

export default defineComponent({
	name: 'DashboardTableAdmin',
	setup() {
		const store = useStore();

		const wordings = computed(() => store.getters.getWordings);
		const paginatedWordings = ref<WordingsAdmin[]>([]);
		const pagination = ref({ page: 1, pageCount: 1, itemsPerPage: 10 });

		async function fetchWordings() {
			const token = window.localStorage.getItem('token');
			const idStudent = window.localStorage.getItem('idStudent');
			if (!token || !idStudent) return;

			const isStudent = idStudent !== null && idStudent !== 'null';
			const url = isStudent
				? `aluno/${idStudent}`
				: 'index/admin';
			try {
				const response = await axiosInstance.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				store.commit('setWordings', response.data.data);

				pagination.value.pageCount = Math.ceil(wordings.value.length / pagination.value.itemsPerPage);
				updatePaginatedWordings();
			} catch (error) {
				console.error('Erro ao buscar as redações:', error);
			}
		}

		function openDeleteModal(wordingId: string) {
			store.dispatch("openDeleteModal", wordingId);
		}

		function formatDate(date: string) {
			const parsedDate = new Date(date);
			return parsedDate.toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			});
		}

		function openFormWording() {
			store.commit('setFormWordingOpen', true);
		}

		function editEssay(essayId: string) {
			store.commit('setFormWordingTitle', 'Editar redação');
			openFormWording()
			store.dispatch('fetchEssay', essayId);
		}

		watch(wordings, () => {
			updatePaginatedWordings()
			pagination.value.pageCount = Math.ceil(wordings.value.length / pagination.value.itemsPerPage);
		});

		function updatePaginatedWordings() {
			const start = (pagination.value.page - 1) * pagination.value.itemsPerPage;
			const end = start + pagination.value.itemsPerPage;
			paginatedWordings.value = wordings.value.slice(start, end);
		}

		onMounted(fetchWordings);

		return { wordings, openDeleteModal, paginatedWordings, pagination, formatDate, openFormWording, editEssay, updatePaginatedWordings };
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

.item-table {
	padding: 3px 6px !important;
}

.custom-pagination .v-pagination__item {
	color: white !important;
}

.custom-pagination .v-pagination__item--active {
	background-color: white !important;
	color: black !important;
}
</style>