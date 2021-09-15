<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { Modal } from './modals';

const props = defineProps<{
  modal: Modal
}>();
const emit = defineEmits<{
  (e: 'resolve', value: any),
  (e: 'reject', value: any)
}>();

const modalContainer: Ref<HTMLElement> = ref(null);
const modalContent: Ref<HTMLElement> = ref(null);

function onClick(event) {
  if (
    props.modal.config!.rejectOnBackdrop &&
    [modalContainer.value, modalContent.value].includes(event.target)
  ) {
    onReject();
  }
}

function onResolve(payload?: any) {
  props.modal.resolve(payload);
  emit('resolve', payload);
}
function onReject(payload?: any) {
  props.modal.reject(payload);
  emit('reject', payload);
}
</script>

<template>
  <div
    ref="modalContainer"
    class="modalContainer"
    tabindex="-1"
    @click="onClick($event)"
  >
    <div
      ref="modalContent"
      tabindex="-1"
      class="modalContent"
      @click="onClick($event)">
      <component
        :is="props.modal.component"
        v-bind="props.modal.props"
        @resolve="onResolve($event)"
        @reject="onReject($event)"
      />
    </div>
  </div>
</template>
