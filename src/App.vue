<template>
  <div class="app-container">
    <header class="app-header">
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/docs">Documentation</router-link> |
        <router-link to="/examples">Examples</router-link>
      </nav>
    </header>
    <main class="app-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.app-header {
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.app-main {
  flex: 1;
  overflow: hidden;
  position: relative;
}
</style>
