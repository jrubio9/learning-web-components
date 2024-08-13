const template = document.createElement("template");
template.innerHTML = ``
const estilos = `<style>

    /* ==================== */
    /*  RELATIVO A EVENTOS  */
    /* ==================== */
    :host {
        min-height: 42px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0 12px;
        border-radius: 4px;
        border: 1px solid var(--steel);
        background-color: var(--pale-grey-3);
        font-size: 12px;
        transition: transform 100ms;
    }

    :host(:hover) {
        box-shadow: rgba(6, 24, 44, 0.08) 0px 0px 0px 2px, rgba(6, 24, 44, 0.25) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }

    :host(.evento--done) {
        background-color: var(--pastel-green-2);
    }

    :host(.evento--warning) {
        background-color: var(--pastel-yellow);
    }

    :host(.evento--error) {
        background-color: var(--pastel-red);
    }


    /* ==================== */
    /* RELATIVO A UN EVENTO */
    /* ==================== */
    .evento__hora {
        padding: 4px 6px;
        border-radius: 4px;
        font-weight: 500;
        background-color: var(--pale-grey);
        font-size: 13px;
    }

    .evento__hora--claro {
        background-color: var(--marble-2);
    }

    .evento__datos {
        display: flex;
        flex: 1 1 auto;
        align-items: center;
    }

    .evento__datos--vehiculo {
        font-weight: 600;
        font-size: 13px;
    }

    .evento__datos--descripcion {
        flex-grow: 1;
        font-weight: 500;
    }

    .evento__duracion {
        justify-self: flex-end;
    }
</style>
`;

class CalendarioEvento extends HTMLElement {
    #eventoElement;
    #datos;
    #vista;
    #estilos;

    constructor() {
        super();
        this.#datos = null;
        this.#vista = "";
        this.#estilos = estilos;
    }

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#eventoElement = this.shadowRoot.getRootNode().host;

        this.#eventoElement.addEventListener("click", () => this.lanzarEventoClickCard());
    }

    disconnectedCallback() {
        this.#eventoElement.removeEventListener("click", () => this.lanzarEventoClickCard());
    }

    lanzarEventoClickCard() {
        const event = new CustomEvent("click-evento", {
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
        //this.render();
    }

    get datos() {
        return this.#datos;
    }

    set vista(nuevoHtml) {
        if (this.#vista && this.#vista === nuevoHtml) {
            return;
        }
        var estilosAplicar = this.#estilos && this.#estilos !== "" ? this.#estilos : templateStr;
        this.#vista = estilosAplicar + nuevoHtml;
        this.render();
    }

    esIgual(evento) {
        return this.#datos.hora === evento.hora && this.#datos.tipo === evento.tipo && this.#datos.vehiculo === evento.vehiculo && this.#datos.descripcion === evento.descripcion && this.#datos.duracion === evento.duracion;
    }

    render() {
        this.shadowRoot.innerHTML = this.#vista;
    }
}

customElements.define("wc-evento", CalendarioEvento);
