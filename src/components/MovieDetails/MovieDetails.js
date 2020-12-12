import React, { useEffect, useState } from 'react';

const ENDPOINT = 'https://us-central1-beacon-fe-worksample-api.cloudfunctions.net/app';

function MovieDetails(props) {

  const [review, setReview] = useState('');
  const {movieId} = props;

 useEffect(() => {

  const storedReview = JSON.parse(localStorage.getItem(`review_${movieId}`));

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

}, []);

  return (
    <div>
      <p>{review}</p>
    </div>
  )
}

export default MovieDetails;
