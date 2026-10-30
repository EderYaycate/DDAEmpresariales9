// Task 1 · Props: name (string), links (array of { href, label }).
// A <header> with the cinema name as <h1> and a labelled navigation list.
export default function Header({ name, links }) {
  return (
    <header>
      <h1>{name}</h1>
      <nav aria-label="Principal">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
