import { describe, expect, it } from '@jest/globals';
import { gameTemplate, teamTemplate, template } from './html';

describe('html', () => {
  describe.only('template', () => {
    it('should return the html code with correct title and content', () => {
      expect(template('Boltadeildin!', '<a href="./leikir.html">Yfirlit yfir leiki</a>')).toEqual(
        `<!doctype html>
          <html lang="is">
          <head>
          <meta charset="utf-8">
          <title>Boltadeildin!</title>
          <link rel="stylesheet" href="../public/styles.css">
          <script type="module" src="../public/scripts.js"></script>
          </head>
          <body><a href="./leikir.html">Yfirlit yfir leiki</a></body>
          </html>`
      );
    });
  });

  describe.only('gameTemplate', () => {
    it('should return the html code block with correct names and scores', () => {
      const game = {};
      game.date = '2024-01-22T15:20:53.955Z'
      game.home = {
        name : 'Afturelding',
        score : 9
      };
      game.away = {
        name : 'Barcelona',
        score : 0
      };

      expect(gameTemplate(game)).toEqual(
         `<tr>
          <td>2024-01-22T15:20:53.955Z</td>
          <td>Afturelding</td>
          <td>9</td>
          <td>Barcelona</td>
          <td>0</td>
          </tr>`
      );
    });
  });

  describe.only('teamTemplate', () => {
    it('should return the html code block with correct name and score', () => {
      const team = {
        name : 'KR',
        score : 12
      };

      expect(teamTemplate(team)).toEqual(
         `<tr>
         <td>KR</td>
         <td>12</td>
         </tr>`
      );
    });
  });
});
