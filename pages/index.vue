<template>
  
   <h1>hello</h1>
   <button @click="setCookie">Set Cookie</button>
</template>
<script setup>
const setCookie = async () => {
  try {
    const response = await $fetch('/api/set-cookies')
    console.log(response)
  } catch (error) {
    console.error('Error setting cookie:', error)
  }
}
</script>
