const template = document.createElement("template");
template.innerHTML = ``
const estilos = `<style>
    :host {
        min-height: 75px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 0 12px;
        border-radius: 4px;
        border: 1px solid var(--pale-grey-2);
        background-color: var(--pale-grey-3);
        font-size: 12px;
        transition: transform 100ms;
    }

    :host(:hover) {
        box-shadow: rgba(6, 24, 44, 0.08) 0px 0px 0px 2px, rgba(6, 24, 44, 0.25) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }

</style>
`;

class Card extends HTMLElement {
    #cardElement;
    #datos;
    #vista;

    #html;
    #estilos;

    constructor() {
        super();
        this.#datos = null;
        this.#vista = "";

        this.#html = "";
        this.#estilos = estilos;
    }

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#cardElement = this.shadowRoot.getRootNode().host;

        this.#cardElement.addEventListener("click", () => this.lanzarEventoClickCard());
    }

    disconnectedCallback() {
        this.#cardElement.removeEventListener("click", () => this.lanzarEventoClickCard());
    }

    lanzarEventoClickCard() {
        const event = new CustomEvent("click-card", {
            detail: this.#datos,
            bubbles: true,
            composed: true
        });

        this.shadowRoot.firstChild.dispatchEvent(event);
    }

    // ===========
    // GETS / SETS
    // ===========

    set datos(datos) {
        if (this.#datos && this.esIgual(datos)) {
            return;
        }
        this.#datos = datos;
    }

    get datos() {
        return this.#datos;
    }

    set vista(nuevoHtml) {
        if (this.#vista && this.#vista === nuevoHtml) {
            return;
        }
        this.#html = nuevoHtml;
        var estilosAplicar = this.#estilos && this.#estilos !== "" ? this.#estilos : estilos;
        this.#vista = estilosAplicar + nuevoHtml;
        this.render();
    }

    set estilos(nuevoCss) {
        if (this.estilos === nuevoCss){
            return;
        }
        this.#estilos = nuevoCss;
        this.#vista = this.#estilos + this.#html;
    }

    esIgual(evento) {
        return this.#datos.hora === evento.hora && this.#datos.tipo === evento.tipo && this.#datos.vehiculo === evento.vehiculo && this.#datos.descripcion === evento.descripcion && this.#datos.duracion === evento.duracion;
    }

    render() {
        this.shadowRoot.innerHTML = this.#vista;
    }
}

customElements.define("wc-card", Card);
