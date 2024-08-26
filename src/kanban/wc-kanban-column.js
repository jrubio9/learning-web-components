const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: flex;
    flex: 1 1 auto;
    gap: 15px;
    max-width: 350px;
}

.groups {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    height: min-content;
}
</style>
<div class="groups"></div>
`;

class KanbanColumn extends HTMLElement {
    #groups;
    #cards;
    #groupsContainer;


    constructor() {
        super();
        this.#cards = [];
        this.#groups = [];
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.#groupsContainer = shadowRoot.querySelector(".groups");
    }

    set groups(data) {
        if (!data || data === this.#groups) {
            return;
        }
        console.log("Kanban Columns - Set groups");
        this.#groups = data;
        this.render();
    }
    
    set cards(data) {
        if (!data || data === this.#cards) {
            return;
        }
        console.log("Kanban Columns - Set cards");
        this.#cards = data;
        this.render();
    }

    renderColumnGroups(needed) {
        while (this.#groupsContainer.childNodes.length > needed - 1) {
            this.#groupsContainer.removeChild(this.#groupsContainer.lastChild);
        }

        while (this.#groupsContainer.childNodes.length < needed) {
            let kanbanGroup = document.createElement("wc-kanban-group");
            this.#groupsContainer.appendChild(kanbanGroup);
        }
        return this.#groupsContainer.childNodes;
    }

    render() {
        var estructuraGrupos = this.#groups.groups;
        var groups = this.renderColumnGroups(estructuraGrupos.length);
        groups.forEach((renderGroup, index) => {
            var grupo = estructuraGrupos[index];
            renderGroup.group = grupo;
            renderGroup.cards = this.#cards;
        });
    }
}
customElements.define("wc-kanban-column", KanbanColumn);
