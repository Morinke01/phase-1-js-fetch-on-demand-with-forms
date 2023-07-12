console.log("before fetch");
const baseUrl = 'http://localhost:3000/movies';
const output = document.querySelector("#movies");

fetch(baseUrl)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error retrieving data');
        }
    })
    .then(data => {
        // Process or use the retrieved data
        console.log(data);
        data.forEach(movie => {
            const html = `
      <ul>
        <li>
          <h4>Title: ${movie.title}</h4>
        </li>
        <li>
          <h5>Runtime: ${movie.summary}</h5>
        </li>
      </ul>
      `;
            output.innerHTML += html;
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    const form = document.querySelector('form');
const searchInput = document.querySelector('#searchByID');
const movieDetailsOutput = document.querySelector('#movieDetails');

function displayMovieDetails(movie) {
  const html = `
    <h4>Title: ${movie.title}</h4>
    <p>Summary: ${movie.summary}</p>
  `;
  movieDetailsOutput.innerHTML = html;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const searchValue = searchInput.value.trim();
  const searchUrl = `${baseUrl}/${searchValue}`;

  fetch(searchUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error retrieving movie details');
      }
    })
    .then(data => {
      displayMovieDetails(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  form.reset();
}

form.addEventListener('submit', handleFormSubmit);
