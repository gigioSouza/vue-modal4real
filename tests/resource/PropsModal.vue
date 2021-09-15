<script lang="ts" setup>
const props = defineProps<{
  text: string
}>()

</script>

<template>
  <h1>Modal {{ props.text }}</h1>
</template>

