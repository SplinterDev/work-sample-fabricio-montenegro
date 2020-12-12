import React, { useEffect, useState } from 'react';
import './MovieDetails.scss';

const ENDPOINT = 'https://us-central1-beacon-fe-worksample-api.cloudfunctions.net/app';

function MovieDetails(props) {

  const [review, setReview] = useState('');
  const {movieId, coverUrl, title} = props;

 useEffect(() => {

  const storedReview = localStorage.getItem(`review_${movieId}`);
    if (storedReview) {
      setReview(storedReview);
    } else {
      fetch(`${ENDPOINT}/reviews?movie-id=${movieId}`)
        .then(res => res.json())
        .then(fetchedReview => {
          localStorage.setItem(`review_${movieId}`, fetchedReview.review);
          setReview(fetchedReview.review);
        })
        .catch(err => console.error(err));
    }
  }, [movieId]);

  return (
    <div className="MovieDetails">
      <img src={coverUrl} alt={title} />
      <p>{review}</p>
    </div>
  )
}

export default MovieDetails;
