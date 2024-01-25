/**
 * Testing the score.js function
 */

import { describe, expect, it } from '@jest/globals';
import { calculateStandings } from './score.js';

describe('score', () => {
  describe.only('calculateStandings', () => {
    it('calculates the points for each team correctly, including draws', async () => {
      const games = [
        { home: { name: 'Team A', score: 3 }, away: { name: 'Team B', score: 1 } },
        { home: { name: 'Team A', score: 2 }, away: { name: 'Team C', score: 2 } },
        { home: { name: 'Team B', score: 0 }, away: { name: 'Team C', score: 3 } },];
      expect(await calculateStandings(games)).toEqual({
        'Team A' : 4,
        'Team B' : 0,
        'Team C' : 4
      });
    });

    it('returns an empty dictionary if games array is empty', async () => {
      const games = [];
      expect(await calculateStandings(games)).toEqual({});
    });
  });
});
