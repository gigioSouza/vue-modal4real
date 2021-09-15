<template>
  <div class="card">
    <h1>UseModalsSample {{ modals.instances.length }}</h1>
  </div>
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
