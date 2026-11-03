<template>
  <div class="flex h-full flex-col">
    <header class="glass sticky top-0 z-50 w-full shrink-0 border-b border-black/5">
      <nav class="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <RouterLink to="/" class="text-text-main text-xl font-bold tracking-tight">
          Vue Marzipano
        </RouterLink>

        <div class="ms-4 flex gap-4">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="text-text-muted hover:text-primary font-medium transition-colors"
            active-class="text-primary"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </nav>
    </header>

    <main class="relative min-h-0 flex-1 overflow-hidden">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
  const links = [
    { to: '/docs', label: 'Documentation' },
    { to: '/examples', label: 'Examples' },
  ];
</script>
