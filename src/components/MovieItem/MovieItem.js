import React, { useState } from 'react';
import MovieDetails from '../MovieDetails/MovieDetails';

function MovieItem(props) {

  const {movie} = props;
  const [expanded, setExpanded] = useState(false);

  /*
    id: Number
    title: String
    year: Number
    score: Number
    director: String
    url: String
    synopsis: String
    rating: String
    runtime-in-minutes: Number
    oscar-nominations: Number
    oscars: Number
    cover-url: String
  */

  const handleClick = () => {
    setExpanded(!expanded);
  }

  return (
    <li onClick={handleClick}>
      <span>{movie.score * 100}% </span>
      <a href={movie.url}>{movie.title}</a>
      <span> ({movie.year})</span>
      { expanded && <MovieDetails movieId={movie.id} /> }
    </li>
  )
}

export default MovieItem;
