<template>
	<v-dialog v-model="internalShowDialog" max-width="500px">
		<v-card>
			<v-card-title>Excluir Redação</v-card-title>
			<v-card-text>Tem certeza de que deseja excluir esta redação?</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="close">Cancelar</v-btn>
				<v-btn color="error" text @click="confirm">Excluir</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
	<v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
		{{ snackbar.message }}
	</v-snackbar>
</template>
  
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
	name: "DeleteModal",
	setup() {
		const store = useStore();

		const internalShowDialog = computed({
			get() {
				return store.state.deleteModalOpen;
			},
			set(value) {
				store.commit("setDeleteModalOpen", value);
			},
		});

		const snackbar = ref({
			show: false,
			message: '',
			color: 'success',
			timeout: 5000,
		});

		const deleting = computed(() => store.state.deleteModalOpen);

		const close = () => {
			internalShowDialog.value = false;
		};

		const confirm = async () => {
			const wordingId = store.state.wordingId;
			const actionRequest = await store.dispatch("deleteWording", wordingId);
			console.log(actionRequest, "actionRequest")
			if (actionRequest) {
				snackbar.value = {
					...snackbar.value,
					show: true,
					message: 'Excluido com sucesso',
					color: 'success',
				};
			} else {
				snackbar.value = {
					...snackbar.value,
					show: true,
					message: 'Erro ao excluir',
					color: 'error',
				};
			}
			store.dispatch("closeDeleteModal");
			internalShowDialog.value = false;
		};

		return {
			internalShowDialog,
			deleting,
			close,
			confirm,
			snackbar,
		};
	},
});
</script>
  