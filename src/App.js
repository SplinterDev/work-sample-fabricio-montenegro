import { useEffect, useState } from 'react';
import './App.css';
import MoviesList from './components/MoviesList/MoviesList';

const ENDPOINT = 'https://us-central1-beacon-fe-worksample-api.cloudfunctions.net/app';

function App() {

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
        <MoviesList movies={movies} decadeSearch={decadeSearch} titleSearch={titleSearch} />
      </main>
    </div>
  );
}

export default App;
