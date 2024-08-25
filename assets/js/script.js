
const listTareasAgregadas = document.querySelector("#tareas");
const agregarTareasInput = document.querySelector("#input-agregar");
const btnTareasAgregadas = document.querySelector("#button-agregar");
const cantidad = document.querySelector("#cantidad");
const realizadas = document.querySelector("#realizadas");
const idTitle = document.querySelector(".id-title");
const idList = document.querySelector("#id-list"); 

function generarIdUnico() {
    return Math.floor(Math.random() * 1000000); 
}

let tareas = [
    { id: generarIdUnico(), descripcion: "Hacer el nuevo desafío de DesafioLatam ", completada: false },
    { id: generarIdUnico(), descripcion: "Ir al Supermercado", completada: false },
    { id: generarIdUnico(), descripcion: "Hacer ejercicio", completada: false }
];

function actualizarTareas() {
    let html = "";
    let idsHtml = ""; 

    tareas.forEach(tarea => {
        html += `
            <li class="${tarea.completada ? 'completed' : ''}">
                ${tarea.descripcion}
                <button class="completada" onclick="tareaCompletada(${tarea.id})">✔️</button>
                <button class="eliminar" onclick="eliminarTarea(${tarea.id})">❌</button>
            </li>
        `;
        idsHtml += `<li>${tarea.id}</li>`; 
    });

    listTareasAgregadas.innerHTML = html;
    idList.innerHTML = idsHtml; 
    cantidad.textContent = tareas.length;
    realizadas.textContent = tareas.filter(tarea => tarea.completada).length;
}

btnTareasAgregadas.addEventListener("click", () => {
    const nuevaTareaDescripcion = agregarTareasInput.value.trim();

    if (nuevaTareaDescripcion === "") {
        alert("Ingresa una nueva tarea ✏️.");
        return;
    }

    const nuevaTarea = {
        id: generarIdUnico(), 
        descripcion: nuevaTareaDescripcion,
        completada: false
    };

    tareas.push(nuevaTarea);
    agregarTareasInput.value = "";
    actualizarTareas();
});

function tareaCompletada(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        actualizarTareas();
    }
}

function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    actualizarTareas();
}

document.addEventListener("DOMContentLoaded", actualizarTareas);