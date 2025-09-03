const template = document.createElement("template");
template.innerHTML = `
      <style>
        .switch {
          --_switch-bg-clr: #70a9c5;
          --_switch-padding: 4px;
          --_slider-bg-clr: rgba(12, 74, 110, 0.65);
          --_slider-bg-clr-on: rgba(12, 74, 110, 1);
          --_slider-txt-clr: #ffffff;
          --_label-padding: 1rem 2rem;
          --_switch-easing: cubic-bezier(0.47,1.64,0.41,0.8);

          color: white;
          width: fit-content;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          border-radius: 9999px;
          cursor: pointer;
          position: relative;
          isolation: isolate;
        }

        .switch input[type="checkbox"] {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .switch > span {
          display: grid;
          place-content: center;
          transition: opacity 300ms ease-in-out 150ms;
          padding: var(--_label-padding);
        }
        .switch::before,
        .switch::after {
          content: "";
          position: absolute;
          border-radius: inherit;
          transition: inset 150ms ease-in-out;
        }
        .switch::before {
          background-color: var(--_slider-bg-clr);
          inset: var(--_switch-padding) 50% var(--_switch-padding) var(--_switch-padding);
          transition: inset 500ms var(--_switch-easing), background-color 500ms ease-in-out;
          z-index: -1;
          box-shadow: inset 0 1px 1px rgba(0,0,0,0.3), 0 1px rgba(255,255,255,0.3);
        }
        .switch::after {
          background-color: var(--_switch-bg-clr);
          inset: 0;
          z-index: -2;
        }
        .switch:focus-within::after {
          inset: -0.25rem;
        }
        .switch:has(input:checked):hover > span:first-of-type,
        .switch:has(input:not(:checked)):hover > span:last-of-type {
          opacity: 1;
          transition-delay: 0ms;
          transition-duration: 100ms;
        }
        .switch:has(input:checked):hover::before {
          inset: var(--_switch-padding) var(--_switch-padding) var(--_switch-padding) 45%;
        }
        .switch:has(input:not(:checked)):hover::before {
          inset: var(--_switch-padding) 45% var(--_switch-padding) var(--_switch-padding);
        }
        .switch:has(input:checked)::before {
          background-color: var(--_slider-bg-clr-on);
          inset: var(--_switch-padding) var(--_switch-padding) var(--_switch-padding) 50%;
        }
        .switch > span:last-of-type,
        .switch > input:checked + span:first-of-type {
          opacity: 0.75;
        }
        .switch > input:checked ~ span:last-of-type {
          opacity: 1;
        }
      </style>
      <label class="switch" aria-label="Toggle Switch">
        <input type="checkbox" />
            <span class="left"></span>
            <span class="right"></span>
      </label>
    `;


    class ToggleText extends HTMLElement {
  
        static get observedAttributes() {
            return ["left-label", "right-label"];
        }

        #input;
        #leftSpan;
        #rightSpan;

        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            
            this.#input = this.shadowRoot.querySelector("input");
            this.#leftSpan = this.shadowRoot.querySelector(".left");
            this.#rightSpan = this.shadowRoot.querySelector(".right");

            // inicializar etiquetas
            this.updateLabels();
        }

        connectedCallback() {
            this.#input.addEventListener("change", this.handleChange);
        }

        disconnectedCallback() {
            this.#input.removeEventListener("change", this.handleChange);
        }
  
        attributeChangedCallback() {
            this.updateLabels();
        }

        updateLabels() {
            this.#leftSpan.textContent =  this.getAttribute("left-label") || "Latest";
            this.#rightSpan.textContent = this.getAttribute("right-label") || "Popular";
        }

        handleChange = (event) => {
            const value = event.target.checked; // true/false
            this.dispatchEvent(new CustomEvent("change", { detail: { value } }));
        };

        get value() {
            return this.#input.checked;
        }

        set value(val) {
            const boolVal = Boolean(val);
            if (this.#input.checked !== boolVal) {
                this.#input.checked = boolVal;
            }
        }
    }


// Definimos el custom element
if (!customElements.get("wc-toggle-text")) {
  customElements.define("wc-toggle-text", ToggleText);
}
