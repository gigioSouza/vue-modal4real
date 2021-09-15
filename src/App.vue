<script setup lang="ts">
import Modal1 from './components/Modal1.vue'
import { useModals } from '../lib/main';

const modals = useModals();

function open() {
  modals.open(Modal1, null, { msg: "What's up?" });
}

</script>

<template>
  <h1>Let's use some modals</h1>
  <button @click="open">Open Modal1</button>
  <Modals/>
</template>

<style>
.modalContainer {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0, .2);
}

.modalContainer .modalContent {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 16px;
}
</style>
