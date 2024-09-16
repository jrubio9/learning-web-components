// Creamos la estructura del componente
const template = document.createElement("template");
template.innerHTML = `
  <style>

    .wc-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      justify-content: center;
      align-items: center;

      &.open {
        display: flex;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;

      }

      .body {
        
      }

      .footer {

      }
    }

    .modal-window {
      background-color: white;
      border-radius: 10px;
      position: relative;
      max-width: 500px;
      width: 100%;
    }

    .close-button {
      cursor: pointer;
    }

  </style>

  <div id="modal" class="wc-modal">
    <div class="modal-window">
        <div class="header">
          <slot name="header"></slot>
          <span class="close-button">X</span>
        </div>
        <slot name="body"></slot>
        <slot name="footer"></slot>
    </div>
  </div>
`;

class WcModal extends HTMLElement {
  #modal = null;
  #closeButton = null;

  constructor() {
    super();
    // Attach Shadow DOM
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // Seleccionar el modal y el botón de cierre
    this.#modal = this.shadowRoot.querySelector("#modal");
    this.#closeButton = this.shadowRoot.querySelector(".close-button");
    this.#closeButton.addEventListener("click", () => this.closeModal());

    // Renderizar el contenido inicial (si es necesario)
    this.render();
  }

  render() {
    // Aquí podrías renderizar contenido adicional o dinámico si fuera necesario
  }

  // Método para abrir el modal
  openModal() {
    this.#modal.classList.add("open");
  }

  // Método para cerrar el modal
  closeModal() {
    this.#modal.classList.remove("open");
  }

  disconnectedCallback() {
    // Limpiar los event listeners cuando el componente sea removido del DOM
    this.#closeButton.removeEventListener("click", () => this.closeModal);
  }
}

// Definir el custom element
customElements.define("wc-modal", WcModal);
