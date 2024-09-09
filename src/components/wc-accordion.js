const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px 20px;
      border-radius: 4px;
      border: 1px solid var(--steel);
      background-color: var(--marble-2);
      flex: 1 1 auto;
      height: min-content;
      font-size: 12px;
      transition: transform 100ms;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 8px 0;
      font-weight: bold;
    }

    .ico {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      width: 20px;
      height: 20px;
      transition: transform 200ms;
      cursor: pointer;
      user-select: none;
    }

    .ico.rotated {
      transform: rotate(180deg);
    }

    .title {
      font-size: 16px;
      user-select: none;
    }

    .content {
      display: none;
      padding: 8px 0;
    }

    .content.expanded {
      display: block;
    }

  </style>

  <span class="header">
    <slot name="title" class="title">Nothing here...</slot>
    <span class="ico">v</span>
  </span>
  <slot name="content" class="content"></slot>

`;

export class Accordion extends HTMLElement {
  #htmlContent;
  #expanded;

  #headerElement;
  #buttonElement;
  #htmlContentElement;

  constructor() {
    super();
    this.#htmlContent = "";
    this.#expanded = false; // por defecto cerrado
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Seleccionamos los elementos del shadow DOM
    this.#headerElement = this.shadowRoot.querySelector(".header");
    this.#buttonElement = this.shadowRoot.querySelector(".ico");
    this.#htmlContentElement = this.shadowRoot.querySelector(".content");

    // Agregamos el event listener para el header
    this.#headerElement.addEventListener("click", this.changeAccordionState.bind(this));
  }

  disconnectedCallback() {
    // Eliminamos el event listener cuando el componente se desconecta
    this.#headerElement.removeEventListener("click", this.changeAccordionState.bind(this));
  }

  changeAccordionState() {
    // Cambiamos el estado expandido/contraído
    this.#expanded = !this.#expanded;

    // Llamamos a la función render para aplicar los cambios visuales
    this.render();
  }

  // Función que renderiza los cambios visuales
  render() {
    // Actualizamos el estado de expansión del contenido
    if (this.#expanded) {
      this.#htmlContentElement.classList.add("expanded");
      this.#buttonElement.classList.add("rotated");
    } else {
      this.#htmlContentElement.classList.remove("expanded");
      this.#buttonElement.classList.remove("rotated");
    }
  }

  // GET / SET
  setHtmlContent(value) {
    if (this.#htmlContent === value) return;
    this.#htmlContent = value;
    this.#htmlContentElement.innerHTML = value;

    if (this.#expanded) {
      this.render();
    }
  }

  set expanded(value) {
    if (this.#expanded === value) return;
    this.#expanded = value;
    this.render();
  }
}

if (!customElements.get("wc-accordion")) {
  customElements.define("wc-accordion", Accordion);
}
