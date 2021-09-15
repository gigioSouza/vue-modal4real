<template>
  <div>{{ modals.instances.length }}</div>
</template>
<script lang="ts">
import { useModals } from '../../lib/main';

export default {
  name: 'CompositionSample',
  setup() {
    return {
      modals: useModals()
    }
  }
}
</script>
