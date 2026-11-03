<template>
  <div class="home-view">
    <h1>Vue Marzipano</h1>
    <p>A Vue 3 wrapper for the Marzipano 360 media viewer.</p>
    <div class="actions">
      <RouterLink to="/docs" class="btn">Read the Docs</RouterLink>
      <RouterLink to="/examples" class="btn btn-secondary">View Examples</RouterLink>
    </div>
  </div>
</template>

<style scoped>
  .home-view {
    padding: 2rem;
    text-align: center;
    font-family: sans-serif;
  }

  .actions {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    background-color: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }

  .btn-secondary {
    background-color: #2c3e50;
  }
</style>
