import { writeFile } from 'fs/promises';
import { join } from 'path';
import {
  createDirIfNotExists,
  readFile,
  readFilesFromDir
} from './lib/file.js';
import { indexTemplate, recentGamesTemplate, standingsTemplate } from './lib/html.js';
import { parseTeamsJson } from './lib/parse.js';
import { calculateStandings } from './lib/score.js';

const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
  await createDirIfNotExists(OUTPUT_DIR);

  const content = indexTemplate();
  const indexFilename = join(OUTPUT_DIR, 'index.html');
  await writeFile(indexFilename, content);

  const files = await readFilesFromDir(INPUT_DIR);
  let allGames = [];

  for await (const file of files) {
    if (file.indexOf('gameday') < 0) {
      continue;
    }

    try {
      const fileContents = await readFile(file);
      const jsonData = JSON.parse(fileContents);
      if (jsonData && jsonData.games) {
        const games = parseTeamsJson(JSON.stringify(jsonData));
        allGames = allGames.concat(games);
      } else {
        console.error(`error in file: ${file}`);
      }
    }
    catch (e) {
      console.error(e);
    }


    if (allGames.length > 0) {
      try {

        const recentGames = recentGamesTemplate(allGames);
        const recentGamesFilename = join(OUTPUT_DIR, 'stada.html')
        await writeFile(recentGamesFilename, recentGames);

        // smá gpt hjálp hér
        const standingsObject = await calculateStandings(allGames);
        const standingsArray=Object.entries(standingsObject).map(([name, score])=>({name, score }));
        const standings = standingsTemplate(standingsArray);
        const standingsFilename = join(OUTPUT_DIR, 'leikir.html');
        await writeFile(standingsFilename, standings);

      } catch (e) {
      console.error(e);
      }
    }
  }
}
main().catch((error) => {
  console.error('error generating', error);
});
