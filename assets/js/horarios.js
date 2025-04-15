document.addEventListener("DOMContentLoaded", () => {
    flatpickr("#horaInicio", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        time_24hr: false,
        minuteIncrement: 15,
        disableMobile: true
    });

    flatpickr("#horaFin", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        time_24hr: false,
        minuteIncrement: 15,
        disableMobile: true
    });

    // Referencias a los elementos del HTML
    const nombreEventoInput = document.querySelector("input[placeholder='Nombre del evento']");
    const tipoEventoSelect = document.querySelector("select");
    const diasCheckbox = document.querySelectorAll('.dia-checkbox');
    const horaInicioInput = document.getElementById("horaInicio");
    const horaFinInput = document.getElementById("horaFin");
    const agregarEventoBtn = document.querySelector("btn-agregar-evento");
    const tablaEventosBody = document.getElementById("eventos-tabla-body");

    if (!nombreEventoInput || !tipoEventoSelect || !agregarEventoBtn || !tablaEventosBody) {
        console.error("Uno o más elementos no se encuentran en el DOM.");
        return;
    }

    // Función para actualizar los días seleccionados
    const diasSeleccionadosContainer = document.getElementById('dias-lista');
    const obtenerDiasSeleccionados = () => {
        return Array.from(diasCheckbox)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
    };

    const actualizarDiasSeleccionados = () => {
        const diasSeleccionados = obtenerDiasSeleccionados();
        diasSeleccionadosContainer.textContent = diasSeleccionados.length > 0
            ? diasSeleccionados.join(', ')
            : 'Ninguno';
    };

    // Agregar un evento a la tabla cuando se haga clic en el botón
    agregarEventoBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const nombreEvento = nombreEventoInput.value;
        const tipoEvento = tipoEventoSelect.value;
        const diasSeleccionados = obtenerDiasSeleccionados().join(', ');
        const horaInicio = horaInicioInput.value;
        const horaFin = horaFinInput.value;

        if (!nombreEvento || diasSeleccionados.length === 0 || !horaInicio || !horaFin) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Crear una nueva fila en la tabla de eventos
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${nombreEvento}</td>
            <td>${diasSeleccionados}</td>
            <td>${horaInicio} - ${horaFin}</td>
            <td>
                <button class="delete-btn">Eliminar</button>
            </td>
        `;
        tablaEventosBody.appendChild(newRow);

        // Limpiar los campos de entrada
        nombreEventoInput.value = "";
        tipoEventoSelect.value = "Tipo de evento";
        diasCheckbox.forEach(checkbox => checkbox.checked = false);
        horaInicioInput.value = "";
        horaFinInput.value = "";

        actualizarDiasSeleccionados();
    });

    // Eliminar un evento de la tabla
    tablaEventosBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            e.target.closest("tr").remove();
        }
    });

    // Actualizar días seleccionados cuando cambia un checkbox
    diasCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', actualizarDiasSeleccionados);
    });

    // Inicializar la lista de días seleccionados al cargar la página
    actualizarDiasSeleccionados();
});
