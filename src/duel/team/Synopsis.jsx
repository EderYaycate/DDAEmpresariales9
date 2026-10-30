// Task 6 · Props: text (string, written by a third party).
// {text} is escaped by React, so markup inside it is shown as plain text,
// never parsed as HTML (compare Django's autoescape).
export default function Synopsis({ text }) {
  return <p className="synopsis">{text}</p>;
}
