# Evidencias — React revisado por pruebas

Alumno: Eder Yaycate · Sección 4-C24-A · Laboratorio extra de la semana 9

> **Nota de honestidad sobre el uso de IA.** Los pasos 5 y 6 piden escribir los componentes
> «sin consultar a ninguna IA» y anotar los intentos por componente. Los ocho componentes de
> `src/duel/team/` y los arreglos de `src/duel/fixed/` de este repositorio fueron escritos con
> ayuda de un asistente de IA (Claude). Por eso la columna «intentos» de la tabla del paso 6, el
> reparto del trabajo y las capturas del navegador **no se rellenan aquí**: deben reflejar lo que
> cada integrante hizo realmente. La tabla del paso 15 documenta el uso de IA tal como ocurrió;
> ajústala si tu trabajo propio fue distinto.

## Reparto del trabajo (completar)

| Integrante | Tarea | Evidencia (commit / captura) |
|---|---|---|
| _por completar_ | _por completar_ | _por completar_ |

## Paso 1 — Puesta en marcha

`npm install` y `npm run dev` en http://localhost:5173. Con los ocho componentes sin escribir, la
pantalla muestra el error rojo `TODO(team): write Header in src/duel/team/Header.jsx` (el primero
que React intenta dibujar). Node usado: 20 o superior.

## Paso 2 — Los datos (`src/data/movies.js`)

- **Cuántas películas hay:** 8.
- **La que no tiene funciones hoy:** la 5, «Ruta 91» (`showtimes: []`).
- **La de la sinopsis hostil:** la 1, «La Última Función»:

  ```
  Gran estreno <img src=x onerror="window.__xss=1"> <b>no te lo pierdas</b>
  ```

- **La parte que ejecutaría código si se insertara como HTML:** `<img src=x onerror="window.__xss=1">`.
  La imagen `x` no existe, el navegador falla al cargarla y dispara `onerror`, que ejecuta
  `window.__xss=1`. La etiqueta `<b>` es inofensiva: solo pondría el texto en negrita.

## Paso 3 — Lectura de las pruebas de las tareas 1 y 2

| Prueba | Consulta que usa | Qué comprueba |
|---|---|---|
| T1 «es el encabezado de la página» | `getByRole("banner")` | que exista un `<header>` |
| T1 «el nombre del cine es un encabezado de nivel 1» | `getByRole("heading", { level: 1, name })` | un `<h1>` con el nombre |
| T1 «la navegación se llama «Principal»…» | `getByRole("navigation", { name: "Principal" })`, `within(...).getByRole("list")`, `getAllByRole("listitem")`, `getByRole("link", { name })` | una navegación con nombre accesible, una lista con un elemento por opción y cada enlace con su `href` |
| T1 «con otros datos muestra esos datos» | los mismos roles con otros datos | que el componente no tenga los datos de ejemplo escritos a mano |
| T2 «es el pie de la página» | `getByRole("contentinfo")` | que exista un `<footer>` |
| T2 «muestra la dirección» | `getByText(contact.address)` | que el texto de la dirección aparezca |
| T2 «el teléfono es un enlace tel:» | `getByRole("link", { name: phone })` + `toHaveAttribute("href", "tel:…")` | el enlace y su destino |
| T2 «el correo es un enlace mailto:» | `getByRole("link", { name: email })` | ídem con `mailto:` |
| T1 y T2 «no produce avisos de React» | espía de `console.error` | que React no imprima ningún aviso |

**Por qué consultar por rol y nombre accesible es mejor que por una clase de CSS:** el rol y el
nombre accesible describen lo que el usuario (y un lector de pantalla) percibe: «esto es la
navegación principal», «esto es un enlace llamado Cartelera». Una clase de CSS es un detalle de
presentación: se puede renombrar sin romper nada visible, o dejar una clase correcta en una
etiqueta equivocada (un `<div class="header">` que no es un encabezado) y la prueba pasaría. Con
roles, las pruebas sobreviven a los cambios de estilo y, además, comprueban la accesibilidad.

**Para qué sirve el espía que lee `console.error`:** React avisa de ciertos errores de código
(propiedad inválida como `class`, falta de `key`) con `console.error` en desarrollo, pero sigue
dibujando la página: son fallos que «se ven bien». El espía (`watchConsole` en `src/duel/support.js`)
recoge esos avisos y la prueba falla si hay alguno. Por eso la prueba de avisos va primera en cada
archivo: React imprime cada tipo de aviso una sola vez por archivo.

## Paso 4 — Las pruebas antes de escribir nada (`npm run duel`)

```
Test Files  8 failed (8)
     Tests  43 failed (43)
```

Mensaje de una de ellas (T2 Footer): `→ TODO(team): write Footer in src/duel/team/Footer.jsx`.

