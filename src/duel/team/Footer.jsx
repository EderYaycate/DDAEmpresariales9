// Task 2 · Props: contact = { address, phone, email }.
// A <footer> with the address, a tel: link and a mailto: link.
// JSX uses className (not class) for CSS classes.
export default function Footer({ contact }) {
  return (
    <footer className="footer">
      <p>{contact.address}</p>
      <p>
        <a href={`tel:${contact.phone}`}>{contact.phone}</a>
      </p>
      <p>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
    </footer>
  );
}
