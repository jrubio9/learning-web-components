import "../..//calendario.css";

const eventos = [
  {
    fecha: "2024-07-29",
    hora: "8:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "",
  },
  {
    fecha: "2024-07-29",
    hora: "19:30h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "",
  },
  {
    fecha: "2024-07-29",
    hora: "8:00h",
    vehiculo: "9999AAA",
    desc: "Entrada VOLKSWAGEN SCIRO G",
    duracion: "",
    tipo: "tipo2",
  },
  {
    fecha: "2024-07-29",
    hora: "9:00h",
    vehiculo: "9999AAA",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo3",
  },
  {
    fecha: "2024-07-29",
    hora: "19:30h",
    vehiculo: "9999AAA",
    desc: "Salida VOLKSWAGEN SCIRO G",
    duracion: "",
    tipo: "tipo2",
  },
  {
    fecha: "2024-07-29",
    hora: "15:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "",
    tipo: "tipo3",
  },
  {
    fecha: "2024-07-29",
    hora: "17:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "",
    tipo: "tipo3",
  },
  {
    fecha: "2024-07-29",
    hora: "",
    vehiculo: "",
    desc: "Inventario taller 2 CUAT",
    duracion: "",
    tipo: "tipo1",
  },
  {
    fecha: "2024-07-30",
    hora: "",
    vehiculo: "",
    desc: "Reposición material equipo Chapa",
    duracion: "",
    tipo: "tipo2",
  },
  {
    fecha: "2024-07-30",
    hora: "8:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo1",
  },
  {
    fecha: "2024-07-30",
    hora: "19:30h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo1",
  },
  {
    fecha: "2024-07-30",
    hora: "15:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo2",
  },
  {
    fecha: "2024-07-30",
    hora: "17:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo4",
  },
  {
    fecha: "2024-07-30",
    hora: "15:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo2",
  },
  {
    fecha: "2024-07-30",
    hora: "17:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo3",
  },
  {
    fecha: "2024-07-31",
    hora: "15:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo2",
  },
  {
    fecha: "2024-07-31",
    hora: "17:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo3",
  },
  {
    fecha: "2024-07-31",
    hora: "15:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo2",
  },
  {
    fecha: "2024-08-01",
    hora: "17:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo3",
  },
  {
    fecha: "2024-08-01",
    hora: "15:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo2",
  },
  {
    fecha: "2024-08-02",
    hora: "17:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo3",
  },
  {
    fecha: "2024-08-03",
    hora: "17:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo3",
  },
  {
    fecha: "2024-08-04",
    hora: "17:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo3",
  },
  {
    fecha: "2024-08-05",
    hora: "17:00h",
    vehiculo: "",
    desc: "Cambio de ruedas",
    duracion: "3h",
    tipo: "tipo3",
  },
];

let dateFecha = new Intl.DateTimeFormat("es-ES", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function Calendario() {
  const calendario = document.querySelector("wc-calendario");
  //calendario.dias = 31; // Por defecto vendrán 7
  calendario.eventos = eventos;

  let fechaInicial = new Date();
  let fechaFinal = new Date();

  calendario.addEventListener("nuevo", (e) => {
    console.log("evento nuevo!", e.detail);
  });

  calendario.addEventListener("click-evento", (e) => {
    console.log("Click en evento!", e.detail);
  });

  const buttonSemana = document.getElementById("btnSemana");
  buttonSemana.addEventListener("click", () => {
    clickVistaSemana();
  });

  const buttonMes = document.getElementById("btnMes");
  buttonMes.addEventListener("click", () => {
    clickVistaMes();
  });

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

  const inputFecha = document.getElementById("finicio");
  inputFecha.addEventListener("change", () => {
    if (!calendario) return;
    if (!inputFecha.value) return;

    calendario.fechaInicial = inputFecha.value;
  });

  const inputDias = document.getElementById("diasMostrar");
  inputDias.addEventListener("change", () => {
    if (!calendario) return;
    if (!inputDias.value) return;

    calendario.dias = parseInt(inputDias.value);
  });

  const formatearFecha = (date) => {
    return dateFecha.format(date);
  };

  // MÉTODOS

  const clickHoy = () => {
    if (!calendario) return;
    calendario.navegarHoy();
    fechaInicial = formatearFecha(calendario.range_start);
    fechaFinal = formatearFecha(calendario.range_end);
  };

  const clickCambioPeriodo = (cantidad) => {
    if (!calendario) return;
    calendario.cambiarPeriodoFijo(cantidad);
    fechaInicial = formatearFecha(calendario.range_start);
    fechaFinal = formatearFecha(calendario.range_end);
  };

  const clickVistaSemana = () => {
    if (!calendario) return;

    calendario.vistaMes = false;
    fechaInicial = formatearFecha(calendario.range_start);
    fechaFinal = formatearFecha(calendario.range_end);
  };

  const clickVistaMes = () => {
    if (!calendario) return;

    calendario.vistaMes = true;
    fechaInicial = formatearFecha(calendario.range_start);
    fechaFinal = formatearFecha(calendario.range_end);
  };
  
  console.log("Calendar init");
}

export const modelo = new Calendario();


// Espera hasta que el DOM esté completamente cargado
document.addEventListener("calendarioCreado", () => {
  console.log("creado");

});

console.log("Calendar module loaded");