import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import App from "./App.jsx";
import { clearXssFlag, failImages, xssFlag } from "./duel/support.js";

// Step 14 of the lab: the whole billboard, built with the team's components, must treat the
// text of a third party and the message of an AI agent as data, never as HTML.
describe("App · datos de terceros", () => {
  beforeEach(() => clearXssFlag());
  afterEach(() => clearXssFlag());

  test("el mensaje del agente lleva la etiqueta peligrosa y se muestra como texto", () => {
    const { container } = render(<App />);
    const span = container.querySelector(".agent-message span");
    expect(span.textContent).toContain('<img src=x onerror="window.__xss=1">');
    expect(span.textContent).toContain("<b>borrar la cartelera</b>");
    expect(span.children).toHaveLength(0);
  });

  test("la página no contiene elementos creados a partir de esos textos", () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll('img[src="x"]')).toHaveLength(0);
    expect(container.querySelectorAll("b, script")).toHaveLength(0);
  });

  test("al fallar las imágenes no se ejecuta ningún código: window.__xss queda sin definir", () => {
    const { container } = render(<App />);
    failImages(container);
    expect(xssFlag()).toBeUndefined();
  });
});
