import './App.css';
import MoviesList from './containers/MoviesList/MoviesList';

function App() {

  /*
  @TODO
  - [x] Display the list of movies on the page. Movies should be listed in alphabetical order.

  - [x] When a user clicks on the title of the movie, they should be redirected to the Rotten Tomatoes page for that movie.

  - [ ] Display the year the movie was released next to the title.

  - [ ] Display the Rotten Tomatoes rating next to each movie title in the list. This value should be displayed as a percentage.

  - [ ] In order to not spam our API, cache the responses in the browsers [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API).  Do not make network requests to the API if there is a cached version of the response available.

  - [ ] Allow searching by title. Only filter results if 2 or more characters are entered in the search box. The list below should update when the value of the search box changes.

  Search should

  - be case-insensitive
  - exact match on any substring in `title`

  - [ ] Allow filtering by decade. Decade options should be computed from the data, _not hard-coded_. Selecting a decade should filter the list to show all movies from that decade.

  - [ ] When a movie row is clicked, expand the row to show what Evan says about the movie. Clicking the row again should collapse it.

    **NOTE**: Clicking on the title should still take you to the Rotten Tomatoes page, but **_should not_** expand the row before the user leaves the page.

  - [ ] Display the movie art next to the review. The image files are provided by the API.
  */









  return (
    <div className="App">
      <header>
        <h1>Movies Evan Likes!</h1>
        <p>Below is a (not) comprehensive list of movies that Evan really likes.</p>
      </header>
      <MoviesList></MoviesList>
    </div>
  );
}

export default App;