## Pasos 5 y 6 — Mis ocho componentes (`src/duel/team/`)

`npm run duel` → **8 archivos y 43 pruebas en verde**. `npm test` → 50 pruebas en verde (4 de datos,
43 del duelo y 3 de la aplicación completa, ver el paso 14). `npm run build` compila sin errores.

| Tarea | Componente | Decisión clave | Intentos |
|---|---|---|---|
| 1 | `Header` | `<nav aria-label="Principal">` con `key={link.href}` | _por completar_ |
| 2 | `Footer` | `className` y enlaces `tel:` / `mailto:` | _por completar_ |
| 3 | `MovieCard` | `alt={movie.title}` y valoración como texto `★ 4.5` | _por completar_ |
| 4 | `Showtimes` | `times.length === 0` explícito (nada de `length && …`) | _por completar_ |
| 5 | `MovieList` | `key={movie.id}`, no el índice | _por completar_ |
| 6 | `Synopsis` | `{text}` dentro de un `<p>`, sin `dangerouslySetInnerHTML` | _por completar_ |
| 7 | `Hero` | prop `movie` y enlace `#horarios-<id>` | _por completar_ |
| 8 | `AgentMessage` | `<strong>` + `<span>{text}</span>` dentro de un `<p>` | _por completar_ |

## Paso 8 — El duelo con las respuestas de la IA (`npm run duel:ai`)

```
Test Files  6 failed | 2 passed (8)
     Tests  14 failed | 29 passed (43)
```

Fallan las tareas **2, 3, 4, 5, 6 y 7** (seis tareas, 14 pruebas). Pasan la 1 y la 8.

## Paso 9 — Clasificación de los seis fallos

| Tarea | Qué hizo la IA | Prueba que lo detecta y su mensaje | Tipo |
|---|---|---|---|
| 2 Footer | Escribió `<footer class="footer">` | «no produce avisos de React en la consola (usa className, no class)»: `expected [ Array(1) ] to deeply equal []` con el aviso `Invalid DOM property `class`. Did you mean `className`?` | **Avisa**: React imprime un aviso y sigue dibujando |
| 3 MovieCard | Escribió `<img src={movie.image} />` sin `alt` | «la imagen tiene como texto alternativo el título de la película»: `Unable to find an element with the alt text: La Última Función` | **Silencioso**: ni error ni aviso; la página se ve igual |
| 4 Showtimes | `if (!times)` y `{times.length && (<ul>…)}` | «con lista vacía muestra el mensaje «Sin funciones hoy»» (`Unable to find an element with the text`) y «con lista vacía no imprime un 0 suelto» (`expected '0' to be 'Sin funciones hoy'`) | **Silencioso**: con la lista vacía se imprime un `0` suelto |
| 5 MovieList | `key={index}` | «al invertir el orden, cada película conserva su propio nodo del DOM» y «al quitar la primera película, las demás conservan su nodo del DOM»: `expected <li>… to be <li>… // Object.is equality` | **Silencioso**: React no avisa con `key={index}` |
| 6 Synopsis | `dangerouslySetInnerHTML={{ __html: html }}` | «la sinopsis hostil se muestra como texto literal» (`expected 'Gran estreno  no te lo pierdas' to be 'Gran estreno <img src=x onerror=…'`), «no crea elementos nuevos» (`to have a length of +0 but got 2`) y «no ejecuta código» (`expected 1 to be undefined`) | **Silencioso** y el más grave: el código del tercero se ejecuta sin ningún aviso |
| 7 Hero | Recibe la prop `film` en lugar de `movie` | las cinco pruebas de T7: `TypeError: Cannot read properties of undefined (reading 'title')` | **Ruidoso**: React lanza un error y no dibuja el componente |

Resumen: **1 ruidoso, 1 que avisa y 4 silenciosos.** Los que más cuestan son los silenciosos, porque
solo una prueba bien pensada los atrapa.

**Por qué las tareas 1 y 8 no fallan.** La 1 (`Header`) usa los roles y los nombres que pide la
prueba (`<header>`, `<h1>`, `<nav aria-label="Principal">`, `<ul>` con `<li>`), una `key` estable
(`link.href`, único) y ninguna propiedad inválida. La 8 (`AgentMessage`) pone el texto con `{text}`
dentro de un `<span>`, por lo que React lo escapa y las etiquetas del agente se muestran como texto;
usa `className`, y el autor va en `<strong>` con los dos puntos.

## Paso 10 — La copia a arreglar

`npm run fixed:init` → «Copiadas las respuestas de la IA a src/duel/fixed/».
`npm run duel:fixed` (rojo inicial): `Tests  14 failed | 29 passed (43)`.

