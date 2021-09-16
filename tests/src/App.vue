<script lang="ts" setup>
import NestedModal1 from './components/NestedModal1.vue'
import PropsModal from './components/PropsModal.vue'
import SimpleModal from './components/SimpleModal.vue'
import ResolveRejectModal from './components/ResolveRejectModal.vue'
import { useModals } from '../../src/main';
import { ref } from 'vue';

const modals = useModals();
const text = ref('');

function openNestedModel1() {
  modals.open(NestedModal1);
}

function openPropsModal() {
  modals.open(PropsModal, null, { text: text.value });
}

function openSimpleModal() {
  modals.open(SimpleModal, null, { text: text.value });
}

function openResolveRejectModal() {
  modals.open(ResolveRejectModal, null, { text: text.value });
}
</script>

<template>
  <h1>Let's use some modals</h1>
  <div class="grid">
    <div>
      <button @click="openNestedModel1()" class="openNestedModal1">Open NestedModal1</button>
    </div>
    <div>
      <input type="text" id="text" v-model="text">
      <button @click="openPropsModal()" class="openPropsModal">Open PropsModal</button>
    </div>
    <div>
      <button @click="openSimpleModal()" class="openSimpleModal">Open SimpleModal</button>
    </div>
    <div>
      <button @click="openResolveRejectModal()" class="openResolveRejectModal">Open ResolveRejectModal</button>
    </div>
  </div>
  <Modals/>
</template>

<style>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.grid div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

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
