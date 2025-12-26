<template>
  <header class="bg-indigo-600" data-cy="main-header">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-6">
        <div class="flex items-center justify-center space-x-8">
          <NuxtLink to="/" class="flex items-center text-white">
            <span class="text-2xl mr-2">🌎</span>
            <span class="text-xl font-bold">Country Explorer</span>
          </NuxtLink>
          <NuxtLink to="/about" class="text-white hover:text-indigo-200"
            >About Page</NuxtLink
          >
        </div>
      </div>
    </nav>
  </header>
</template>
