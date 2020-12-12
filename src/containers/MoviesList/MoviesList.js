import React, { useEffect, useState } from 'react';
import MovieItem from '../../components/MovieItem/MovieItem';

const ENDPOINT = 'https://us-central1-beacon-fe-worksample-api.cloudfunctions.net/app';

function MoviesList(props) {

  const [movies, setMovies] = useState([]);
  const {search} = props;

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

  let filteredMovies = movies;

  if (search.length >= 2) {

    filteredMovies = filteredMovies.filter(movie => (
      movie.title.match(new RegExp(search, 'gi'))
    ));

  }

  return (
    <ul>
      {filteredMovies.length
        ? filteredMovies.map((movie) => (
            <MovieItem key={movie.id} movie={movie}></MovieItem>
          ))
        : <p>Sorry, no movies match your search :(</p>
      }
    </ul>
  )
}

export default MoviesList;
