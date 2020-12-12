import React, { useState } from 'react';
import MovieDetails from '../MovieDetails/MovieDetails';
import './MovieItem.scss';

function MovieItem(props) {

  const {movie} = props;
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  }

  return (
    <li onClick={handleClick} className={'MovieItem '+(expanded ? 'expanded' : '')}>
      <span>{movie.score * 100}% </span>
      <a href={movie.url} onClick={e => e.stopPropagation()}>
        {movie.title}
      </a>
      <span> ({movie.year})</span>
      {expanded &&
        <MovieDetails
          movieId={movie.id}
          coverUrl={movie['cover-url']}
          title={movie.title}
        />
      }
    </li>
  )
}

export default MovieItem;
