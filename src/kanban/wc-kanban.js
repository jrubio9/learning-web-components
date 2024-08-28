const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: flex;
    flex: 1 1 auto;
    gap: 15px;
    height: 100%;
}
.columns {
    display: flex;
    flex: 1 1 auto;
    gap: 15px;
}
.last-column {
    display: flex;
    width: 200px;
    flex-wrap: no-wrap;
    align-items: center;
    justify-content: center;
    height: min-content;
    border: 1px solid var(--periwinkle-light);
    border-radius: 8px;
    padding: 6px 2px;
    cursor: pointer;

    &:hover {
        background-color: var(--marble-2);
    }

    & span {
        font-size: 12px;
        color: var(--slate);
        font-weight: 500;
    }    
}
</style>

<div class="columns"></div>
<div class="last-column">
    <span>+ Add column</span>
</div>
`;

class Kanban extends HTMLElement {
    #columnsStructure;
    #cards;

    #columnsElement;
    #addColumnElement; 

    constructor() {
        super();
        this.#cards = [];
        this.#columnsStructure = [];
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.#columnsElement = this.shadowRoot.querySelector(".columns");
        this.#addColumnElement = this.shadowRoot.querySelector(".last-column");

        this.#addColumnElement.addEventListener("click", () => this.clickAddColumn());
        this.render();
    }

    clickAddColumn() {
        let columnaKanban = document.createElement("wc-kanban-column");
        columnaKanban.classList.add("wc-kanban-column");
        this.#columnsElement.appendChild(columnaKanban);
        var newGroup = this.getNewGroup();
        columnaKanban.groups = {groups: [newGroup]};
    }

    getNewGroup() {
        if (!this.#columnsStructure || !this.#columnsStructure[this.#columnsStructure.length - 1].groups) {
            return {
                id: 1,
                title: "New Group",
                editable: true
            }
        } 
        var lastColumnGroups = this.#columnsStructure[this.#columnsStructure.length - 1].groups;
        var nextId = lastColumnGroups[lastColumnGroups.length - 1].id;
        console.log(nextId);

        return {
            id: nextId + 1,
            title: "New Group",
            editable: true
        }
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
        const columns = this.#columnsElement;
        while (columns.childNodes.length > necesarios) {
            columns.removeChild(columns.firstChild);
        }

        while (columns.childNodes.length < necesarios) {
            let columnaKanban = document.createElement("wc-kanban-column");
            columnaKanban.classList.add("wc-kanban-column");
            columns.appendChild(columnaKanban);
        }

        return this.#columnsElement.childNodes;
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
