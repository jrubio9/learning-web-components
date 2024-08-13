const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: flex;
    flex: 1 1 auto;
    gap: 15px;
}
</style>
`;
/*
<div id="kanban" class="kanban-board"></div>
*/


class Kanban extends HTMLElement {

    #columnsStructure;
    #cards;

    constructor() {
        super();
        this.#cards = [];
        this.#columnsStructure = [];
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.render();
    }

    set columnsStructure(data) {
        console.log("SetColumnStructure", data);
        if (data === undefined || this.#columnsStructure === data) return;
        this.#columnsStructure = data;
        this.render();
    }

    set cards(data) {
        console.log("SetCards");
        if (data === undefined || this.#cards === data) return;
        this.#cards = data;
        this.render();
    }


    renderColumns() {
        let necesarios = this.#columnsStructure.length;
        console.log("Columnas necesarias", necesarios);
        const shadowRoot = this.shadowRoot;
        while (this.shadowRoot.childNodes.length > necesarios) {
            this.shadowRoot.removeChild(this.shadowRoot.firstChild);
        }

        while (this.shadowRoot.childNodes.length < necesarios) {
            let columnaKanban = document.createElement("wc-kanban-column");
            //columnaKanban.classList.add("wc-kanban-columna");
            this.shadowRoot.appendChild(columnaKanban);
        }
        return this.shadowRoot.childNodes;
    }

    render() {
        console.log("Render kanban");
        const renderedColumns = this.renderColumns();
        console.log("Columnas", renderedColumns);
        renderedColumns.forEach((renderedCol, index) => {
            console.log("Columna", renderedCol, "group", this.#columnsStructure[index]);
            renderedCol.groups = this.#columnsStructure[index]; // List<InfoGroup>
            renderedCol.cards = this.#cards;
        });
    }
};

customElements.define("wc-kanban", Kanban);
