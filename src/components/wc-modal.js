// Creamos la estructura del componente
const template = document.createElement("template");
template.innerHTML = `
  <style>
    .jw-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      justify-content: center;
      align-items: center;
    }

    .jw-modal.open {
      display: flex;
    }

    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      position: relative;
      max-width: 500px;
      width: 100%;
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
  </style>

  <div id="modal" class="jw-modal">
    <div class="modal-content">
        <slot name="header"></slot>
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

  // TOODO: Lanzar evento modalCreado para poderlo llamar el open desde otro componente

  connectedCallback() {
    // Seleccionar el modal y el botón de cierre
    this.#modal = this.shadowRoot.querySelector("#modal");
    this.#closeButton = this.shadowRoot.querySelector(".close-button");

    // Añadir event listener para cerrar el modal
    this.#closeButton.addEventListener("click", () => this.closeModal);

    // Renderizar el contenido inicial (si es necesario)
    this.render();
  }

  render() {
    // Aquí podrías renderizar contenido adicional o dinámico si fuera necesario
  }

  // Método para abrir el modal
  openModal() {
    this.#modal.classList.add("open");
    document.body.classList.add("jw-modal-open");
  }

  // Método para cerrar el modal
  closeModal() {
    this.#modal.classList.remove("open");
    document.body.classList.remove("jw-modal-open");
  }

  disconnectedCallback() {
    // Limpiar los event listeners cuando el componente sea removido del DOM
    this.#closeButton.removeEventListener("click", this.closeModal.bind(this));
  }
}

// Definir el custom element
customElements.define("wc-modal", WcModal);
