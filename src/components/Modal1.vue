<script setup lang="ts">
import { useModals } from '../../lib/main';
import Modal2 from './Modal2.vue';

defineProps<{ msg: string }>();
const emit = defineEmits<{
  (e: 'resolve', value: any),
  (e: 'reject', value: any)
}>();

const modals = useModals();
function open() {
  modals.open(Modal2, { rejectOnBackdrop: false })
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
    <h1>Modal 1</h1>
    <p>{{ msg }}</p>
    <button @click="open">Open Modal2</button>
  </div>
</template>

<style scoped>
.card {
  background-color: white;
  --tw-shadow-color: 0, 0, 0;
  --tw-shadow: 0 1px 3px 0 rgba(var(--tw-shadow-color), 0.1), 0 1px 2px 0 rgba(var(--tw-shadow-color), 0.06);
  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  padding: 1rem;
  border-radius: .4rem;
}

.card h1 {
  text-color: #333;
}

.card p {
  text-color: #000;
}
</style>

