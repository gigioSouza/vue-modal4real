<script lang="ts" setup>
const props = defineProps<{
  text: string
}>()

</script>

<template>
  <div class="card">
    <h1>PropsModal {{ props.text }}</h1>
  </div>
</template>

