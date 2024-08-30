const cards = [
    {
        id: 0,
        groupId: 0,
        title: "9999AAA",
        desc: "Volkswagen Sciro G",
    },
    {
        id: 1,
        groupId: 0,
        title: "9999AAA",
        desc: "Volkswagen Sciro G",
    },
    {
        id: 2,
        groupId: 1,
        title: "9999BBB",
        desc: "Honda Civic",
    },
    {
        id: 3,
        groupId: 1,
        title: "9999BBB",
        desc: "Honda Civic",
    },
    {
        id: 4,
        groupId: 1,
        title: "9999BBB",
        desc: "Honda Civic",
    },
    {
        id: 5,
        groupId: 2,
        title: "9999BBB",
        desc: "Honda Civic",
    },
];

const columnEstructure = [
    {
        groups: [
            {
                id: 0,
                title: "Entradas",
                classList: "",
                editable: true,
                incidencias: false
            }
        ],
    },
    {
        groups: [
            {
                id: 1,
                title: "En curso con incidencias",
                classList: "disabled;incidencias",
                editable: false,
                color: "#FF0000",
                incidencias: true,
            },
            {
                id: 2,
                title: "En curso",
                classList: "disabled",
                editable: false,
                incidencias: false
            },
        ],
    },
];

function Kanban() {
    const kanban = document.querySelector("wc-kanban");
    kanban.columnsStructure = columnEstructure;
    kanban.cards = cards;
}

export const modelo = new Kanban();