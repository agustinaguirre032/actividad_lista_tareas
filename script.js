        // Función para agregar una tarea
        function agregarTarea() {
          const nuevaTareaInput = document.getElementById("nuevaTarea");
          const listaTareas = document.getElementById("listaTareas");
          let nuevaTareaTexto = nuevaTareaInput.value.trim();

          if (nuevaTareaTexto == "") {
              alert("Por favor, ingrese una tarea.");
          }

          if (nuevaTareaTexto !== "") {
              const nuevaTarea = document.createElement("li");
              const tareaTextoDiv = document.createElement("div");
              const botonCompletar = document.createElement("button"); // Botón para marcar como completada
              const botonEliminar = document.createElement("button");

              botonEliminar.textContent = "Eliminar";
              botonEliminar.className = "delete";

              botonCompletar.textContent = "Completa"; // Texto inicial del botón
              botonCompletar.className = "complete"; // Clase para el botón de marcar completada
              let completada = false; // Variable para rastrear si la tarea está completa o no


              botonEliminar.onclick = function() {
                  const modal = document.getElementById("myModal");
                  const confirmarEliminar = document.getElementById("confirmarEliminar");
                  const cancelarEliminar = document.getElementById("cancelarEliminar");

                  // Mostrar el modal
                  modal.style.display = "block";

                  // Cuando se hace clic en "Eliminar" en el modal
                  confirmarEliminar.onclick = function() {
                      listaTareas.removeChild(nuevaTarea);
                      modal.style.display = "none"; // Ocultar el modal
                  }

                  // Cuando se hace clic en "Cancelar" en el modal
                  cancelarEliminar.onclick = function() {
                      modal.style.display = "none"; // Ocultar el modal
                  }

                  // Cuando se hace clic en la "X" (Cerrar) en el modal
                  const closeBtn = document.getElementsByClassName("close")[0];
                  closeBtn.onclick = function() {
                      modal.style.display = "none"; // Ocultar el modal
                  }
              };

              botonCompletar.onclick = function() {
                completada = !completada; // Alternar entre completo e incompleto
                if (completada) {
                    botonCompletar.textContent = "Pendiente";
                    nuevaTarea.classList.add("completed"); // Agregar la clase "completed" para mostrar que está completa
                } else {
                    botonCompletar.textContent = "Completa";
                    nuevaTarea.classList.remove("completed"); // Quitar la clase "completed" para mostrar que está incompleta
                }
            };

              // Dividir el texto en líneas de máximo 50 caracteres
              const lineas = [];
              while (nuevaTareaTexto.length > 70) {
                  lineas.push(nuevaTareaTexto.substring(0, 70));
                  nuevaTareaTexto = nuevaTareaTexto.substring(70);
              }
              lineas.push(nuevaTareaTexto); // Agregar la última línea

              // Crear elementos para cada línea y agregarlos al elemento de tarea
              lineas.forEach(linea => {
                  const lineaDiv = document.createElement("div");
                  lineaDiv.textContent = linea;
                  tareaTextoDiv.appendChild(lineaDiv);
              });

              nuevaTarea.appendChild(tareaTextoDiv);
              nuevaTarea.appendChild(botonCompletar); // Agregar botón de marcar completada
              nuevaTarea.appendChild(botonEliminar); 
              listaTareas.appendChild(nuevaTarea);
              nuevaTareaInput.value = "";
          }
      }

      function marcarCompletada(tarea, action) {
        if (action === "completar") {
            tarea.classList.add("completed");
        } else if (action === "Pendiente") {
            tarea.classList.remove("completed");
        }
    }
    
    // Agregar evento de clic a las tareas para marcarlas como completadas o incompletas
    document.getElementById("listaTareas").addEventListener("click", function(event) {
        const target = event.target;
        if (target.tagName === "BUTTON") {
            const tarea = target.parentElement; // Obtener el elemento <li> padre
            const action = target.getAttribute("data-action"); // Obtener el atributo data-action del botón
    
            if (action === "completar" || action === "Pendiente") {
                marcarCompletada(tarea, action); // Llamar a la función marcarCompletada con el botón específico
            }
        }
    });

      // Agregar evento de clic al botón "Agregar"
      document.getElementById("agregar").addEventListener("click", agregarTarea);




// Función para mostrar tareas completadas
function mostrarCompletadas() {
  const tareas = document.querySelectorAll("li");
  tareas.forEach(tarea => {
    if (tarea.classList.contains("completed")) {
      tarea.style.display = "flex";
    } else {
      tarea.style.display = "none";
    }
  });
}

document.getElementById("mostrarCompletadas").addEventListener("click", mostrarCompletadas);

// Función para mostrar tareas pendientes
function mostrarPendientes() {
  const tareas = document.querySelectorAll("li");
  tareas.forEach(tarea => {
    if (!tarea.classList.contains("completed")) {
      tarea.style.display = "flex";
    } else {
      tarea.style.display = "none";
    }
  });
}

document.getElementById("mostrarPendientes").addEventListener("click", mostrarPendientes);




// Función para mostrar todas las tareas
function mostrarTodas() {
  const tareas = document.querySelectorAll("li");
  tareas.forEach(tarea => {
    tarea.style.display = "flex";
  });
}

document.getElementById("mostrarTodas").addEventListener("click", mostrarTodas);
