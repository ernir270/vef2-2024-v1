import { readFileSync } from 'fs';
import { parseTeamsJson } from './parse.js';

function readJsonFile(filePath) {
  try {
    const rawData = readFileSync(filePath);
    return JSON.parse(rawData);
  } catch (e) {
    console.error('Error reading file:', e);
    return null;
  }
}

function testParseTeamsJson(filePath) {
  const jsonData = readJsonFile(filePath);
  // console.log(jsonData)
  if (jsonData) {
    const items = parseTeamsJson(JSON.stringify(jsonData));
    console.log(items);
  } else {
    console.log('No data to parse.');
  }
}

testParseTeamsJson('../../data/gameday-3iks.json');
