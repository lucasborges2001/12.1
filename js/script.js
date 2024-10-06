const MOVIES_URL = "https://japceibal.github.io/japflix_api/movies-data.json";

// 1 fetch a la API
const fetchItem = async () => {
  try {
    const respuesta = await fetch(MOVIES_URL);
    const data = await respuesta.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error al obtener los datos: ¡ERROR TERRIBLE! Consulte al desarrollador $$$$", error);
  }
};

// 2 filtro
function filtrar(texto, lista) {
  return lista.filter(item => 
    item.title.toLowerCase().includes(texto.toLowerCase()) ||
    item.genres.some(genre => genre.name.toLowerCase().includes(texto.toLowerCase())) ||
    (item.tagline && item.tagline.toLowerCase().includes(texto.toLowerCase())) ||
    (item.overview && item.overview.toLowerCase().includes(texto.toLowerCase()))
  );
}

function mostrarEstrellas(vote_average) {
  const maxStars = 5;
  const estrellas = Math.round((vote_average / 10) * maxStars);
  return '★'.repeat(estrellas) + '☆'.repeat(maxStars - estrellas);
}

// 3 muestro datos
function mostrarPeliculas(peliculas) {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  peliculas.forEach(pelicula => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'movie-container');

      li.innerHTML = `
          <div class="movie-details">
              <h4>${pelicula.title}</h4>
              <p><em>${pelicula.tagline}</em></p>
          </div>
          <div class="movie-rating">
              <span class="star">${mostrarEstrellas(pelicula.vote_average)}</span>
          </div>
      `;

      lista.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnBuscar').addEventListener('click', async () => {
    const textoBusqueda = document.getElementById('inputBuscar').value.trim();

    if (textoBusqueda) {
      const peliculas = await fetchItem();  // fetch a la API
      const peliculasFiltradas = filtrar(textoBusqueda, peliculas);  // filtro
      mostrarPeliculas(peliculasFiltradas);  // muestro datos
    }
  });
});
