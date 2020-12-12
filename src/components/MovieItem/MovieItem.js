import React from 'react';

function MovieItem(props) {

  const {movie} = props;

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


  return (
    <li>
      <a href={movie.url}>
        {movie.title}
      </a>
    </li>
  )
}

export default MovieItem;
