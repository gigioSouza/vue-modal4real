<script
  lang="ts"
  setup>
import NestedModal1 from './NestedModal1.vue';
import { useModals } from '../../lib/main';

const emits = defineEmits(['resolve', 'reject']);
const modals = useModals();

function openModal() {
  modals.open(NestedModal1, null, { msg: 'Hello from Modal2' })
    .catch(() => {
      console.log('Closed Modal1 my clicking in backdrop');
      emits('reject');
    });
}
</script>

<template>
  <div class="card">
    <h1>NestedModal2</h1>
    <button
      @click="openModal"
      class="openNestedModal1">Open NestedModal1
    </button>
    <button
      @click="emits('resolve')"
      class="resolveNestedModal2">Close NestedModal2
    </button>
  </div>
</template>
