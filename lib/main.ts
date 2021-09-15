import { App, inject } from 'vue';
import ModalsDispatcher from './ModalsDispatcher.vue';
import Modals, { ModalConfig, Modal } from './modals';

export default {
  install(app: App) {
    app.component('Modals', ModalsDispatcher);
    const modals = new Modals();
    app.provide('modals', modals);
    app.provide('modalsInstances', modals.instances);
    app.config.globalProperties.$modals = modals;
  }
};

export function useModals() {
  return inject('modals');
}

export type {
  Modal,
  Modals,
  ModalConfig
};
