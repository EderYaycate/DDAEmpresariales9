// Task 5 · Props: movies (array of movie objects).
// A <ul> with one <li> per movie. The key is the movie id, not the array index:
// the id follows the movie when the list is reordered or filtered.
import MovieCard from "./MovieCard.jsx";

export default function MovieList({ movies }) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}
