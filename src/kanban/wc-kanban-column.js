const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: flex;
    flex: 1 1 auto;
    gap: 15px;
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
        this.#groups = data;
        this.render();
    }

    set cards(data) {
        this.#cards = data;
        this.render();
    }

  renderColumnGroups(needed) {
    while (this.#groupsContainer.childNodes.length > needed) {
      this.#groupsContainer.removeChild(this.shadowRoot.firstChild);
    }

    while (this.#groupsContainer.childNodes.length < needed) {
      let card = document.createElement("wc-kanban-group");
      this.#groupsContainer.appendChild(card);
    }
    return this.shadowRoot.childNodes;
  }

    render() {
        console.log("Render groups", this.#groups.length);
        this.renderColumnGroups(this.#groups.length);
    }
}
customElements.define("wc-kanban-column", KanbanColumn);