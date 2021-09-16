import { Component, markRaw, reactive, UnwrapRef } from 'vue';

type ModalProps = {
  [key: string]: any
};

interface ModalWrapper extends Promise<any> {
  modal: Modal
}

interface ModalConfig {
  rejectOnBackdrop: boolean;
}

interface Modal {
  component: Component;
  config: ModalConfig;
  props: ModalProps;
  resolve: Function;
  reject: Function;
}

export {
  ModalWrapper,
  ModalConfig,
  Modal
}

export class Modals {
  readonly instances: UnwrapRef<Modal[]> = reactive([]);
  private scrollBlocked = false;

  public open(component: Component, config?: ModalConfig|null, props?: ModalProps|null): ModalWrapper {
    if (config == null) {
      config = { rejectOnBackdrop: true };
    }
    if (props == null) {
      props = {};
    }
    let { promise, resolve, reject } = destructuredPromise();

    const modalWrapper = promise as ModalWrapper
    modalWrapper.modal = {
      component,
      config,
      props,
      resolve: (value: any) => {
        this.dispose(modalWrapper);
        resolve(value);
      },
      reject: (value: any) => {
        this.dispose(modalWrapper);
        reject(value);
      }
    };

    this.instances.push(markRaw(modalWrapper.modal));
    this.blockScroll();

    return modalWrapper;
  }

  public dispose(modalWrapper: ModalWrapper): void {
    const index = this.instances.indexOf(modalWrapper.modal);
    this.instances.splice(index, 1);
    this.releaseScroll();
  }

  private blockScroll(): void {
    if (!this.scrollBlocked) {
      this.scrollBlocked = true;
      document.body.style.overflow = 'hidden';
    }
  }

  private releaseScroll(): void {
    if (this.instances.length === 0) {
      this.scrollBlocked = false;
      document.body.style.overflow = '';
    }
  }
}

function destructuredPromise(): { promise: Promise<any>, resolve: Function, reject: Function } {
  let resolve: Function;
  let reject: Function;
  const promise = new Promise((rs, rj) => {
    resolve = rs;
    reject = rj;
  });

  // @ts-ignore
  return { promise, resolve, reject };
}
