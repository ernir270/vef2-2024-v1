/**
 * Generate a HTML page with title and content.
 *
 * @param {string} title title of the page
 * @param {string} content HTML content of the page
 * @returns Full HTML page
 */
export function template(title, content) {
  return `<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <link rel="stylesheet" href="../public/styles.css">
    <script type="module" src="../public/scripts.js"></script>
  </head>
  <body>${content}</body>
</html>`;
}

export function gameTemplate(game){
  return `<tr>
      <td>${game.date ?? ''}</td>
      <td>${game.home.name ?? ''}</td>
      <td>${game.home.score ?? ''}</td>
      <td>${game.away.name ?? ''}</td>
      <td>${game.away.score ?? ''}</td>
    </tr>`;
}


/**
 * Generate a HTML string representing recent games.
 *
 * @param {Array<Games>} games list of courses
 * @returns {string} HTML string representing recent games.
 */
export function recentGamesTemplate(games) {
  const allGames = `
    <div class="games">
      <h2>Nýjustu leikir</h2>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th>Dagsetning</th>
              <th>Lið</th>
              <th>Mörk</th>
              <th>Lið</th>
              <th>Mörk</th>
            </tr>
          </thead>
          <tbody>
            ${games.map(gameTemplate).join('')}
          </tbody>
        </table>
      </div>
      <p><a href="./index.html">Til baka</a></p>
    </div>
  `;

  return template('Nýjustu leikir', allGames);
}


/**
 * Generate a HTML string representing the standings.
 *
 * @param {Array<Games>} games list of courses
 * @returns {string} HTML string representing the standings.

export function standingsTemplate(games) {

  // todo

  return template('Stöðutafla', allGames);
}
*/
