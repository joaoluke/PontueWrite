<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<v-card>
			<v-card-title>
				{{ title }}
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-file-input accept="image/jpeg, image/png, application/pdf" label="Escolha um arquivo"
						v-model="file"></v-file-input>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text @click="closeDialog">Cancelar</v-btn>
				<v-btn :disabled="isLoading" :color="mode === 'create' ? 'green darken-1' : 'blue darken-1'" text @click="submitForm">
					{{ mode === 'create' ? 'Criar Redação' : 'Atualizar Redação' }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
	<v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
		{{ snackbar.message }}
	</v-snackbar>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios'

export default {
	setup() {
		const store = useStore();

		const isLoading = ref(false);


		const dialog = computed({
			get: () => store.state.formWordingOpen,
			set: (value) => store.commit('setFormWordingOpen', value),
		});

		const snackbar = ref({
			show: false,
			message: '',
			color: 'success',
			timeout: 5000,
		});

		const mode = computed(() => store.state.formWordingMode);
		const title = computed(() => store.state.formWordingTitle);

		const file = ref(null);
		const acceptedFileTypes = '.jpg, .jpeg, .png, .pdf';

		function closeDialog() {
			dialog.value = false;
		}

		function submitForm() {
			if (mode.value === 'create') {
				createEssay();
			} else if (mode.value === 'edit') {
				updateEssay();
			}
		}


		async function createEssay() {
			isLoading.value = true;

			if (!file.value || !file.value.length) {
				alert('Por favor, selecione um arquivo.');
				return;
			}

			const formData = new FormData();
			formData.append('file[]', file.value[0]);

			try {
				const token = window.localStorage.getItem('token');
				await axios.post('https://desafio.pontue.com.br/alunos/redacao/create', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				});
				snackbar.value = {
					...snackbar.value,
					show: true,
					message: 'Salvo com sucesso',
					color: 'success',
				};
				file.value.value = '';
				closeDialog();
				await store.dispatch('fetchWordings');
			} catch (error) {
				console.error('Erro ao criar a redação:', error);
				snackbar.value = {
					...snackbar.value,
					show: true,
					message: 'Erro ao salvar',
					color: 'error',
				};
			} finally {
				isLoading.value = false;
			}
		}

		function updateEssay() {
			console.log('Atualizar redação');
		}

		return {
			dialog,
			file,
			acceptedFileTypes,
			closeDialog,
			submitForm,
			mode,
			title,
			snackbar,
			isLoading
		};
	},
};
</script>
