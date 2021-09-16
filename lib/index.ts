import { App, inject } from 'vue';
import ModalsDispatcher from './ModalsDispatcher.vue';
import { Modals, Modal, ModalConfig, ModalWrapper } from './modals';

export const ModalsPlugin = {
  install(app: App): void {
    app.component('Modals', ModalsDispatcher);
    const modals = new Modals();
    app.provide('modals', modals);
    app.provide('modalsInstances', modals.instances);
    app.config.globalProperties.$modals = modals;
  }
};

export function useModals(): Modals {
  const modals = inject<Modals>('modals');
  if (modals == null) {
    console.error('You must `use` the Modals plugin: `app.use(Modals)`');
  }
  return modals as Modals;
}

export {
  Modals
}

export type {
  Modal,
  ModalConfig,
  ModalWrapper
}
