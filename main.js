import "./style.css";

const cards = [
    {
        title: "9999AAA",
        desc: "Volkswagen Sciro G",
    },
    {
        title: "9999BBB",
        desc: "Honda Civic",
    },
];

const columnEstructure = [
    {
        groups: [
            {
                title: "Entradas",
                editable: true,
                customBgColor: "#FF0000",
                customTitleColor: "#FFFFFF",
            }
        ],
    },
    {
        groups: [
            {
                title: "En curso con incidencias",
                editable: false,
                customBgColor: "#FF0000",
                customTitleColor: "#FFFFFF",
            },
            {
                title: "En curso",
                editable: false,
                customBgColor: "#00FF00",
                customTitleColor: "#FFFFFF",
            },
        ],
    },
];

// Espera hasta que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    const kanban = document.querySelector("wc-kanban");
    console.log(columnEstructure.length);
    kanban.columnsStructure = columnEstructure;
    kanban.cards = cards;
});