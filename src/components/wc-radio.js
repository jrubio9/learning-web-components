const templateRadio = document.createElement("template");
templateRadio.innerHTML = `
  <style>
    :host {
      --radio-bg: #EEE;
      --radio-active-bg: #fff;
      --radio-color: #334155;
      --radio-radius: 0.5rem;
      --radio-padding: 0.5rem 0;
      --radio-transition: 0.15s ease-in-out;
      display: inline-block;
      font-size: 14px;
      min-width: 250px;
    }

    .radio-inputs {
      display: flex;
      flex-wrap: wrap;
      border-radius: var(--radio-radius);
      background-color: var(--radio-bg);
      box-sizing: border-box;
      box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
      padding: 0.25rem;
    }

    .radio {
      flex: 1 1 auto;
      text-align: center;
      position: relative;
    }

    .radio input {
      display: none;
    }

    .radio .name {
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      border-radius: var(--radio-radius);
      padding: var(--radio-padding);
      color: var(--radio-color);
      transition: all var(--radio-transition);
      user-select: none;
    }

    .radio input:checked + .name {
      background-color: var(--radio-active-bg);
      font-weight: 600;
    }
  </style>
  <div class="radio-inputs"></div>
`;

class RadioButtons extends HTMLElement {
  #container;
  #inputs = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateRadio.content.cloneNode(true));
    this.#container = this.shadowRoot.querySelector(".radio-inputs");
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["options", "selected"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get value() {
    const checkedInput = this.#inputs.find(input => input.checked);
    return checkedInput ? checkedInput.value : null;
  }

  set value(val) {
    this.#inputs.forEach(input => input.checked = input.value === val);
  }

  render() {
    const optionsAttr = this.getAttribute("options") || "";
    const options = optionsAttr.split(",").map(s => s.trim()).filter(Boolean);
    const selected = this.getAttribute("selected");

    this.#container.innerHTML = "";
    this.#inputs = [];

    options.forEach((name, index) => {
      const label = document.createElement("label");
      label.className = "radio";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `radio-${this._uid || (this._uid = Math.random().toString(36).substr(2, 9))}`;
      input.value = name;
      if (selected === name || (!selected && index === 0)) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        this.dispatchEvent(new CustomEvent("change", { detail: { value: this.value } }));
      });

      const span = document.createElement("span");
      span.className = "name";
      span.textContent = name;

      label.appendChild(input);
      label.appendChild(span);
      this.#container.appendChild(label);
      this.#inputs.push(input);
    });
  }
}

if (!customElements.get("wc-radio")) {
  customElements.define("wc-radio", RadioButtons);
}
