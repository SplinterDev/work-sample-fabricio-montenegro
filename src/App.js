import { useEffect, useState } from 'react';
import './App.css';
import MoviesList from './containers/MoviesList/MoviesList';

const ENDPOINT = 'https://us-central1-beacon-fe-worksample-api.cloudfunctions.net/app';


function App() {

  const [movies, setMovies] = useState([]);

  useEffect(async () => {

    const movies = localStorage.getItem('movies');

    if (movies) {
      setMovies(movies);
    } else {
      fetch(`${ENDPOINT}/movies`)
        .then(res => res.json())
        .then(res => {
          localStorage.setItem('movies', res);
          setMovies(res);
        })
        .catch(err => console.error(err));
    }

    return () => {
      // cleanup
    }
  }, ['input'])

  return (
    <div className="App">
      <header>
        <h1>Movies Evan Likes!</h1>
        <p>Below is a (not) comprehensive list of movies that Evan really likes.</p>
      </header>
      <MoviesList></MoviesList>
    </div>
  );
}

export default App;
