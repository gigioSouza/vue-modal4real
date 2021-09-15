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

function onClickBackdrop() {
  if (props.modal.config!.rejectOnBackdrop) {
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
    @click.self="onClickBackdrop()"
  >
    <div
      ref="modalContent"
      tabindex="-1"
      class="modalContent"
      @click.self="onClickBackdrop()">
      <component
        :is="props.modal.component"
        v-bind="props.modal.props"
        @resolve="onResolve($event)"
        @reject="onReject($event)"
      />
    </div>
  </div>
</template>
