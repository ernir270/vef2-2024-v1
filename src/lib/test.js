import { promises as fsPromises, readFileSync, readdirSync } from 'fs';
import { extname, join } from 'path';
import { recentGamesTemplate } from './html.js';
import { parseTeamsJson } from './parse.js';

// const INPUT_DIR = './data';
// const OUTPUT_DIR = './dist';


function readJsonFile(filePath) {
  try {
    const rawData = readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
  } catch (e) {
    console.error('Error reading file:', e);
    return null;
  }
}

async function test(directoryPath) {
  const files = readdirSync(directoryPath);
  let allGames = [];

  for (const file of files) {
    const fullPath = join(directoryPath, file);
    if (extname(fullPath) === '.json') {
      const jsonData = readJsonFile(fullPath);
      if (jsonData) {
        const games = parseTeamsJson(JSON.stringify(jsonData));
        allGames = allGames.concat(games);
      }
    }
  }
  if (allGames.length > 0) {
    // console.log(recentGamesTemplate(allGames));
    try {
      await fsPromises.writeFile('../../dist/leikir.html', recentGamesTemplate(allGames));
      // console.log('File written successfully');
    } catch (e) {
      console.error('Failed to write file:', e);
    }
  } else {
    // console.log('No games to display.');
  }
}


test('../../data');


