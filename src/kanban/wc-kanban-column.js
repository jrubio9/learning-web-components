const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    gap: 10px;
    min-width: 300px;
    max-width: 350px;
}

.groups {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 15px;
    height: min-content;
}

.add-group {
    display: flex;
    align-self: center;
    width: 100%;
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
        color: var(--steel);
        font-weight: 500;
    }    
}

</style>
<div class="groups"></div>
<div class="add-group">
    <span>+ Add group</span>
</div>
`;

class KanbanColumn extends HTMLElement {
  #groups;
  #cards;
  #id;

  #groupsContainer;
  #addGroupElement;

  constructor() {
    super();
    this.#cards = [];
    this.#groups = [];
    this.#id = null;
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.#groupsContainer = shadowRoot.querySelector(".groups");
    this.#addGroupElement = shadowRoot.querySelector(".add-group");

    this.#addGroupElement.addEventListener("click", () => this.clickAddGroup());
  }

  // ===========
  // GETS / SETS
  // ===========

  set groups(data) {
    if (!data || JSON.stringify(data) === JSON.stringify(this.#groups)) {
      return;
    }
    console.log("Kanban Columns - Set groups");
    this.#groups = data;
    this.render();
  }

  set cards(data) {
    //console.log("Kanban Columns - Set cards in column " + this.#id);
    if (JSON.stringify(data) === JSON.stringify(this.#cards)) {
      return;
    }
    console.log("Kanban Columns - Set cards");
    this.#cards = data;
    this.render();
  }

  set id(data) {
    if (data === this.#id) {
      return;
    }
    //console.log("Kanban Columns - Set columnId", data);
    this.#id = data;
  }

  clickAddGroup() {
    var newGroup = this.getNewGroup();
    //console.log("groups", this.#groups);
    this.#groups[this.#id].groups.push(newGroup);
    this.render();
  }

  highestGroupId() {
    return Math.max(
      ...this.#groups
        .flatMap((column) => column.groups)
        .map((group) => group.id)
    );
  }

  getNewGroup() {
    if (!this.#groups) {
      return {
        id: 1,
        title: "New Group",
        classList: "",
        editable: true,
        incidencias: false,
      };
    }
    var currentId = this.highestGroupId();

    return {
      id: currentId + 1,
      title: "New Group",
      editable: true,
      incidencias: false,
    };
  }

  // ===========
  //     AUX
  // ===========

  actualizarCard(eventArgs) {
    //console.log("Se llama actualizarCard de la columna: " + this.#id);
    this.#groupsContainer.childNodes.forEach((group) => {
      group.actualizarCard(eventArgs);
    });
  }

  // ===========
  //   RENDER
  // ===========

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
    //console.log("Kanban - Render column " + this.#id);
    var estructuraGrupos = this.#groups[this.#id].groups;
    if (estructuraGrupos.length === 0) {
      this.#groups[this.#id].groups.push(this.getNewGroup());
    }

    var groups = this.renderColumnGroups(estructuraGrupos.length);
    groups.forEach((renderGroup, index) => {
      var grupo = estructuraGrupos[index];
      renderGroup.group = grupo;
      renderGroup.cards = this.#cards;

      if (grupo.classList) {
        renderGroup.classList.add(grupo.classList);
      }
    });
  }
}
customElements.define("wc-kanban-column", KanbanColumn);
