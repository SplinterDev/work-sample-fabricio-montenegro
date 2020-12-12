import React, { useEffect, useState } from 'react';

const ENDPOINT = 'https://us-central1-beacon-fe-worksample-api.cloudfunctions.net/app';

function MoviesList() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    const movies = JSON.parse(localStorage.getItem('movies'));

    if (movies) {
      setMovies(movies);
    } else {
      fetch(`${ENDPOINT}/movies`)
        .then(res => res.json())
        .then(res => {
          localStorage.setItem('movies', JSON.stringify(res));
          setMovies(res);
        })
        .catch(err => console.error(err));
    }

    return () => {
      // cleanup
    }
  }, ['input'])

console.log(movies);

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  )
}

export default MoviesList;
