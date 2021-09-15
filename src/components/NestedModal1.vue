<script setup lang="ts">
import { useModals } from '../../lib/main';
import NestedModal2 from './NestedModal2.vue';

const emit = defineEmits<{
  (e: 'resolve', value: any),
  (e: 'reject', value: any)
}>();

const modals = useModals();
function open() {
  modals.open(NestedModal2, { rejectOnBackdrop: false })
    .then(() => {
      console.log('Closed Modal2 by clicking in Close button');
      emit('resolve');
    })
    .catch(() => {
      console.log('Closed Modal2');
      emit('reject');
    });
}
</script>

<template>
  <div class="card">
    <h1>NestedModal1</h1>
    <button @click="open" class="openNestedModal2">Open NestedModal2</button>
  </div>
</template>

