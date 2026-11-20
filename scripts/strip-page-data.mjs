import fs from 'fs';

function replaceExportBlock(filePath, startMarker, endMarker, importLine) {
  const source = fs.readFileSync(filePath, 'utf8');
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  if (start < 0 || end < 0) {
    throw new Error(`Markers not found in ${filePath}`);
  }
  const next = `${source.slice(0, start)}${importLine}\n\n${source.slice(end)}`;
  fs.writeFileSync(filePath, next);
  console.log('Updated', filePath);
}

replaceExportBlock(
  'src/pages/GalleryPage.jsx',
  'export const fallbackGalleryImages = [',
  'const GalleryPage = () => {',
  "import { fallbackGalleryImages } from '../data/galleryData';"
);

replaceExportBlock(
  'src/pages/TeamPage.jsx',
  'const placeholderImg = "https://i.pinimg.com/736x/85/8d/89/858d89f456e8e303619bbc3811f311eb.jpg";',
  'const TeamPage = () => {',
  "import { fallbackTeamMembers } from '../data/teamData';"
);

replaceExportBlock(
  'src/pages/CareersPage.jsx',
  'export const fallbackJobOpenings = [',
  'const steps = [',
  "import { fallbackJobOpenings } from '../data/jobsData';"
);
