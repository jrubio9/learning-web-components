export default function attachCssToShadowDom(nombreArchivo) {
    if (!nombreArchivo) throw new Error('Attach css debe tener un parámetro con el nombre de archivo');
    if (!nombreArchivo.endsWith('.css')) {
        nombreArchivo += '.css';
    }

    // Apply external styles to the shadow dom
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", nombreArchivo);

    return linkElem;
}

export function attachLinkToShadowDom(href, rel) {

const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", rel);
    linkElem.setAttribute("href", href);

    return linkElem;
}



//////////////////////////// TEST ONLY ////////////////////////////////

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRandomHora() {
    const horas = getRandomInt(0, 23).toString().padStart(2, '0');
    const minutos = getRandomInt(0, 59).toString().padStart(2, '0');
    return `${horas}:${minutos}h`;
  }
  
  function getRandomVehiculo() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    const matricula = Array(4).fill(0).map(() => numeros[getRandomInt(0, 9)]).join('') +
                      letras[getRandomInt(0, 25)] + letras[getRandomInt(0, 25)] +
                      letras[getRandomInt(0, 25)] + letras[getRandomInt(0, 25)];
    return matricula;
  }
  
  function getRandomDescripcion() {
    const descripciones = [
      "Cambio de ruedas",
      "Revisión general",
      "Cambio de aceite",
      "Reparación de motor",
      "Revisión de frenos"
    ];
    return descripciones[getRandomInt(0, descripciones.length - 1)];
  }
  
  function getRandomDuracion() {
    const duraciones = ["1h", "2h", "3h", "4h"];
    return Math.random() > 0.5 ? duraciones[getRandomInt(0, duraciones.length - 1)] : '';
  }
  
  function getRandomTipo() {
    const tipos = ["tipo1", "tipo2", "tipo3"];
    return Math.random() > 0.5 ? tipos[getRandomInt(0, tipos.length - 1)] : '';
  }

  export function generarEventoAleatorio(fecha) {
    return {
      fecha: fecha,
      hora: getRandomHora(),
      vehiculo: getRandomVehiculo(),
      descripcion: getRandomDescripcion(),
      duracion: getRandomDuracion(),
      tipo: getRandomTipo()
    };
  }
  