## Paso 11 — Los seis arreglos, de uno en uno

| # | Archivo de `fixed/` | Pruebas en rojo después | Causa y arreglo |
|---|---|---|---|
| — | (copia sin tocar) | 14 | — |
| 1 | `Footer.jsx` | 13 | **Qué hacía:** `class="footer"`. **Por qué React lo trata así:** JSX es JavaScript y `class` es una palabra reservada; la propiedad del DOM se llama `className`, y React avisa de `class` como propiedad inválida. **Ahora:** `className="footer"`. |
| 2 | `MovieCard.jsx` | 12 | **Qué hacía:** `<img>` sin texto alternativo. **Por qué importa:** el nombre accesible de la imagen sale de `alt`; sin él, un lector de pantalla no sabe qué es y la prueba por texto alternativo no la encuentra. **Ahora:** `alt={movie.title}`. |
| 3 | `Showtimes.jsx` | 10 | **Qué hacía:** `if (!times)` no atrapa `[]`, porque un arreglo vacío es verdadero; y `times.length && (…)` evalúa a `0`. **Por qué React lo trata así:** React no dibuja `false`, `null` ni `undefined`, pero **sí dibuja el número `0`**. **Ahora:** `if (times.length === 0)` devuelve el mensaje. |
| 4 | `MovieList.jsx` | 8 | **Qué hacía:** `key={index}`. **Por qué React lo trata así:** la `key` es lo que identifica a cada elemento entre dibujados; con el índice, la clave de una posición se queda con lo que haya ahora en esa posición, y React reutiliza el mismo nodo del DOM cambiándole el contenido. **Ahora:** `key={movie.id}`, que acompaña a la película. |
| 5 | `Synopsis.jsx` | 5 | **Qué hacía:** inserta el texto como HTML con `dangerouslySetInnerHTML`; el navegador interpreta `<img onerror=…>` y ejecuta el código. **Ahora:** `{text}`: React crea un nodo de texto y el navegador nunca lo interpreta como HTML. Los saltos de línea los conserva la regla CSS `white-space: pre-line`. |
| 6 | `Hero.jsx` | **0** | **Qué hacía:** el componente esperaba la prop `film`, pero `App` le pasa `movie`; `film` queda `undefined` y `film.title` lanza un `TypeError`. **Ahora:** la prop se llama `movie`, como el resto del proyecto. |

Resultado final: `npm run duel:fixed` → `Test Files  8 passed (8)`, `Tests  43 passed (43)`.
Solo se editó `src/duel/fixed/`; las pruebas y la carpeta `ai/` no se tocaron.

## Paso 12 — Las dos pruebas de la tarea 5 con `rerender`

Las dos pruebas dibujan la lista, guardan los nodos `<li>` de cada película, la vuelven a dibujar
con `rerender` (en orden inverso, y sin la primera película) y comparan con `toBe` que **el nodo del
DOM de cada película sea el mismo objeto que antes**. Comparan, por tanto, la identidad de los nodos
del DOM, no el texto.

- **Por qué `key={index}` no da ningún aviso:** React solo exige que haya una `key`; que identifique
  de verdad a cada elemento es responsabilidad de quien escribe el código, y React no puede saberlo.
  El índice es una clave válida y única, así que no hay nada que avisar.
- **Por qué «se ve bien» en una interfaz sin estado:** con el índice, al invertir la lista React
  conserva los nodos de cada posición y les cambia el título y el póster; como las tarjetas solo
  muestran sus props, el resultado en pantalla es idéntico.
- **Por qué se rompería con campos que el usuario va rellenando:** lo que el usuario escribió en un
  campo vive en el nodo del DOM (o en el estado asociado a esa posición), no en las props. Si la
  lista se reordena, el nodo de la posición 0 se queda con el valor escrito, pero ahora representa
  a otro elemento: el texto escrito saltaría a la fila equivocada.

## Paso 13 — Provocar el fallo a propósito

En `src/duel/team/Synopsis.jsx` se cambió `{text}` por `dangerouslySetInnerHTML={{ __html: text }}`.

- **En el navegador (`npm run dev`, consola):** `Object.keys(window).filter(k => k.endsWith("xss"))`
  muestra `["__xss"]`, la propiedad que ejecutó el `onerror` de la sinopsis de «La Última Función».
  _Captura por tomar._
- **`npm run duel`:** `Tests  3 failed | 40 passed (43)`, las tres de T6:
  1. «la sinopsis hostil se muestra como texto literal, con sus etiquetas a la vista»:
     `expected 'Gran estreno  no te lo pierdas' to be 'Gran estreno <img src=x onerror=…'`
  2. «la sinopsis hostil no crea elementos nuevos en la página (ni img ni b)»:
     `expected <img src="x" …(1)></img><b></b> to have a length of +0 but got 2`
  3. «la sinopsis hostil no ejecuta código: window.__xss queda sin definir»:
     `expected 1 to be undefined`
