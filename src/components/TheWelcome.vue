<script>
export default {
  data: () => ({
    firstName: '',
    firstNameRules: [
      value => {
        if (value?.length > 3) return true

        return 'First name must be at least 3 characters.'
      },
    ],
    lastName: '',
    lastNameRules: [
      value => {
        if (/[^0-9]/.test(value)) return true

        return 'Last name can not contain digits.'
      },
    ],
  }),
}
</script>

<template>
  <v-card class="mx-auto" color="#432576ab" theme="dark" min-width="400">
    <v-toolbar dark color="#a73266">
      <v-toolbar-title>Login form</v-toolbar-title>
    </v-toolbar>
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="firstName" label="Email" :rules="firstNameRules"></v-text-field>

      <v-text-field type="password" v-model="lastName" label="Senha" :rules="lastNameRules"></v-text-field>

      <v-btn color="#9570d4" type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
  </v-card>
</template>
