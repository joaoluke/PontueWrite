<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main class="main-wrapper">
    <TheWelcome />
  </main>
</template>

<style>
  .main-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #202324;
  }
</style>