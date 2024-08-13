import "./style.css";

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

// Espera hasta que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const calendario = document.querySelector("wc-calendario");
  //calendario.dias = 31; // Por defecto vendrán 7
  calendario.eventos = eventos;
  calendario.addEventListener('nuevo', e => {
    console.log("evento nuevo!", e.detail);
  });

  calendario.addEventListener('click-evento', e => {
    console.log("Click en evento!", e.detail);
  });
  
  const buttonSemana = document.getElementById("btnSemana");
  buttonSemana.addEventListener("click", () => {
    cambiarVistaCalendario(false);
  });
  
  const buttonMes = document.getElementById("btnMes");
  buttonMes.addEventListener("click", () => {
    cambiarVistaCalendario(true);
  });

  const buttonHoy = document.getElementById("btnHoy");
  buttonHoy.addEventListener("click", () => {
    cambiarFechaInicial(new Date());
  });

  const btnFlechaLeft = document.getElementById("btnFlechaLeft");
  btnFlechaLeft.addEventListener("click", () => {
    var fecha = calendario.fechaInicial;
    fecha.setDate(fecha.getDate() - 7);
    calendario.fechaInicial = fecha;
  });

  const btnFlechaRight = document.getElementById("btnFlechaRight");
  btnFlechaRight.addEventListener("click", () => {
    var fecha = calendario.fechaInicial;
    fecha.setDate(fecha.getDate() + 7);
    calendario.fechaInicial = fecha;
  });

  // btnFlechaRight.addEventListener("click", () => {
  //   cambiarFechaInicial(inputFecha.value);
  // });


  const inputFecha = document.getElementById("finicio");
  inputFecha.addEventListener("change", () => {
    cambiarFechaInicial(inputFecha.value);
  });

  const inputDias = document.getElementById("diasMostrar");
  inputDias.addEventListener("change", () => {
    cambiarDiasMostrados(inputDias.value);
  });


});

const cambiarFechaInicial = (fecha) => {
  if (!fecha) return;
  const calendario = document.querySelector("wc-calendario");
  console.log(fecha);
  calendario.fechaInicial = new Date(fecha);
};

const cambiarVistaCalendario = (mes) => {
  const calendario = document.querySelector("wc-calendario");
  calendario.vistaMes = mes;
};

const cambiarDiasMostrados = (dias) => {
  if (!dias) return;
  const calendario = document.querySelector("wc-calendario");
  calendario.dias = parseInt(dias);
};
