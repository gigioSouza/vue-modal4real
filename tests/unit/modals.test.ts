import { Modals } from '../../lib';


beforeEach(() => {
  document.body.style.overflow = '';
})

describe('open', () => {
  it('should create ModalWrapper', () => {
    const modals = new Modals();
    const componentDef = {};
    const config = {
      rejectOnBackdrop: true
    };
    const props = {};
    const instance = modals.open(componentDef, config, props);
    expect(instance.constructor.name).toBe('Promise');
    expect(instance.modal).not.toBeUndefined();
    expect(instance.modal.component).toBe(componentDef);
    expect(instance.modal.config).toBe(config);
    expect(instance.modal.props).toBe(props);
  });

  it('should add Modal to instance array', () => {
    const modals = new Modals();

    expect(modals.instances).toHaveLength(0);

    const instance = modals.open({});

    expect(modals.instances[0]).toBe(instance.modal);

    expect(modals.instances).toHaveLength(1);
  });


  it('should use default ModalConfig when omit config or null value', () => {
    const modals = new Modals();

    const defaultConfig = {
      rejectOnBackdrop: true
    };

    let instance = modals.open({});
    expect(instance.modal.config).toStrictEqual(defaultConfig);

    instance = modals.open({}, null);
    expect(instance.modal.config).toStrictEqual(defaultConfig);
  });

  it('should use create empty object when omit props or null value', () => {
    const modals = new Modals();

    const defaultProps = {};

    let instance = modals.open({});
    expect(instance.modal.props).toStrictEqual(defaultProps);

    instance = modals.open({}, null, null);
    expect(instance.modal.props).toStrictEqual(defaultProps);
  });

  it('should block global scroll while opening a modal', () => {
    const modals = new Modals();

    expect(document.body.style.overflow).toBe('');

    modals.open({});

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should release global scroll after all modals has being disposed', async () => {
    const modals = new Modals();

    expect(document.body.style.overflow).toBe('');

    const instance1 = modals.open({});
    const instance2 = modals.open({});

    expect(document.body.style.overflow).toBe('hidden');

    instance1.modal.resolve();

    await instance1;
    expect(document.body.style.overflow).toBe('hidden');

    instance2.modal.resolve();
    await instance2;

    expect(document.body.style.overflow).toBe('');
  });
});

describe('instances', () => {
  it('should remove Modal from instance array when resolve ModalWrapper', (done) => {
    const modals = new Modals();

    const instance = modals.open({});

    expect(modals.instances.includes(instance.modal)).toBeTruthy();

    instance
      .finally(() => {
        expect(modals.instances).toHaveLength(0);
        done();
      });

    instance.modal.resolve();
  });

  it('should remove Modal from instance array when reject ModalWrapper', (done) => {
    const modals = new Modals();

    const instance = modals.open({});

    expect(modals.instances.includes(instance.modal)).toBeTruthy();

    instance
      .catch(() => {})
      .finally(() => {
        expect(modals.instances).toHaveLength(0);
        done();
      });

    instance.modal.reject();
  });
});
