import "./style.css";

const eventosSemana = [
    {
        fecha: "2024-07-29",
        eventos: [
            { hora: '8:00h', vehiculo: "", desc: 'Cambio de ruedas', duracion: "3h", tipo: '' },
            { hora: '19:30h',vehiculo: "", desc: 'Cambio de ruedas', duracion: "3h", tipo: '' },
            { hora: '8:00h', vehiculo: "9999AAA", desc: 'Entrada VOLKSWAGEN SCIRO G', duracion: "", tipo: 'tipo2' },
            { hora: '9:00h', vehiculo: "9999AAA", desc: 'Cambio de ruedas', duracion: "3h", tipo: 'tipo3' },
            { hora: '19:30h',vehiculo: "9999AAA", desc: 'Salida VOLKSWAGEN SCIRO G', duracion: "", tipo: 'tipo2' },
            { hora: '15:00h',vehiculo: "", desc: 'Cambio de ruedas', duracion: "", tipo: 'tipo3' },
            { hora: '17:00h',vehiculo: "", desc: 'Cambio de ruedas', duracion: "", tipo: 'tipo3' },
            { hora: '',      vehiculo: "", desc: 'Inventario taller 2 CUAT', duracion: "", tipo: 'tipo1' },
            { hora: '',      vehiculo: "", desc: 'Reposición material equipo Chapa', duracion: "", tipo: 'tipo2' },
        ]
    },
    {
        fecha: "2024-07-30",
        eventos: [
            { hora: '8:00h', vehiculo: "", desc: 'Cambio de ruedas', duracion: "3h", tipo: 'tipo1' },
            { hora: '19:30h',vehiculo: "",  desc: 'Cambio de ruedas', duracion: "3h", tipo: 'tipo1' },
            { hora: '15:00h',vehiculo: "",  desc: 'Cambio de ruedas', duracion: "3h", tipo: 'tipo2' },
            { hora: '17:00h',vehiculo: "",  desc: 'Cambio de ruedas', duracion: "3h", tipo: 'tipo4' },
            { hora: '15:00h',vehiculo: "",  desc: 'Cambio de ruedas', duracion: "3h", tipo: 'tipo2' },
            { hora: '17:00h',vehiculo: "",  desc: 'Cambio de ruedas', duracion: "3h", tipo: 'tipo3' },
            { hora: '15:00h',vehiculo: "",  desc: 'Cambio de ruedas', duracion: "3h", tipo: 'tipo2' },
            { hora: '17:00h',vehiculo: "",  desc: 'Cambio de ruedas', duracion: "3h", tipo: 'tipo3' },
            { hora: '15:00h',vehiculo: "",  desc: 'Cambio de ruedas', duracion: "3h", tipo: 'tipo2' },
            { hora: '17:00h',vehiculo: "",  desc: 'Cambio de ruedas', duracion: "3h", tipo: 'tipo3' },
            { hora: '15:00h',vehiculo: "",  desc: 'Cambio de ruedas', duracion: "3h", tipo: 'tipo2' },
            { hora: '17:00h',vehiculo: "",  desc: 'Cambio de ruedas', duracion: "3h", tipo: 'tipo3' },
        ]
    },
    {
        fecha: "2024-07-31",
        eventos: [
            { hora: '13:00h', desc: 'Cambio de ruedas', duracion: "", tipo: 'tipo1' }
        ]
    },
    {
        fecha: "2024-08-01",
        eventos: []
    },
    {
        fecha: "2024-08-02",
        eventos: []
    },
    {
        fecha: "2024-08-03",
        eventos: []
    },
    {
        fecha: "2024-08-04",
        eventos: []
    }
];

// Espera hasta que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const calendarioSemana = document.querySelector('calendario-semana');
    calendarioSemana.className = "calendario-semana";
    calendarioSemana.setEventosSemana(eventosSemana);
});