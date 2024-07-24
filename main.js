import "./style.css";

const eventosSemana = {
    'Lunes 22': [
        { hora: '8:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo1' },
        { hora: '19:30h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo1' },
        { hora: '8:00h', desc: 'Entrada 9999AAA VOLKSWAGEN SCIRO G', tipo: 'tipo2' },
        { hora: '19:30h', desc: 'Salida 9999AAA VOLKSWAGEN SCIRO G', tipo: 'tipo2' },
        { hora: '9:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo3' },
        { hora: '15:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo3' },
        { hora: '17:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo3' },
        { hora: '', desc: 'Inventario taller 2 CUAT', tipo: 'tipo1' },
        { hora: '', desc: 'Reposición material equipo Chapa', tipo: 'tipo2' },
    ],
    'Martes 23': [
        { hora: '8:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo1' },
        { hora: '19:30h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo1' },
        { hora: '15:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo2' },
        { hora: '17:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo3' },
        { hora: '15:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo2' },
        { hora: '17:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo3' },
        { hora: '15:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo2' },
        { hora: '17:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo3' },
        { hora: '15:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo2' },
        { hora: '17:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo3' },
        { hora: '15:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo2' },
        { hora: '17:00h', desc: 'Cambio de ruedas (3h)', tipo: 'tipo3' },
    ],
    'Miercoles 24': [],
    'Jueves 25': [],
    'Viernes 26': [],
    'Sabado 27': [],
    'Domingo 28': [],
};

// Espera hasta que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const calendarioSemana = document.querySelector('calendario-semana');
    calendarioSemana.setEventosSemana(eventosSemana);
});