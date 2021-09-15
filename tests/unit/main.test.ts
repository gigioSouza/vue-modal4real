import { mount } from '@vue/test-utils';
import Plugin from './../../lib/main';
import UseModalsSample from '../../src/components/UseModalsSample.vue';
import Modals from '../../lib/modals';

it('should install Modals', () => {
  const component = mount(UseModalsSample, {
    global: {
      plugins: [Plugin]
    }
  });

  const providedModals = component.vm.$.appContext.provides.modals;
  expect(providedModals).not.toBeUndefined();
  expect(providedModals.constructor.name).toBe('Modals');

  const $modals = component.vm.$.appContext.config.globalProperties.$modals;
  expect($modals).not.toBeUndefined();
  expect($modals.constructor.name).toBe('Modals');
  expect($modals).toBe(providedModals);

  const modalsComponent = component.vm.$.appContext.components.Modals;
  expect(modalsComponent).not.toBeUndefined();

  const modalsInstances = component.vm.$.appContext.provides.modalsInstances;
  expect(modalsInstances).not.toBeUndefined();
  expect(modalsInstances).toBe(providedModals.instances);

  expect(component.vm.modals).not.toBeUndefined();
  // @ts-ignore
  expect(component.vm.modals.constructor.name).toBe('Modals');
  expect(component.vm.modals).toBe(providedModals);
});
