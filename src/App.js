import { useEffect, useState } from 'react';
import './App.css';
import MoviesList from './containers/MoviesList/MoviesList';

const ENDPOINT = 'https://us-central1-beacon-fe-worksample-api.cloudfunctions.net/app';

function App() {

  /*
  @TODO
  - [x] Display the list of movies on the page. Movies should be listed in alphabetical order.

  - [x] When a user clicks on the title of the movie, they should be redirected to the Rotten Tomatoes page for that movie.

  - [x] Display the year the movie was released next to the title.

  - [x] Display the Rotten Tomatoes rating next to each movie title in the list. This value should be displayed as a percentage.

  - [x] In order to not spam our API, cache the responses in the browsers [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API).  Do not make network requests to the API if there is a cached version of the response available.

  - [x] Allow searching by title. Only filter results if 2 or more characters are entered in the search box. The list below should update when the value of the search box changes.

  Search should

  - be case-insensitive
  - exact match on any substring in `title`

  - [ ] Allow filtering by decade. Decade options should be computed from the data, _not hard-coded_. Selecting a decade should filter the list to show all movies from that decade.

  - [ ] When a movie row is clicked, expand the row to show what Evan says about the movie. Clicking the row again should collapse it.

    **NOTE**: Clicking on the title should still take you to the Rotten Tomatoes page, but **_should not_** expand the row before the user leaves the page.

  - [ ] Display the movie art next to the review. The image files are provided by the API.
  */

  const [titleSearch, setTitleSearch] = useState('');
  const [decadeSearch, setDecadeSearch] = useState('');

  const [movies, setMovies] = useState([]);
  const [decades, setDecades] = useState([]);

  // calculate the unique decades to create filter and sets them to the state
  const calculateDecades = (movies) => {
    const decades = movies.map(movie => Math.floor(movie.year/10));
    const uniqueDecades = [...new Set(decades)].sort();

    setDecades(uniqueDecades);
  }

  useEffect(() => {

    const storedMovies = JSON.parse(localStorage.getItem('movies'));

    if (storedMovies) {
      setMovies(storedMovies);
      calculateDecades(storedMovies);
    } else {
      fetch(`${ENDPOINT}/movies`)
        .then(res => res.json())
        .then(fetchedMovies => {

          fetchedMovies.sort((a, b) => (
            (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0
          ));

          localStorage.setItem('movies', JSON.stringify(fetchedMovies));
          setMovies(fetchedMovies);
          calculateDecades(fetchedMovies);
        })
        .catch(err => console.error(err));
    }

  }, []);

  return (
    <div className="App">
      <header>
        <h1>Movies Evan Likes!</h1>
        <p>Below is a (not) comprehensive list of movies that Evan really likes.</p>
      </header>
      <main>
        <div>
          <label htmlFor="title-search">Title:</label>
          <input
            id="title-search"
            type="text"
            placeholder="Search by title"
            value={titleSearch}
            onChange={(e) => {
              setTitleSearch(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="decade-search">Decade:</label>
          <select
            id="decade-search"
            value={decadeSearch}
            onChange={(e) => {
              setDecadeSearch(e.target.value);
            }}
          >
            <option key={0} value=""></option>
            {
              decades.map(decade => (
                <option key={decade} value={decade}>{decade*10}</option>
              ))
            }
          </select>
        </div>
        <MoviesList movies={movies} decadeSearch={decadeSearch} titleSearch={titleSearch}></MoviesList>
      </main>
    </div>
  );
}

export default App;
