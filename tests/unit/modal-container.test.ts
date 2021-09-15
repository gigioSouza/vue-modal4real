import { mount } from '@vue/test-utils';
import Plugin from './../../lib/main';
import ModalsDispatcher from './../../lib/ModalsDispatcher.vue';
import SimpleModal from '../resource/SimpleModal.vue';
import PropsModal from '../resource/PropsModal.vue';
import ResolveRejectModal from '../resource/ResolveRejectModal.vue';
import { nextTick } from 'vue';

beforeEach(() => {
  document.body.innerHTML = '';
})

it('should render Modal Component', async () => {
  const component = mount(ModalsDispatcher, {
    global: {
      plugins: [Plugin]
    }
  });

  const modals = component.vm.$.appContext.provides.modals;

  modals.open(SimpleModal);

  await nextTick();

  const modalNodes = document.body.querySelectorAll('.modalContainer .modalContent h1');

  expect(modalNodes).toHaveLength(1);
  expect(modalNodes[0].textContent).toBe('Modal');
});

it('should set props Modal Component', async () => {
  const component = mount(ModalsDispatcher, {
    global: {
      plugins: [Plugin]
    }
  });

  const modals = component.vm.$.appContext.provides.modals;

  modals.open(PropsModal, null, { text: 'with props' });

  await nextTick();

  const modalNodes = document.body.querySelectorAll('.modalContainer .modalContent h1');

  expect(modalNodes).toHaveLength(1);
  expect(modalNodes[0].textContent).toBe('Modal with props');
});

describe('rejectOnBackdrop', () => {
  describe('when "true"', () => {
    it('should reject modal on click in .modalContainer', async () => {
      const component = mount(ModalsDispatcher, {
        global: {
          plugins: [Plugin]
        }
      });

      const modals = component.vm.$.appContext.provides.modals;

      const instance = modals.open(SimpleModal, { rejectOnBackdrop: true });

      await nextTick();

      let modalNodes = document.body.querySelectorAll('.modalContainer');

      expect(modalNodes[0].textContent).toBe('Modal');

      (modalNodes[0] as HTMLElement).click();

      await nextTick();

      modalNodes = document.body.querySelectorAll('.modalContainer');

      expect(modalNodes).toHaveLength(0);
      await expect(instance).rejects.toBeUndefined();
    });

    it('should reject modal on click in .modalContent', async () => {
      const component = mount(ModalsDispatcher, {
        global: {
          plugins: [Plugin]
        }
      });

      const modals = component.vm.$.appContext.provides.modals;

      const instance = modals.open(SimpleModal, { rejectOnBackdrop: true });

      await nextTick();

      let modalNodes = document.body.querySelectorAll('.modalContainer .modalContent');

      expect(modalNodes[0].textContent).toBe('Modal');

      (modalNodes[0] as HTMLElement).click();

      await nextTick();

      modalNodes = document.body.querySelectorAll('.modalContainer .modalContent');

      expect(modalNodes).toHaveLength(0);
      await expect(instance).rejects.toBeUndefined();
    });
  });

  describe('when "false"', () => {
    it('should not reject modal on click in .modalContainer', async () => {
      const component = mount(ModalsDispatcher, {
        global: {
          plugins: [Plugin]
        }
      });

      const modals = component.vm.$.appContext.provides.modals;

      const instance = modals.open(SimpleModal, { rejectOnBackdrop: false });

      await nextTick();

      let modalNodes = document.body.querySelectorAll('.modalContainer');

      expect(modalNodes[0].textContent).toBe('Modal');

      (modalNodes[0] as HTMLElement).click();

      await nextTick();

      modalNodes = document.body.querySelectorAll('.modalContainer');

      expect(modalNodes).toHaveLength(1);
    });

    it('should not reject modal on click in .modalContent', async () => {
      const component = mount(ModalsDispatcher, {
        global: {
          plugins: [Plugin]
        }
      });

      const modals = component.vm.$.appContext.provides.modals;

      const instance = modals.open(SimpleModal, { rejectOnBackdrop: false })

      await nextTick();

      let modalNodes = document.body.querySelectorAll('.modalContainer .modalContent');

      expect(modalNodes[0].textContent).toBe('Modal');

      (modalNodes[0] as HTMLElement).click();

      await nextTick();

      modalNodes = document.body.querySelectorAll('.modalContainer .modalContent');

      expect(modalNodes).toHaveLength(1);
    });
  });
});

it('should resolve modal when receive a resolve event from Modal', async () => {
  const component = mount(ModalsDispatcher, {
    global: {
      plugins: [Plugin]
    }
  });

  const modals = component.vm.$.appContext.provides.modals;

  const instance = modals.open(ResolveRejectModal, { rejectOnBackdrop: false });

  await nextTick();

  let resolveButton = document.body.querySelector('.modalContainer .modalContent #resolve') as HTMLElement;

  resolveButton.click();

  await nextTick();

  const modalNodes = document.body.querySelectorAll('.modalContainer .modalContent');

  expect(modalNodes).toHaveLength(0);
  await expect(instance).resolves.toBeUndefined();
});

it('should reject modal when receive a reject event from Modal', async () => {
  const component = mount(ModalsDispatcher, {
    global: {
      plugins: [Plugin]
    }
  });

  const modals = component.vm.$.appContext.provides.modals;

  const instance = modals.open(ResolveRejectModal, { rejectOnBackdrop: false });

  await nextTick();

  let rejectButton = document.body.querySelector('.modalContainer .modalContent #reject') as HTMLElement;

  rejectButton.click();

  await nextTick();

  const modalNodes = document.body.querySelectorAll('.modalContainer .modalContent');

  expect(modalNodes).toHaveLength(0);
  await expect(instance).rejects.toBeUndefined();
});
