import { promises as fsPromises } from 'fs';
import {
  createDirIfNotExists,
  readFile,
  readFilesFromDir
} from './lib/file.js';
import { indexTemplate, recentGamesTemplate, standingsTemplate } from './lib/html.js';
import { parseTeamsJson } from './lib/parse.js';
import { calculateStandings } from './lib/score.js';

const INPUT_DIR = '../data';
const OUTPUT_DIR = '../dist';

async function main() {
  await createDirIfNotExists(OUTPUT_DIR);

  const content = indexTemplate();

  try {
    await fsPromises.writeFile(`${OUTPUT_DIR}/index.html`, content);
  } catch (e) {
    console.error('error generating index.html', e);
  }

  const files = await readFilesFromDir(INPUT_DIR);
  let allGames = [];

  for await (const file of files) {
    if (file.indexOf('gameday') < 0) {
      continue;
    }

    try {
      const fileContents = await readFile(`${INPUT_DIR}/${file}`);
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
        await fsPromises.writeFile(`${OUTPUT_DIR}/leikir.html`, recentGamesTemplate(allGames));

        // smá gpt hjálp hér
        const standingsObject = await calculateStandings(allGames);
        const standingsArray=Object.entries(standingsObject).map(([name, score])=>({name, score }));
        await fsPromises.writeFile(`${OUTPUT_DIR}/stada.html`, standingsTemplate(standingsArray));

      } catch (e) {
      console.error(e);
      }
    }
  }
}
main().catch((error) => {
  console.error('error generating', error);
});
