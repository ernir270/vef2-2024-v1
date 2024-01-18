/**
 * Game data.
 * @typedef {object} Game
 * @property {string} date - Date of the game
 * @property {object} home - Home team information
 * @property {string} home.name - Name of the home team
 * @property {number} home.score - Score of the home team
 * @property {object} away - Away team information
 * @property {string} away.name - Name of the away team
 * @property {number} away.score - Score of the away team
 */

/**
 * Parse JSON data representing game data.
 * @param {string} input string with JSON data
 * @returns {Array<Game>} parsed list of games
 */
export function parseTeamsJson(input) {
  let parsed;
  try {
    parsed = JSON.parse(input);
  } catch (e) {
    console.error('error parsing JSON', e);
    return [];
  }

  if (!parsed.games || !Array.isArray(parsed.games)) {
    console.error('expected games to be an array');
    return [];
  }

  const games = [];
  for (const game of parsed.games) {
    if (!game.home || !game.away) {
      console.warn('missing required properties in game data');
      continue;
    }
    // validaetum heitin og skorið
    const nameRegex = /^[A-Za-zÁÐÉÍÓÚÝÞÆÖáðéíóúýþæö ]+$/;
    const scoreRegex = /^[0-9]+$/;

    const isHomeNameValid = nameRegex.test(game.home.name);
    const isAwayNameValid = nameRegex.test(game.away.name);
    const isHomeScoreValid = scoreRegex.test(game.home.score.toString());
    const isAwayScoreValid = scoreRegex.test(game.away.score.toString());

    if (isHomeNameValid && isAwayNameValid && isHomeScoreValid && isAwayScoreValid) {
      games.push({
        date: parsed.date,
        home: {
          name: game.home.name,
          score: game.home.score,
        },
        away: {
          name: game.away.name,
          score: game.away.score,
        },
      });
    }
  }

  return games;
}
