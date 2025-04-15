console.log("✅ monitoring.js cargado");

function inicializarCheckboxes() {
    const checkboxes = document.querySelectorAll(".checkbox-colaborador");
    console.log("🟢 Checkboxes encontrados:", checkboxes.length);

    if (checkboxes.length === 0) {
        console.error("🚨 No se encontraron checkboxes en la tabla.");
    }

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                checkboxes.forEach((cb) => {
                    if (cb !== this) cb.checked = false;
                });

                const fila = this.closest("tr");
                if (!fila) {
                    console.error("❌ No se encontró la fila del usuario.");
                    return;
                }

                const usuarioSeleccionado = fila.cells[1].textContent.trim();
                console.log(`✅ Usuario seleccionado: ${usuarioSeleccionado}`);
                localStorage.setItem("usuarioSeleccionado", usuarioSeleccionado);
            }
        });
    });
}    

// Botón para alternar el menú lateral
// Manejo del menú hamburguesa
const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

// Cerrar el menú una vez que se selecciona una vista
sidebar.classList.remove('active');

// Cerrar el menú al hacer clic fuera del mismo
document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// Lógica de búsqueda de empleados
document.getElementById('search-btn').addEventListener('click', () => {
const searchTerm = document.getElementById('employee-search').value.toLowerCase();
const rows = document.querySelectorAll('table tbody tr');

rows.forEach(row => {
  const employeeName = row.cells[1].textContent.toLowerCase();
  if (employeeName.includes(searchTerm)) {
      row.style.display = '';
  } else {
      row.style.display = 'none';
  }
});
});

// Seleccionar elementos del DOM
const modal = document.getElementById("modalAsistencia");
const btnClose = document.getElementById("closeModal");

// Función para abrir el modal y cargar datos dinámicamente
function abrirModalAsistencia(datos) {
// Rellenar el modal con los datos del colaborador
document.getElementById("nombreColaborador").innerText = datos.nombre;
document.getElementById("usuarioColaborador").innerText = datos.usuario;
document.getElementById("turnoColaborador").innerText = datos.turno;
document.getElementById("estatusColaborador").innerText = datos.estatus;
document.getElementById("horaEntrada").innerText = datos.horaEntrada || "--";
document.getElementById("estadoEntrada").innerText = datos.estadoEntrada || "--";
document.getElementById("horaSalida").innerText = datos.horaSalida || "--";
document.getElementById("estadoSalida").innerText = datos.estadoSalida || "--";

// Mostrar el modal
modal.style.display = "block";
}

// Cerrar el modal al hacer clic en el botón "X"
btnClose.onclick = function () {
modal.style.display = "none";
};  

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function (event) {
if (event.target === modal) {
  modal.style.display = "none";
}
};

// Simular clic en las filas de colaboradores
document.querySelectorAll(".colaborador-row").forEach((row) => {
row.addEventListener("click", () => {
  const datos = {
      nombre: "Juan Torres García", // Datos de prueba
      usuario: "JRTG",
      turno: "Mañana (08:00 - 13:00)",
      estatus: "Activo",
      horaEntrada: "08:00",
      estadoEntrada: "A Tiempo",
      horaSalida: "13:00",
      estadoSalida: "A Tiempo",
  };
  abrirModalAsistencia(datos);
});
});

// Cargar historial de asistencia al cargar la página
document.addEventListener('DOMContentLoaded', () => {
const userId = 'SMGM';  // Este ID se obtiene dinámicamente, como mencionas
fetch(`https://script.google.com/macros/s/AKfycbz26keIkxQpR-6bLVWGf-X_tTgqhCwsLXS4JexMjpcPrB7aq9WPiwq5c7Nr-bf46D5J/exec?user=${userId}`)
  .then(response => response.json())
  .catch(error => console.error('Error al cargar historial:', error));
});  

document.addEventListener("DOMContentLoaded", () => {
console.log("✅ monitoring.js cargado y DOM listo");

// Seleccionar todas las casillas de verificación dentro de la tabla
const checkboxes = document.querySelectorAll(".checkbox-colaborador");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
      if (this.checked) {
          // Deseleccionar otros checkboxes
          checkboxes.forEach(cb => {
              if (cb !== this) cb.checked = false;
          });

          // Obtener la fila de la tabla donde está el checkbox
          const fila = this.closest("tr"); 
          if (!fila) {
              console.error("❌ No se encontró la fila del usuario.");
              return;
          }

          // Obtener el código del colaborador (segunda celda)
          const usuarioSeleccionado = fila.cells[1].textContent.trim(); 

          console.log(`✅ Usuario seleccionado: ${usuarioSeleccionado}`);

          // Guardar el usuario en localStorage para pasarlo a historial.html
          console.log("Guardando usuario en localStorage:", usuarioSeleccionado);
          localStorage.setItem("usuarioSeleccionado", usuarioSeleccionado);
          console.log("Usuario almacenado:", localStorage.getItem("usuarioSeleccionado"));

      }
  });
});

// ✅ Asegurar que el botón de "Ir a Historial" use el usuario seleccionado
document.getElementById("btnHistorial").addEventListener("click", function () {
const usuario = localStorage.getItem("usuarioSeleccionado");

if (usuario) {
    window.location.href = `historial.html?usuario=${usuario}`;
} else {
    console.error("⚠️ No hay usuario seleccionado en localStorage.");
}    
});
})

