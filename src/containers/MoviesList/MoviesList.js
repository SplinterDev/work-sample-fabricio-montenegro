import React from 'react';
import MovieItem from '../../components/MovieItem/MovieItem';

function MoviesList(props) {

  const {search, movies} = props;
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
