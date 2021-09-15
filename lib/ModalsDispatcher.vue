<script lang="ts" setup>
import ModalContainer from './ModalContainer.vue';
import { useModals } from './main';
import { computed } from 'vue';

const modals = useModals();

const modalsInstances = computed(() => {
  if (modals == null) return [];
  return modals.instances;
})
</script>

<template>
  <teleport to="body">
    <ModalContainer
      v-for="(modal, i) in modalsInstances"
      :key="`modal_${i}`"
      :modal="modal"/>
  </teleport>
</template>
