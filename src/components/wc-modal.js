const template = document.createElement("template");
template.innerHTML = `
<style>
  :host {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 10000;
  }

  :host([open]) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,.5);
  }

  .modal {
    position: relative;
    background: white;
    border-radius: 12px;
    max-width: 720px;
    width: 90%;
    max-height: 90vh;
    display: flex;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,.2);
    animation: enter 200ms ease;
  }

  .image {
    flex: 0 0 280px;
    background: #f5f5f5;
    display: none;
  }

  :host([has-image]) .image {
    display: flex;
  }

  :host([has-image]) .modal {
    max-width: 1000px;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  header, footer {
    padding: 20px;
  }

  main {
    padding: 0 20px;
    overflow-y: auto;
  }

  .close {
    position: absolute;
    top: 12px;
    right: 16px;
    font-size: 28px;
    cursor: pointer;
    background: none;
    border: none;
  }

  @keyframes enter {
    from { transform: scale(.95); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  @media (max-width: 768px) {
  .image {
    display: none !important;
  }
}
</style>

<div class="overlay"></div>

<div class="modal">
  <button class="close" aria-label="Cerrar">&times;</button>

  <div class="image">
    <slot name="image"></slot>
  </div>

  <div class="content">
    <header>
      <slot name="header"></slot>
    </header>

    <main>
      <slot name="body"></slot>
    </main>

    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</div>
`;

export class WCModal extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

    connectedCallback() {
        const imageSlot = this.shadowRoot.querySelector('slot[name="image"]');

        const updateImageState = () => {
            const hasContent = imageSlot.assignedElements().length > 0;

            if (hasContent) {
            this.setAttribute("has-image", "");
            } else {
            this.removeAttribute("has-image");
            }
        };

        imageSlot.addEventListener("slotchange", updateImageState);
        updateImageState();

        this.shadowRoot.querySelector(".overlay")
            .addEventListener("click", () => this.close());

        this.shadowRoot.querySelector(".close")
            .addEventListener("click", () => this.close());

        document.addEventListener("keydown", this.#onKeyDown);
    }

  disconnectedCallback() {
    document.removeEventListener("keydown", this.#onKeyDown);
  }

  #onKeyDown = (e) => {
    if (e.key === "Escape" && this.hasAttribute("open")) {
      this.close();
    }
  };

  open() {
    this.setAttribute("open", "");
  }

  close() {
    this.removeAttribute("open");
  }
}

customElements.define("wc-modal", WCModal);