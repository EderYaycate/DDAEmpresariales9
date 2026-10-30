// Task 4 · Props: times (array of strings such as "19:30").
// An empty list shows a message; otherwise one <li> per time.
export default function Showtimes({ times }) {
  // Compare with 0 explicitly: `times.length && ...` would render a stray "0".
  if (times.length === 0) {
    return <p>Sin funciones hoy</p>;
  }

  return (
    <ul className="showtimes">
      {times.map((time) => (
        <li key={time}>{time}</li>
      ))}
    </ul>
  );
}
