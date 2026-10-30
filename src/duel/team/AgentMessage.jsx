// Task 8 · Props: author (string), text (string produced by an AI agent).
// The agent's text is untrusted data: it is rendered as text, never as HTML.
export default function AgentMessage({ author, text }) {
  return (
    <p className="agent-message">
      <strong>{author}:</strong> <span>{text}</span>
    </p>
  );
}
