import React from 'react';
import MovieItem from '../../components/MovieItem/MovieItem';

function MoviesList(props) {

  const {titleSearch, decadeSearch, movies} = props;
  let filteredMovies = movies;

  if (decadeSearch !== '') {

    filteredMovies = filteredMovies.filter(movie => (
      Math.floor(movie.year/10) === parseInt(decadeSearch)
    ));

  }

  if (titleSearch.length >= 2) {

    filteredMovies = filteredMovies.filter(movie => (
      movie.title.match(new RegExp(titleSearch, 'gi'))
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
