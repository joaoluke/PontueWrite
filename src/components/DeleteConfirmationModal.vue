<template>
	<v-dialog v-model="dialog" max-width="400px">
		<v-card>
			<v-card-title class="headline">Excluir Redação</v-card-title>
			<v-card-text>Deseja realmente excluir essa redação?</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="red darken-1" text @click="dialog = false">Cancelar</v-btn>
				<v-btn color="green darken-1" text @click="confirm">Excluir</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'DeleteConfirmationModal',
	props: {
		essayId: {
			type: String,
			required: true,
		},
	},
	setup(props, { emit }) {
		const dialog = ref(false);

		function confirm() {
			emit('delete', props.essayId);
			dialog.value = false;
		}

		return { dialog, confirm };
	},
});
</script>
  