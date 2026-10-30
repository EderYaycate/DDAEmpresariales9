// Task 3 · Props: movie = { id, title, image, synopsis, rating, showtimes }.
// An <article> with the poster (alt = title), the title as <h3> and the rating.
export default function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <img src={movie.image} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>★ {movie.rating}</p>
    </article>
  );
}
