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
				<v-btn :color="mode === 'create' ? 'green darken-1' : 'blue darken-1'" text @click="submitForm">
					{{ mode === 'create' ? 'Criar Redação' : 'Atualizar Redação' }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios'

export default {
	setup() {
		const store = useStore();

		const dialog = computed({
			get: () => store.state.formWordingOpen,
			set: (value) => store.commit('setFormWordingOpen', value),
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
			if (!file.value || !file.value.length) {
				alert('Por favor, selecione um arquivo.');
				return;
			}

			const formData = new FormData();
			formData.append('file[]', file.value[0]);

			try {
				const token = window.localStorage.getItem('token');
				const response = await axios.post('https://desafio.pontue.com.br/alunos/redacao/create', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				});
				const updatedWordings = store.state.wordings.concat(response.data);
				store.commit('setWordings', updatedWordings);
				file.value.value = '';
				closeDialog();
			} catch (error) {
				console.error('Erro ao criar a redação:', error);
			}
		}

		function updateEssay() {
			console.log('Atualizar redação');
			// Implementar a lógica para atualizar a redação
		}

		return {
			dialog,
			file,
			acceptedFileTypes,
			closeDialog,
			submitForm,
			mode,
			title
		};
	},
};
</script>
