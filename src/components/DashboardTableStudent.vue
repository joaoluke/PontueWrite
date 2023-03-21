<template>
	<div class="mx-auto">
		<v-table fixed-header height="450px" style="background-color: #422576; border-radius: 10px; color: white">
			<thead>
				<tr>
					<th class="text-left" style="background-color: #f0f0f0">Número</th>
					<th class="text-left" style="background-color: #f0f0f0">Data de criação</th>
					<th class="text-left header-action" style="background-color: #f0f0f0; width: 235px;">Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in paginatedWordings" :key="item.id">
					<td>{{ item.numero || null }}</td>
					<td>{{ formatDate(item.created_at) }}</td>
					<td>
						<v-btn size="small" color="#bb3f94" style="color: white; margin-right: 5px;"
							@click="editEssay(item.id)">Editar</v-btn>
						<v-btn size="small" color="#a73266" style="color: white"
							@click="openDeleteModal(item.id)">Excluir</v-btn>
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
import { useStore } from 'vuex';

import type { WordingsStudent } from '../types/wordingStudent'

export default defineComponent({
	name: 'DashboardTableStudent',
	setup() {
		const store = useStore()

		const wordings = computed(() => store.getters.getWordings);
		const paginatedWordings = ref<WordingsStudent[]>([]);
		const pagination = ref({ page: 1, pageCount: 1, itemsPerPage: 10 });
		const tableWrapper = ref<HTMLElement | null>(null);

		function scrollToTop() {
			if (tableWrapper.value) {
				tableWrapper.value.scrollTop = 0;
			}
		}

		function openDeleteModal(wordingId: string) {
			store.dispatch("openDeleteModal", wordingId);
		}

		function openFormWording() {
			store.commit('setFormWordingOpen', true);
		}

		function editEssay(essayId: string) {
			store.commit('setFormWordingTitle', 'Editar redação');
			openFormWording();
			store.dispatch('fetchEssay', essayId);
		}


		async function fetchWordings() {
			await store.dispatch('fetchWordings');
			pagination.value.pageCount = Math.ceil(wordings.value.length / pagination.value.itemsPerPage);
			updatePaginatedWordings();
		}

		function formatDate(date: string) {
			const parsedDate = new Date(date);
			return parsedDate.toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			});
		}

		watch(wordings, () => {
			updatePaginatedWordings()
		});

		function updatePaginatedWordings() {
			const start = (pagination.value.page - 1) * pagination.value.itemsPerPage;
			const end = start + pagination.value.itemsPerPage;
			paginatedWordings.value = wordings.value.slice(start, end);
			scrollToTop();
		}

		onMounted(fetchWordings);
		return { wordings, openDeleteModal, paginatedWordings, pagination, formatDate, updatePaginatedWordings, editEssay };
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