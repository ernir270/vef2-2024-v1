import { describe, expect, it } from '@jest/globals';
import { readFile } from './file';
import { parseTeamsJson } from './parse';

describe('parse', () => {
  describe.only('parseTeamsJson', () => {
    it('should have a test', async () => {

      const fileContents = await readFile('./data/gameday-xj39.json');
      const jsonData = JSON.parse(fileContents);
      const games = parseTeamsJson(JSON.stringify(jsonData));

      expect(games).toEqual(
        [
          {
            date: '2024-02-13T15:20:53.955Z',
            home: { name: 'Dripplararnir', score: 0 },
            away: { name: 'Óhemjurnar', score: 2 }
          },
          {
            date: '2024-02-13T15:20:53.955Z',
            home: { name: 'Skotföstu kempurnar', score: 0 },
            away: { name: 'Ósigrandi skotfólkið', score: 3 }
          },
          {
            date: '2024-02-13T15:20:53.955Z',
            home: { name: 'Vinningshópurinn', score: 2 },
            away: { name: 'Boltaliðið', score: 3 }
          },
          {
            date: '2024-02-13T15:20:53.955Z',
            home: { name: 'Risaeðlurnar', score: 2 },
            away: { name: 'Markaskorarnir', score: 0 }
          },
          {
            date: '2024-02-13T15:20:53.955Z',
            home: { name: 'Sigurliðið', score: 5 },
            away: { name: 'Framherjarnir', score: 2 }
          },
          {
            date: '2024-02-13T15:20:53.955Z',
            home: { name: 'Hraðaliðið', score: 2 },
            away: { name: 'Fljótu fæturnir', score: 3 }
          }
        ]);
    });
  });
});
