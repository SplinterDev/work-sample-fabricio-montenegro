import './App.css';
import MoviesList from './containers/MoviesList/MoviesList';

function App() {
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
