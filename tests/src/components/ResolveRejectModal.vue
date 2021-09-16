<template>
  <div class="card">
    <h1>ResolveRejectModal</h1>
    <button id="resolve" @click="emit('resolve')">resolve</button>
    <button id="reject" @click="emit('reject')">reject</button>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['resolve', 'reject'])
</script>
