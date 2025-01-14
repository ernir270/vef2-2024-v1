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


/**
 * Generates HTML content for the index.html page
 *
 * @returns index.html page
 */

export function indexTemplate(){
  return `
    <!doctype html>
    <html lang="is">
      <head>
        <meta charset="utf-8">
        <title>Boltadeildin!</title>
        <link rel="stylesheet" href="./public/styles.css">
        <script type="module" src="./public/scripts.js"></script>
      </head>
      <body>
        <h2>Velkomin á heimasíðu Boltadeildarinnar!</h2>
        <div class="link_container">
          <p><a href="./leikir.html">Yfirlit yfir leiki</a></p>
          <p><a href="./stada.html">Stöðutafla</a></p>
        </div>
      </body>
    </html>
  `;
}


/**
 * Generates HTML content to be used in recent games table
 *
 * @param {game} game
 * @returns template of a game to be used in recent games table
 */

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
 * Generates a HTML content to be used in standings table
 *
 * @param team
 * @returns template of team to be used in standings table
 */

export function teamTemplate(team){
  return `<tr>
         <td>${team.name ?? ''}</td>
         <td>${team.score ?? ''}</td>
         </tr>`;
}


/**
 * Generate a HTML string representing recent games.
 *
 * @param {Array<Games>} games list of games
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
 * @param teams list of teams and they´re points
 * @returns {string} HTML string representing the standings.
*/
export function standingsTemplate(teams) {
  const standings = `
    <div class="standings">
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
            ${teams.map(teamTemplate).join('')}
          </tbody>
        </table>
      </div>
      <p><a href="./index.html">Til baka</a></p>
    </div>
  `;

  return template('Stöðutafla', standings);
}
