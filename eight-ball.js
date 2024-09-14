class EightBall extends HTMLElement {
  static register(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "eight-ball", EightBall);
    }
  }

  static observedAttributes = ['data-action'];

  static #appendShadowTemplate = (node) => {
    const template = document.createElement("template");
    template.innerHTML = `
      <slot name="options">
        <option-group aria-live="polite"><slot></slot></option-group>
      </slot>
      <slot name="action">
        <button type="button" part="button">random</button>
      </slot>
    `;
    const shadowRoot = node.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static #adoptShadowStyles = (node) => {
    const shadowStyle = new CSSStyleSheet();
    shadowStyle.replaceSync(`
      * { box-sizing: border-box; }
    `);
    node.shadowRoot.adoptedStyleSheets = [shadowStyle];
  }

  #options;
  #shakeButton;
  #optionGroup;

  get action() { return this.#shakeButton; }
  get options() { return this.#options; }

  set actionText(value) {
    if (!this.#shakeButton || !value) return;
    this.#shakeButton.innerText = value;
  }

  get actionText() { return this.#shakeButton.innerText; }

  get current() {
    return this.#options.find((item) => item.hasAttribute('data-current'));
  }

  set current(toItem) {
    this.#options.forEach((item) => {
      if (item === toItem) {
        item.removeAttribute('hidden');
        item.toggleAttribute('data-current', true);
        item.toggleAttribute('data-tried', true);
      } else {
        item.removeAttribute('data-current');
        item.toggleAttribute('hidden', true);
      }
    });
  }

  get onDeck () {
    const all = this.#options.filter(
      (item) => !item.hasAttribute('data-current')
    );
    const unSeen = all.filter(
      (item) => !item.hasAttribute('data-tried')
    );

    if (unSeen.length > 0) { return unSeen; }

    all.forEach((item) => item.removeAttribute('data-tried'));
    return all;
  }

  constructor() {
    super();
    EightBall.#appendShadowTemplate(this);
    EightBall.#adoptShadowStyles(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue === oldValue) return;

    switch (name) {
      case 'data-action':
        this.actionText = this.dataset.action;
        break;
    }
  }

  connectedCallback() {
    this.#getOptions();
    this.#getAction();

    this.current = this.current || this.#randomFrom(this.#options);
    this.actionText = this.dataset.action;

    this.#shakeButton.addEventListener('click', this.shake);
  };

  disconnectedCallback() {
    this.#shakeButton.removeEventListener('click', this.shake);
  }

  shake = () => {
    if (!document.startViewTransition || !this.hasAttribute('view-transition')) {
      this.#setRandom();
      return;
    }

    document.startViewTransition(() => this.#setRandom());
  }

  #setRandom = () => this.current = this.#randomFrom(this.onDeck);

  #randomFrom = (array) => {
    return array.at(Math.floor(Math.random() * array.length));
  }

  #getOptions = () => {
    this.#optionGroup = this.querySelector(`[slot=options]`);

    if (this.#optionGroup) {
      this.#options = [...this.#optionGroup.children];
    } else {
      this.#optionGroup = this.shadowRoot.querySelector('option-group');
      this.#options = [...this.querySelectorAll(':scope > :not([slot])')];
    }

    this.#optionGroup.setAttribute('aria-live', 'polite');
  }

  #getAction = () => {
    const shakeButtonSlot = this.querySelector('[slot=action]');

    if (shakeButtonSlot) {
      this.#shakeButton = shakeButtonSlot.tagName !== 'Button'
        ? shakeButtonSlot
        : shakeButtonSlot.querySelector('button');

      shakeButtonSlot.removeAttribute('hidden');
    }

    this.#shakeButton = this.#shakeButton
      || this.shadowRoot.querySelector('[part=button]');

    this.#shakeButton.setAttribute('type', 'button');
    this.#shakeButton.removeAttribute('hidden');
  }
}

EightBall.register();
