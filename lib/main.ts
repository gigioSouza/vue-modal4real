import { App, inject } from 'vue';
import ModalTeleport from './ModalTeleport.vue';
import Modals, { Modal, ModalConfig, ModalDefinition } from './modals';

export default {
  install(app: App) {
    app.component('Modal', ModalTeleport);
    const modals = new Modals(app);
    app.config.globalProperties.$modals = modals;
    app.provide('modals', modals);
  }
};

export function useModals() {
  return inject('modals');
}

export type {
  Modals,
  Modal,
  ModalConfig,
  ModalDefinition
};
