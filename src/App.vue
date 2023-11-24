<script setup>
import { onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

onMounted(() => {
  console.log('mounted!')
})
</script>

<template>
  <header>
    <div class="header-content">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="40" height="40" />
      <h1>Data Rewards Hub</h1>
      <div style="flex-grow: 1"></div>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
    </div>
  </header>

  <main>
    <sl-button>Click me</sl-button>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  border-bottom: 1px solid var(--color-border);
}

.header-content {
  color: var(--color-heading);
  display: flex;
  place-items: center;
  justify-content: space-between;
  gap: var(--size-1);
  padding: var(--size-3);
}

main {
  padding: var(--size-3);
}
</style>
