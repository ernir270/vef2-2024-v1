import { readFile } from './file.js';

async function getValidTeams(){
  const validTeams = await readFile('../../data/teams.json');
  return validTeams;
}

const b = 'Fljótu fæturnir';
const validTeams = await getValidTeams();
console.log(validTeams.includes(b));
