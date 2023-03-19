<template>
    <v-dialog v-model="dialog" max-width="600px">
      <template #activator="{ on, attrs }">
        <slot v-bind="attrs" v-on="on"></slot>
      </template>
  
      <v-card>
        <v-card-title>
          <span class="headline">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <!-- Input 1 -->
                <v-text-field label="Input 1" v-model="input1" outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- Input 2 -->
                <v-text-field label="Input 2" v-model="input2" outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- Input 3 -->
                <v-text-field label="Input 3" v-model="input3" outlined></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Fechar</v-btn>
          <v-btn color="primary" text @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'FormWording',
    props: {
      title: {
        type: String,
        required: true,
      },
    },
    setup() {
      const dialog = ref(false);
      const input1 = ref('');
      const input2 = ref('');
      const input3 = ref('');
  
      function save() {
        console.log('Salvar');
        // Implemente a lógica de salvar aqui
      }
  
      return { dialog, input1, input2, input3, save };
    },
  });
  </script>
  