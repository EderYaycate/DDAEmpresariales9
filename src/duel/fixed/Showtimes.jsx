export default function Showtimes({ times }) {
  // An empty array is truthy, so `!times` never caught it; and `times.length && ...`
  // renders the number 0. Compare the length explicitly instead.
  if (times.length === 0) {
    return <p>Sin funciones hoy</p>;
  }

  return (
    <div className="showtimes">
      <ul>
        {times.map((time) => (
          <li key={time}>{time}</li>
        ))}
      </ul>
    </div>
  );
}
