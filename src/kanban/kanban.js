
const cards = [
    {
        groupId: 1,
        title: "9999AAA",
        desc: "Volkswagen Sciro G",
    },
    {
        groupId: 1,
        title: "9999AAA",
        desc: "Volkswagen Sciro G",
    },
    {
        groupId: 2,
        title: "9999BBB",
        desc: "Honda Civic",
    },
    {
        groupId: 2,
        title: "9999BBB",
        desc: "Honda Civic",
    },
    {
        groupId: 2,
        title: "9999BBB",
        desc: "Honda Civic",
    },
    {
        groupId: 3,
        title: "9999BBB",
        desc: "Honda Civic",
    },
];

const columnEstructure = [
    {
        groups: [
            {
                id: 1,
                title: "Entradas",
                editable: true
            }
        ],
    },
    {
        groups: [
            {
                id: 2,
                title: "En curso con incidencias",
                editable: false,
                customTitleColor: "#FF0000",
            },
            {
                id: 3,
                title: "En curso",
                editable: false
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