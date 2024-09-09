const registeredVacations = [];

const users = [
  {
    id: 1,
    name: "User 1",
    color: "blue",
  },
  {
    id: 2,
    name: "User 2",
    color: "red",
  },
  {
    id: 3,
    name: "User 3",
    color: "green",
  },
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

let currentUser = null;

function VacationsCalendar() {
  let fechaInicial = new Date();
  let fechaFinal = new Date();

  const monthTitle = document.getElementById("monthTitle");

  const vacationsCalendar = document.getElementById("vacations");
  vacationsCalendar.vistaMes = true;
  vacationsCalendar.eventos = registeredVacations;

  vacationsCalendar.addEventListener("nuevo", (e) => {
    console.log("evento nuevo!", e.detail);
  });

  vacationsCalendar.addEventListener("click-evento", (e) => {
    console.log("Click en evento!", e.detail);
  });

  // Movilidad

  const clickCambioPeriodo = (cantidad) => {
    if (!vacationsCalendar) return;
    vacationsCalendar.cambiarPeriodoFijo(cantidad);
    setTitleMonth(vacationsCalendar.range_start);
  };

  const buttonHoy = document.getElementById("btnHoy");
  buttonHoy.addEventListener("click", () => {
    clickHoy();
  });

  const btnFlechaLeft = document.getElementById("btnFlechaLeft");
  btnFlechaLeft.addEventListener("click", () => {
    clickCambioPeriodo(-1);
  });

  const btnFlechaRight = document.getElementById("btnFlechaRight");
  btnFlechaRight.addEventListener("click", () => {
    clickCambioPeriodo(1);
  });

  // AUX

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const setTitleMonth = (date) => {
    console.log("Date: " + date);
  monthTitle.innerText =
    "Vacations of " + months[date.getMonth()];
  };

  setTitleMonth(vacationsCalendar.range_start);
}

export const modelo = new VacationsCalendar();
