import '/src/style.css';
// Importa el archivo de estilos para que se apliquen a esta página.

const params = new URLSearchParams(window.location.search); // Obtiene los parámetros de la URL (por ejemplo: detalle.html?id=1)
const id = params.get("id"); // Extrae el valor del parámetro "id" (que representa el ID del personaje)
const detalle = document.getElementById("detalle"); // Selecciona el contenedor donde se mostrarán los detalles del personaje

// Función asincrónica que se encarga de obtener y mostrar los datos del personaje a partir del ID obtenido de la URL.Utiliza la API de Rick and Morty para obtener los detalles del personaje.
async function mostrarDetalle() {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`); // Realiza una solicitud a la API para obtener los detalles del personaje con el ID especificado.
    const personaje = await res.json(); // Convierte la respuesta de la API en un objeto JSON que contiene los detalles del personaje.

    // Actualiza el contenido del contenedor "detalle" con la información del personaje.
    detalle.innerHTML = `
    <div class="detalle-contenedor">
      <h1 class = "detalle-nombre">${personaje.name}</h1>
      <img class= "detalle-imagen" src="${personaje.image}" alt="${personaje.name}" />
      <p><strong>Estado:</strong> ${personaje.status}</p>
      <p><strong>Especie:</strong> ${personaje.species}</p>
      <p><strong>Origen:</strong> ${personaje.origin.name}</p>
      </div>
    `;
  } catch {
    detalle.innerHTML = "<p>Error cargando detalles.</p>"; // Si ocurre un error al obtener los detalles del personaje, muestra un mensaje de error en el contenedor "detalle".
  }
}
// Efecto de scroll en el header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

mostrarDetalle(); // Llama a la función mostrarDetalle para que se ejecute y muestre los detalles del personaje al cargar la página.

