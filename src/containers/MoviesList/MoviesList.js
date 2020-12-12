import React, { useEffect, useState } from 'react';
import MovieItem from '../../components/MovieItem/MovieItem';

const ENDPOINT = 'https://us-central1-beacon-fe-worksample-api.cloudfunctions.net/app';

function MoviesList() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    const storedMovies = JSON.parse(localStorage.getItem('movies'));

    if (storedMovies) {
      setMovies(storedMovies);
    } else {
      fetch(`${ENDPOINT}/movies`)
        .then(res => res.json())
        .then(fetchedMovies => {

          fetchedMovies.sort((a, b) => (
            (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0
          ));

          localStorage.setItem('movies', JSON.stringify(fetchedMovies));
          setMovies(fetchedMovies);
        })
        .catch(err => console.error(err));
    }

  }, [])

  return (
    <ul>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie}></MovieItem>
      ))}
    </ul>
  )
}

export default MoviesList;
