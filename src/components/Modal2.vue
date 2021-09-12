<template>
  <div class="card">
    <h1>Modal 2</h1>
    <button @click="open">Open Modal1</button>
    <button @click="$emit('resolve')">Close Modal2</button>
  </div>
</template>

<script lang="ts">
import Modal1 from './Modal1.vue';

export default {
  name: 'Modal2',
  emits: ['resolve', 'reject'],
  methods: {
    open() {
      this.$modals.open(Modal1, null, { msg: 'Hello from Modal2' })
        .catch(() => {
          console.log('Closed Modal1 my clicking in backdrop');
          this.$emit('reject');
        });
    }
  }
}
</script>

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

