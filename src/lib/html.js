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
    <link rel="stylesheet" href="./public/styles.css">
    <script type="module" src="./public/scripts.js"></script>
  </head>
  <body>${content}</body>
</html>`;
}

export function gameTemplate(game){

}


/**
 * Generate a HTML string representing a team.
 *
 * @param {string} title title of the department
 * @param {string} description description of the department
 * @param {Array<Games>} games list of courses
 * @returns {string} HTML string representing the department
 */
export function recentGamesTemplate(games) {
  const allGames = `
    <div class="games">
      <h2>Stöðutafla</h2>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th>Lið</th>
              <th>Stig</th>
            </tr>
          </thead>
          <tbody>
            ${games.map(gameTemplate).join('')}
              <!-- hér koma leikirnir -->
          </tbody>
        </table>
      </div>
      <p><a href="./index.html">Til baka</a></p>
    </div>
  `;

  return template('Stöðutafla', allGames);
}
