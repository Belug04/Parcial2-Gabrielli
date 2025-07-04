const contenedor = document.getElementById("personajes"); // Contenedor donde se mostrarán los personajes
// Selecciona el elemento con el ID "personajes" del DOM, que es donde se mostrarán los personajes obtenidos de la API.
// Este elemento debe existir en el HTML para que el script funcione correctamente.
// Si no existe, el script no podrá agregar los personajes a la página.
// Si el elemento no existe, se producirá un error al intentar acceder a él.
// Por lo tanto, es importante asegurarse de que el elemento con el ID "personajes" esté presente en el HTML antes de ejecutar este script.
// Este contenedor se utilizará para insertar dinámicamente las tarjetas de los personajes obtenidos de la API de Rick and Morty.

const input = document.getElementById("busqueda"); // Campo de búsqueda para filtrar personajes por nombre
const filtroEstado = document.getElementById("filtroEstado"); // Filtro para seleccionar el estado de los personajes (vivo, muerto, desconocido)
const sugerencias = document.getElementById("sugerencias");

// Función para cargar personajes desde la API de Rick and Morty
// Esta función realiza una solicitud a la API de Rick and Morty para obtener personajes filtrados
// y los muestra en el contenedor especificado. Si no se encuentran resultados o hay un error, muestra un mensaje de error.
// La función acepta dos parámetros opcionales: nombre y estado, que se utilizan para filtrar
// los personajes por nombre y estado (vivo, muerto, desconocido).
// Si no se proporcionan, se obtienen todos los personajes disponibles.
// La función utiliza la API Fetch para realizar la solicitud y maneja la respuesta en formato JSON
async function cargarPersonajes(nombre = "", estado = "") {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character?name=${nombre}&status=${estado}`);
    const data = await res.json();
    contenedor.innerHTML = "";
    data.results.forEach(p => {
      contenedor.innerHTML += `
        <div class="tarjeta">
          <h2>${p.name}</h2>
          <img src="${p.image}" alt="${p.name}" />
          <p>${p.status} - ${p.species}</p>
          <a class= "a-tarjeta" href="/detalle.html?id=${p.id}">Ver detalles</a>
        </div>`;
    });
  } catch {
    contenedor.innerHTML = "<p>No se encontraron resultados o hubo un error.</p>";
  }
}

input.addEventListener("input", async () => {
  const nombre = input.value.trim();
  if (nombre.length < 2) {
    sugerencias.innerHTML = "";
    return;
  }
  // Si el nombre tiene menos de 2 caracteres, no muestra sugerencias
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${nombre}`);
    const data = await res.json();

    sugerencias.innerHTML = ""; // Limpia las anteriores

    data.results.slice(0, 5).forEach(p => {
      const li = document.createElement("li");
      li.textContent = p.name;
      li.addEventListener("click", () => {
        input.value = p.name;
        sugerencias.innerHTML = "";
        cargarPersonajes(p.name, filtroEstado.value); // actualiza la vista con el personaje seleccionado
      });
      sugerencias.appendChild(li);
    });
  } catch {
    sugerencias.innerHTML = ""; // Si no hay resultados
  }
});


input.addEventListener("input", () => cargarPersonajes(input.value, filtroEstado.value)); // Escucha el evento de entrada en el campo de búsqueda y llama a cargarPersonajes con el valor actual del campo y el estado seleccionado
// Cuando el usuario escribe en el campo de búsqueda, se llama a la función cargarPersonajes
// con el valor actual del campo de búsqueda y el estado seleccionado en el filtro.
// Esto permite filtrar los personajes en tiempo real a medida que el usuario escribe.
// La función cargarPersonajes se encarga de realizar la solicitud a la API y actualizar el
// contenedor con los personajes filtrados.
// Esto permite que la lista de personajes se actualice dinámicamente a medida que el usuario escribe
// en el campo de búsqueda, mostrando solo aquellos que coinciden con el texto ingresado y
// el estado seleccionado en el filtro.

filtroEstado.addEventListener("change", () => cargarPersonajes(input.value, filtroEstado.value)); // Escucha el evento de cambio en el filtro de estado y llama a cargarPersonajes con el valor actual del campo de búsqueda y el estado seleccionado
// Cuando el usuario cambia el estado seleccionado en el filtro, se llama a la función cargarPersonajes
// con el valor actual del campo de búsqueda y el estado seleccionado en el filtro.

// Efecto de scroll en el header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
// Cuando el usuario hace scroll en la página, se agrega o quita la clase "scrolled" al header
// dependiendo de la posición del scroll. Esto permite aplicar estilos diferentes al header cuando se hace scroll,
// como cambiar el color de fondo o agregar una sombra, mejorando la visibilidad y la estética de la aplicación.

cargarPersonajes(); // Llama a la función cargarPersonajes sin parámetros para cargar todos los personajes al inicio.