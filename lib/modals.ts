import { App, Component, markRaw, reactive, UnwrapRef } from 'vue';

type ModalProps = {
  [key: string]: any
};

export interface ModalDefinition {
  component: Component,
  config?: ModalConfig,
  props?: ModalProps,
}

export interface ModalConfig {
  rejectOnBackdrop: boolean;
}

interface ModalInstace extends Promise<any> {
  modal: Modal
}

export class Modal implements ModalDefinition{
  readonly component: Component;
  readonly config: ModalConfig;
  readonly props: ModalProps;
  public resolve: Function = () => {};
  public reject: Function = () => {};

  private constructor(component: Component, config: ModalConfig, props: ModalProps, resolveFn: Function, rejectFn: Function) {
    this.component = component;
    this.config = config;
    this.props = props;
    this.resolve = resolveFn;
    this.reject = rejectFn;
  }

  static build(component: Component, config: ModalConfig, params: ModalProps): ModalInstace {
    let resolveFn: Function;
    let rejectFn: Function;
    const promise = new Promise((resolve, reject) => {
      resolveFn = resolve;
      rejectFn = reject;
    });
    // @ts-ignore
    promise.modal = new Modal(component, config, params, resolveFn, rejectFn);
    return promise as ModalInstace;
  }
}

export default class Modals {
  private app: App;
  private modals: UnwrapRef<Modal[]> = reactive([]);
  private scrollBlocked = false;

  constructor(app: App) {
    this.app = app;
    app.provide('modals:modals', this.modals);
  }


  public open(component: Component, config?: ModalConfig, props?: ModalProps): ModalInstace {
    if (config == null) {
      config = { rejectOnBackdrop: true };
    }
    if (props == null) {
      props = {};
    }
    const modalInstace = Modal.build(component, config, props);

    modalInstace
      .then(value => {
        this.dispose(modalInstace.modal);
        return value;
      })
      .catch(value => {
        this.dispose(modalInstace.modal);
        return Promise.reject(value);
      });

    this.modals.push(markRaw(modalInstace.modal));
    this.blockScroll();

    return modalInstace;
  }

  public dispose(modal: Modal): void {
    const index = this.modals.indexOf(modal);
    this.modals.splice(index, 1);
    this.releaseScroll();
  }

  private blockScroll(): void {
    if (!this.scrollBlocked) {
      this.scrollBlocked = true;
      document.body.style.overflow = 'hidden';
    }
  }

  private releaseScroll(): void {
    if (this.modals.length === 0) {
      this.scrollBlocked = false;
      document.body.style.overflow = 'auto';
    }
  }
}
