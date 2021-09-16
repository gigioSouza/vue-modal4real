import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import ModalDispatcher from './../../src/ModalsDispatcher.vue';
import Plugin from '../../src/main';

beforeEach(() => {
  document.body.innerHTML = '';
});

it('should throw error when using component without installing Plugin', () => {
  const error = console.error;

  console.error = jest.fn();

  const component = mount(ModalDispatcher);

  // @ts-ignore
  expect(console.error.mock.calls.length).toBe(1);
  // @ts-ignore
  expect(console.error.mock.calls[0][0]).toBe('You must `use` the Modals plugin: `app.use(Modals)`');

  console.error = error;
});

it('should inject modalsIntances and teleport to body', async () => {
  const component = mount(ModalDispatcher, {
    global: {
      plugins: [Plugin]
    }
  });

  const modals = component.vm.$.appContext.provides.modals;

  expect(document.body.querySelectorAll('.modalContainer .modalContent h1')).toHaveLength(0);

  modals.open({ template: '<h1>Modal</h1>' });

  await nextTick();

  expect(document.body.querySelectorAll('.modalContainer .modalContent h1')).toHaveLength(1);
});

it('should react to modalsIntances dispose', async () => {
  const component = mount(ModalDispatcher, {
    global: {
      plugins: [Plugin]
    }
  });

  const modals = component.vm.$.appContext.provides.modals;

  const instance = modals.open({ template: '<h1>Modal</h1>' });

  await nextTick();

  expect(document.body.querySelectorAll('.modalContainer .modalContent h1')).toHaveLength(1);

  instance.modal.resolve();

  await nextTick();

  expect(document.body.querySelectorAll('.modalContainer .modalContent h1')).toHaveLength(0);
});
