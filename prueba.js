document.getElementById('formulario-aulas').addEventListener('submit', function(event) {
    event.preventDefault();

    // Código existente...

    if (!solapamiento) {
        // Guardar la asignación
        asignaciones.push({
            nombreClase: nombreClase,
            horaInicio: horaInicio,
            horaFin: horaFin,
            aulaDisponible: aulaDisponible
        });

        // Código existente...
    }
});
document.getElementById('formulario-aulas').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombreClase = document.getElementById('nombre-clase').value;
    const horaInicio = document.getElementById('hora-inicio').value;
    const horaFin = document.getElementById('hora-fin').value;
    const aulaDisponible = document.getElementById('aula-disponible').value;

    // Convertir las horas a minutos para facilidad en los cálculos
    const inicioMinutos = convertirHoraAMinutos(horaInicio);
    const finMinutos = convertirHoraAMinutos(horaFin);

    // Comprobar solapamiento con las clases ya asignadas
    const tabla = document.getElementById('tabla-asignaciones').getElementsByTagName('tbody')[0];
    let solapamiento = false;

    for (let fila of tabla.rows) {
        const inicioExistente = convertirHoraAMinutos(fila.cells[1].innerText);
        const finExistente = convertirHoraAMinutos(fila.cells[2].innerText);
        const aulaExistente = fila.cells[3].innerText;

        if (aulaDisponible === aulaExistente && (inicioMinutos < finExistente && finMinutos > inicioExistente)) {
            solapamiento = true;
            alert('Conflicto de horario en el aula ' + aulaDisponible);
            break;
        }
    }

    // Si no hay solapamientos, agregar la clase
    if (!solapamiento) {
        const nuevaFila = tabla.insertRow();
        nuevaFila.insertCell(0).innerText = nombreClase;
        nuevaFila.insertCell(1).innerText = horaInicio;
        nuevaFila.insertCell(2).innerText = horaFin;
        nuevaFila.insertCell(3).innerText = aulaDisponible;

        // Limpiar los campos del formulario
        document.getElementById('formulario-aulas').reset();
    }
});

// Función para convertir horas (HH:MM) a minutos totales
function convertirHoraAMinutos(hora) {
    const [horas, minutos] = hora.split(':').map(Number);
    return horas * 60 + minutos;
}
document.getElementById('formulario-busqueda').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener la hora de búsqueda
    const horaBuscada = document.getElementById('buscar-hora').value;
    const minutosBuscados = convertirHoraAMinutos(horaBuscada);

    // Limpiar resultados anteriores
    const tabla = document.getElementById('tabla-asignaciones').getElementsByTagName('tbody')[0];
    while (tabla.rows.length > 0) {
        tabla.deleteRow(0);
    }

    // Recorrer las asignaciones guardadas para encontrar coincidencias
    asignaciones.forEach(asignacion => {
        const inicioMinutos = convertirHoraAMinutos(asignacion.horaInicio);
        const finMinutos = convertirHoraAMinutos(asignacion.horaFin);

        if (minutosBuscados >= inicioMinutos && minutosBuscados <= finMinutos) {
            const nuevaFila = tabla.insertRow();
            nuevaFila.insertCell(0).innerText = asignacion.nombreClase;
            nuevaFila.insertCell(1).innerText = asignacion.horaInicio;
            nuevaFila.insertCell(2).innerText = asignacion.horaFin;
            nuevaFila.insertCell(3).innerText = asignacion.aulaDisponible;
        }
    });
});

// También necesitarás modificar el código existente para guardar las asignaciones
let asignaciones = [];


