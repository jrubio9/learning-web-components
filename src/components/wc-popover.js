// Creamos la estructura del componente
const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      position: relative;
      display: inline-block;
    }

    .popover {
      position: absolute;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 10px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 10;
      display: none;
      opacity: 0;
      transform-origin: center;
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    }

    .popover.show {
      display: block;
      opacity: 1;
      transform: scale(1);
    }

    /* Colocaciones */
    .popover[data-placement="top"] {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) scale(0.9);
    }

    .popover[data-placement="bottom"] {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) scale(0.9);
    }

    .popover[data-placement="left"] {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) scale(0.9);
    }

    .popover[data-placement="right"] {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) scale(0.9);
    }

    .trigger {
      cursor: pointer;
    }
  </style>

  <div class="trigger">
    <slot name="trigger"></slot>
  </div>
  <div class="popover" data-placement="top">
    <slot></slot>
  </div>
`;

class SimplePopover extends HTMLElement {
  constructor() {
    super();
    this.popoverVisible = false;
    this.popoverElement = null;
    this.triggerElement = null;
    this.position = "top";

    // Vinculamos los métodos para que conserven el contexto de `this`
    this.showPopover = this.showPopover.bind(this);
    this.hidePopover = this.hidePopover.bind(this);
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.popoverElement = this.shadowRoot.querySelector(".popover");
    this.triggerElement = this.shadowRoot.querySelector(".trigger");

    // Events
    this.triggerElement.addEventListener("mouseenter", this.showPopover);
    this.triggerElement.addEventListener("mouseleave", this.hidePopover);
    this.triggerElement.addEventListener("focus", this.showPopover);
    this.triggerElement.addEventListener("blur", this.hidePopover);
    // Obtener la posición desde el atributo y establecerla en el popover
    const placement = this.getAttribute("placement") || "top";
    this.setPosition(placement);

  }

  disconnectedCallback() {
    this.triggerElement.removeEventListener("mouseenter", this.showPopover);
    this.triggerElement.removeEventListener("mouseleave", this.hidePopover);
  }

  // Método para mostrar el popover
  showPopover() {
    if (this.popoverElement) {
      this.popoverElement.classList.add("show");
      this.popoverVisible = true;

      // Ajustar la posición si se sale de la pantalla
      this.adjustPositionIfOutOfBounds();
    }
  }

  // Método para ocultar el popover
  hidePopover() {
    console.log("Hide", this.popoverElement);
    if (this.popoverElement) {
      this.popoverElement.classList.remove("show");
      this.popoverVisible = false;
    }
  }

  // Configura la posición del popover
  setPosition(placement) {
    if (this.popoverElement) {
      this.popoverElement.setAttribute("data-placement", placement);
      this.position = placement;
    }
  }

  // Comprueba si el popover se sale de la pantalla y ajusta su posición
  adjustPositionIfOutOfBounds() {
    const rect = this.popoverElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Comprobar si se sale del lado derecho o izquierdo
    if (rect.right > viewportWidth) {
      this.setPosition("left");
    } else if (rect.left < 0) {
      this.setPosition("right");
    }

    // Comprobar si se sale por arriba o abajo
    if (rect.bottom > viewportHeight) {
      this.setPosition("top");
    } else if (rect.top < 0) {
      this.setPosition("bottom");
    }

    // Si la posición ha cambiado, actualizar el popover
    this.popoverElement.setAttribute("data-placement", this.position);
  }
}

// Definimos el custom element
if (!customElements.get("simple-popover")) {
  customElements.define("simple-popover", SimplePopover);
}
