// Task 7 · Props: movie (a movie object).
// A labelled region with the title as <h2> and a link to that movie's showtimes.
export default function Hero({ movie }) {
  return (
    <section aria-label="Destacada" className="hero">
      <h2>{movie.title}</h2>
      <a href={`#horarios-${movie.id}`}>Ver horarios</a>
    </section>
  );
}
