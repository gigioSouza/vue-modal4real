<script lang="ts">
import Modal1 from './NestedModal1.vue';

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

<template>
  <div class="card">
    <h1>NestedModal2</h1>
    <button @click="open" class="openNestedModal1">Open NestedModal1</button>
    <button @click="$emit('resolve')" class="resolveNestedModal2">Close NestedModal2</button>
  </div>
</template>