- Se devolvió el componente a `{text}`: `npm run duel` vuelve a `43 passed`.

## Paso 14 — El mensaje del agente

En `src/App.jsx` el mensaje (`agentReply`) lleva `<img src=x onerror="window.__xss=1">` y
`<b>borrar la cartelera</b>`, y `AgentMessage` lo muestra con `{text}`. En las herramientas del
navegador (pestaña «Elementos»), el `<span>` contiene un solo nodo de texto con las etiquetas
escritas como caracteres, no hay ninguna `<img src="x">` ni `<b>` nuevas, y `window.__xss` sigue
sin definir. _Captura por tomar._

Esto también lo comprueba `src/App.test.jsx` (3 pruebas, en verde con mis componentes): el `<span>`
contiene el texto literal y ningún hijo, la página no contiene `img[src="x"]` ni `<b>`, y tras
fallar las imágenes `window.__xss` queda sin definir. Con los componentes de la IA (`--mode ai`)
la aplicación completa ni se dibuja: `Hero` lanza el `TypeError` del paso 9.

**Por qué el texto de un agente es un dato no confiable:** lo produce un modelo que puede haber
sido manipulado por texto ajeno (un comentario, una página, un documento) o puede equivocarse;
quien lo escribe no es quien controla la aplicación. Tratarlo como HTML sería dejar que un tercero
escriba el código de la página.

**Qué hace React por defecto con `{text}`:** lo convierte en un nodo de texto, de modo que `<`, `>` y
`&` nunca se interpretan como marcado. Para insertar HTML hay que pedirlo con un nombre
deliberadamente incómodo: `dangerouslySetInnerHTML`.

**Parecido con Django (semana 6):** `{{ variable }}` en una plantilla de Django se escapa
automáticamente (autoescape), igual que `{text}` en JSX; y el filtro `|safe` desactiva el escapado,
igual que `dangerouslySetInnerHTML`. En ambos casos la regla es la misma: el valor es dato, no
código, salvo que alguien decida lo contrario de forma explícita y para contenido de confianza.

## Paso 15 — Uso de IA

| Qué se le pidió | Qué respondió | Qué se aceptó o rechazó y por qué |
|---|---|---|
| Escribir los ocho componentes de `src/duel/team/` a partir de la cabecera de cada archivo y de las pruebas | Ocho componentes funcionales con props y sin estado | Aceptados solo cuando `npm run duel` marcó las 43 pruebas en verde; la verificación la hace la prueba, no la confianza en el código |
| Ejecutar `npm run duel:ai` y clasificar los fallos | Seis tareas con fallos: 1 ruidoso, 1 que avisa y 4 silenciosos | Aceptada la clasificación tras comprobar cada mensaje en la salida de las pruebas |
| Arreglar la copia de la IA en `src/duel/fixed/` de uno en uno | Seis arreglos mínimos (`className`, `alt`, `length === 0`, `key={movie.id}`, `{text}`, prop `movie`) | Aceptados al bajar las pruebas en rojo de 14 a 0; no se tocaron `ai/` ni las pruebas |
| Escribir una prueba de la aplicación completa para el paso 14 | `src/App.test.jsx` con tres pruebas | Aceptada: pasa con mis componentes y falla con los de la IA |

## Capturas por tomar

1. Pantalla con el error rojo `TODO(team)` (paso 1).
2. Resumen de `npm run duel` en rojo (paso 4).
3. `npm run duel` en verde y la cartelera en `npm run dev` (paso 6).
4. `npm run duel:ai` completo, con el resumen (paso 8).
5. `npm run duel:fixed` en rojo y en verde (pasos 10 y 11).
6. Consola del navegador con `__xss` y `npm run duel` con las 3 pruebas rojas (paso 13).
7. «Elementos» del navegador mostrando el mensaje del agente como texto (paso 14).
8. Estructura del proyecto en VS Code.

## Conclusiones (borrador)

1. Las pruebas de componentes por rol y nombre accesible comprueban lo que el usuario percibe, y
   son lo que permite decidir si el código de una IA se acepta.
2. Los fallos de la IA fueron en su mayoría silenciosos (`alt` ausente, `0` suelto, `key={index}` y
   `dangerouslySetInnerHTML`): la página se veía bien, y solo una prueba pensada para ese caso los atrapó.
3. Un texto de un tercero o de un agente es un dato no confiable: React lo muestra como texto con
   `{text}`, igual que el autoescape de Django, y insertarlo como HTML permitiría ejecutar su código.
