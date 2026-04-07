// Estado central de la aplicación
let tarjetas = [];
let idContador = 1;
// Genera un ID único para cada tarjeta
const generarId = () => idContador++;
// Obtiene el valor de un campo de texto y lo limpia
const leerCampo = (selector) => {
 const campo = document.querySelector(selector);
 const valor = campo.value.trim();
 campo.value = "";
 return valor;
};
// Referencia al contenedor de la galería
const galeria = document.querySelector("#galeria");

function crearElementoTarjeta({ id, titulo, descripcion, categoria }) {
 // Crear el contenedor de la tarjeta
 const tarjeta = document.createElement("article");
 tarjeta.classList.add("tarjeta", `categoria-${categoria}`);
 tarjeta.dataset.id = id;
 // Construir el contenido HTML de la tarjeta
 tarjeta.innerHTML = `
 <span class="badge">${categoria}</span>
 <h3>${titulo}</h3>
 <p>${descripcion}</p>
 <button class="btn-eliminar" data-id="${id}">Eliminar</button>
 `;
 return tarjeta;
}

function agregarTarjeta() {
 const titulo = leerCampo("#input-titulo");
 const descripcion = leerCampo("#input-descripcion");
 const categoria = document.querySelector("#select-categoria").value;
 // Validación básica: los campos son obligatorios
 if (!titulo || !descripcion) {
 alert("El título y la descripción son obligatorios.");
 return;
 }
 // Crear objeto tarjeta y agregarlo al estado
 const nuevaTarjeta = { id: generarId(), titulo, descripcion, categoria
};
 tarjetas.push(nuevaTarjeta);
 console.log(tarjetas);
 // Crear el elemento DOM y añadirlo a la galería
 const elemento = crearElementoTarjeta(nuevaTarjeta);
 galeria.appendChild(elemento);

 galeria.appendChild(elemento);
actualizarContador();
}
// Registrar el evento del botón
document.querySelector("#btn-agregar").addEventListener("click",
agregarTarjeta);
// Delegación: un solo listener en la galería para todos los botones
galeria.addEventListener("click", (e) => {
  // Verifica que sea el botón eliminar
  if (!e.target.matches(".btn-eliminar")) return;

  const idEliminar = Number(e.target.dataset.id);

  // Eliminar del array
  tarjetas = tarjetas.filter(t => t.id !== idEliminar);

  // Eliminar del DOM
  const elementoTarjeta = galeria.querySelector(`[data-id="${idEliminar}"]`);
  if (elementoTarjeta) elementoTarjeta.remove();

  console.log(tarjetas); // opcional para verificar

  if (elementoTarjeta) elementoTarjeta.remove();
actualizarContador();
});

const btnsFiltro = document.querySelectorAll(".btn-filtro");

btnsFiltro.forEach(btn => {
  btn.addEventListener("click", () => {

    const categoriaFiltro = btn.dataset.categoria.toLowerCase();

    const tarjetas = document.querySelectorAll(".tarjeta");

    tarjetas.forEach(tarjeta => {
      const clases = tarjeta.className;

      if (categoriaFiltro === "todas") {
        tarjeta.style.display = "block";
      } else if (clases.includes(`categoria-${categoriaFiltro}`)) {
        tarjeta.style.display = "block";
      } else {
        tarjeta.style.display = "none";
      }
    });
actualizarContador();
  }); 
});

function actualizarContador() {
  const tarjetasDOM = galeria.querySelectorAll(".tarjeta");
  const mensaje = galeria.querySelector(".mensaje-vacio");

  if (tarjetasDOM.length === 0) {
    if (!mensaje) {
      const nuevoMensaje = document.createElement("p");
      nuevoMensaje.classList.add("mensaje-vacio");
      nuevoMensaje.textContent = "No hay tarjetas. Crea la primera usando el formulario.";
      galeria.appendChild(nuevoMensaje);
    }
  } 
  else {
    if (mensaje) {
      mensaje.remove();
    }
  }

  let contador = document.querySelector("#contador");

  if (!contador) {
    contador = document.createElement("p");
    contador.id = "contador";
    document.querySelector("#filtros").insertAdjacentElement("afterend", contador);
  }

  const visibles = [...tarjetasDOM].filter(t => t.style.display !== "none").length;
  contador.textContent = `Mostrando ${visibles} tarjeta(s)`;
}

actualizarContador();