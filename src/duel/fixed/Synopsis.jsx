export default function Synopsis({ text }) {
  // {text} is escaped by React: markup in a third party's text stays text.
  // The CSS rule `white-space: pre-line` already keeps the line breaks.
  return <p className="synopsis">{text}</p>;
}
