<template>
  <button id="resolve" @click="emit('resolve')">resolve</button>
  <button id="reject" @click="emit('reject')">reject</button>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['resolve', 'reject'])
</script>
