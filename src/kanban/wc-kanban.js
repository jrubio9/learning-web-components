const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: flex;
    flex: 1 1 auto;
    gap: 15px;
    height: 100%;
}

:host(.last-column) {
    display: flex;
    flex-wrap: no-wrap;
    align-items: center;
    justify-content: center;
    min-width: 250px;
    width: min-content;
    height: min-content;
    background-color: var(--marble-2);
    border: 1px solid var(--periwinkle-light);
    border-radius: 8px;
    cursor: pointer;
}
</style>
`;

class Kanban extends HTMLElement {
    #columnsStructure;
    #cards;

    #lastColumnElement;

    constructor() {
        super();
        this.#cards = [];
        this.#columnsStructure = [];
        let lastCol = document.createElement("div");
        lastCol.className = "last-column";
        lastCol.innerHTML = "<span>+ Add column</span>";
        lastCol.style = `
            display: flex;
            flex-wrap: no-wrap;
            align-items: center;
            justify-content: center;
            min-width: 250px;
            width: min-content;
            height: min-content;
            background-color: var(--marble-2);
            border: 1px solid var(--periwinkle-light);
            border-radius: 8px;
            cursor: pointer;
`;

        this.#lastColumnElement = lastCol;
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.render();
    }

    set columnsStructure(data) {
        console.log("Kanban - Set column structure");
        if (data === undefined || this.#columnsStructure === data) return;
        this.#columnsStructure = data;
    }

    set cards(data) {
        console.log("Kanban - SetCards");
        if (data === undefined || this.#cards === data) return;
        this.#cards = data;
        this.render();
    }

    renderColumns() {
        let necesarios = this.#columnsStructure.length;
        const shadowRoot = this.shadowRoot;
        shadowRoot.removeChild(shadowRoot.lastChild);
        while (shadowRoot.childNodes.length > necesarios) {
            shadowRoot.removeChild(shadowRoot.firstChild);
        }

        while (shadowRoot.childNodes.length < necesarios) {
            let columnaKanban = document.createElement("wc-kanban-column");
            columnaKanban.classList.add("wc-kanban-column");
            shadowRoot.appendChild(columnaKanban);
        }

        shadowRoot.appendChild(this.#lastColumnElement);

        return shadowRoot.childNodes;
    }

    render() {
        console.log("Render kanban");
        const renderedColumns = this.renderColumns();
        renderedColumns.forEach((renderedCol, index) => {
            renderedCol.groups = this.#columnsStructure[index]; // List<InfoGroup>
            renderedCol.cards = this.#cards;
        });
    }
}

customElements.define("wc-kanban", Kanban);
