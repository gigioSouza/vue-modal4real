import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { ModalsPlugin } from '../../lib';
import ModalsDispatcher from '../../lib/ModalsDispatcher.vue';
import SimpleModal from '../src/components/SimpleModal.vue';
import PropsModal from '../src/components/PropsModal.vue';
import ResolveRejectModal from '../src/components/ResolveRejectModal.vue';


function factory(config = {}) {
  return mount(ModalsDispatcher, config);
}

beforeEach(() => {
  document.body.innerHTML = '';
})

it('should render Modal Component', async () => {
  const component = factory(
    {
      global: {
        plugins: [ModalsPlugin]
      }
    }
  );

  const modals = component.vm.$.appContext.provides.modals;

  modals.open(SimpleModal);

  await nextTick();

  const modalNodes = document.body.querySelectorAll('.modalContainer .modalContent h1');

  expect(modalNodes).toHaveLength(1);
  expect(modalNodes[0].textContent).toBe('SimpleModal');
});

it('should set props Modal Component', async () => {
  const component = factory(
    {
      global: {
        plugins: [ModalsPlugin]
      }
    }
  );

  const modals = component.vm.$.appContext.provides.modals;

  modals.open(PropsModal, null, { text: 'text prop' });

  await nextTick();

  const modalNodes = document.body.querySelectorAll('.modalContainer .modalContent h1');

  expect(modalNodes).toHaveLength(1);
  expect(modalNodes[0].textContent).toBe('PropsModal text prop');
});

describe('rejectOnBackdrop', () => {
  describe('when "true"', () => {
    it('should reject modal on click in .modalContainer', async () => {
      const component = factory(
        {
          global: {
            plugins: [ModalsPlugin]
          }
        }
      );

      const modals = component.vm.$.appContext.provides.modals;

      const instance = modals.open(SimpleModal, { rejectOnBackdrop: true });

      await nextTick();

      let modalNodes = document.body.querySelectorAll('.modalContainer');

      expect(modalNodes[0].textContent).toBe('SimpleModal');

      (modalNodes[0] as HTMLElement).click();

      await nextTick();

      modalNodes = document.body.querySelectorAll('.modalContainer');

      expect(modalNodes).toHaveLength(0);
      await expect(instance).rejects.toBeUndefined();
    });

    it('should reject modal on click in .modalContent', async () => {
      const component = factory(
        {
          global: {
            plugins: [ModalsPlugin]
          }
        }
      );

      const modals = component.vm.$.appContext.provides.modals;

      const instance = modals.open(SimpleModal, { rejectOnBackdrop: true });

      await nextTick();

      let modalNodes = document.body.querySelectorAll('.modalContainer .modalContent');

      expect(modalNodes[0].textContent).toBe('SimpleModal');

      (modalNodes[0] as HTMLElement).click();

      await nextTick();

      modalNodes = document.body.querySelectorAll('.modalContainer .modalContent');

      expect(modalNodes).toHaveLength(0);
      await expect(instance).rejects.toBeUndefined();
    });
  });

  describe('when "false"', () => {
    it('should not reject modal on click in .modalContainer', async () => {
      const component = factory(
        {
          global: {
            plugins: [ModalsPlugin]
          }
        }
      );

      const modals = component.vm.$.appContext.provides.modals;

      modals.open(SimpleModal, { rejectOnBackdrop: false });

      await nextTick();

      let modalNodes = document.body.querySelectorAll('.modalContainer');

      expect(modalNodes[0].textContent).toBe('SimpleModal');

      (modalNodes[0] as HTMLElement).click();

      await nextTick();

      modalNodes = document.body.querySelectorAll('.modalContainer');

      expect(modalNodes).toHaveLength(1);
    });

    it('should not reject modal on click in .modalContent', async () => {
      const component = factory(
        {
          global: {
            plugins: [ModalsPlugin]
          }
        }
      );

      const modals = component.vm.$.appContext.provides.modals;

      modals.open(SimpleModal, { rejectOnBackdrop: false })

      await nextTick();

      let modalNodes = document.body.querySelectorAll('.modalContainer .modalContent');

      expect(modalNodes[0].textContent).toBe('SimpleModal');

      (modalNodes[0] as HTMLElement).click();

      await nextTick();

      modalNodes = document.body.querySelectorAll('.modalContainer .modalContent');

      expect(modalNodes).toHaveLength(1);
    });
  });
});

it('should resolve modal when receive a resolve event from Modal', async () => {
  const component = factory(
    {
      global: {
        plugins: [ModalsPlugin]
      }
    }
  );

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
  const component = factory(
    {
      global: {
        plugins: [ModalsPlugin]
      }
    }
  );

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
