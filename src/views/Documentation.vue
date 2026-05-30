<template>
  <div class="docs-view">
    <h1>Documentation</h1>

    <section>
      <h2>Installation</h2>
      <p>Install the plugin via npm or yarn once it's published, or use it locally via workspaces.</p>
      <pre><code>npm install @greener-games/vue-marzipano</code></pre>
    </section>

    <section>
      <h2>Global Setup</h2>
      <p>In your <code>main.ts</code>, register the plugin and import its CSS:</p>
      <pre><code>import { createApp } from 'vue'
import App from './App.vue'
import VueMarzipano from '@greener-games/vue-marzipano'
import '@greener-games/vue-marzipano/style.css'

const app = createApp(App)
app.use(VueMarzipano)
app.mount('#app')
</code></pre>
    </section>

    <section>
      <h2>Basic Usage</h2>
      <p>Use the <code>MarzipanoViewer</code> component in your templates. You need to provide a <code>data</code> prop conforming to the required structure.</p>
      <pre><code>&lt;template&gt;
  &lt;MarzipanoViewer :data="panoData" /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { MarzipanoViewer } from '@greener-games/vue-marzipano'
import { data as panoData } from './data.js'
&lt;/script&gt;
</code></pre>
    </section>
  </div>
</template>

<style scoped>
.docs-view {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
  line-height: 1.6;
}

section {
  margin-bottom: 2.5rem;
}

h2 {
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

pre {
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: monospace;
  font-size: 0.9em;
}
</style>
