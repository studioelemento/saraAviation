import fs from 'fs';

const pagePath = 'src/pages/CoursesPage.jsx';
const source = fs.readFileSync(pagePath, 'utf8');

const start = source.indexOf('import course01');
const end = source.indexOf('const AASSCLogoCard');
if (start < 0 || end < 0) {
  throw new Error('Could not find courses block');
}

const block = source.slice(start, end);
fs.writeFileSync('src/data/coursesData.js', `${block.trim()}\n`);

const next = `${source.slice(0, start)}import { coursesData } from '../data/coursesData';\n\n${source.slice(end)}`;
fs.writeFileSync(pagePath, next);
console.log('Extracted coursesData.js and updated CoursesPage.jsx');
