<script lang="ts" setup>
import { useModals } from '../../../lib';
import NestedModal2 from './NestedModal2.vue';

const emit = defineEmits(['resolve', 'reject']);

const modals = useModals();

function openModal() {
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
    <button
      @click="openModal"
      class="openNestedModal2">Open NestedModal2
    </button>
  </div>
</template>

