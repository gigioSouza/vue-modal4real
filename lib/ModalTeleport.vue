<script lang="ts" setup>
import { inject, UnwrapRef } from 'vue';
import ModalContainer from './ModalContainer.vue';
import { Modal } from './modals';

const modals: UnwrapRef<Modal[]> | undefined = inject<UnwrapRef<Modal[]>>('modals:modals');
if (modals === undefined) {
  console.error('You must `use` the Modals plugin: `app.use(Modals)`');
}
</script>

<template>
  <teleport to="body">
    <ModalContainer
      v-for="(modal, i) in modals"
      :key="`modal_${i}`"
      :modal="modal"/>
  </teleport>
</template>
