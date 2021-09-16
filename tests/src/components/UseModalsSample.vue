<script lang="ts">
import { useModals } from '../../../lib';

export default {
  name: 'CompositionSample',
  setup() {
    return {
      modals: useModals()
    }
  }
}
</script>

<template>
  <div class="card">
    <h1>UseModalsSample {{ modals.instances.length }}</h1>
  </div>
</template>
