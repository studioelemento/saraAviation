const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public', 'assets', 'Sarah Aviation Placements');

async function processImages() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
      const inputPath = path.join(dir, file);
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const outputPath = path.join(dir, `${baseName}.webp`);
      
      try {
        await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
        console.log(`Converted ${file} to WebP`);
      } catch (err) {
        console.error(`Failed to convert ${file}:`, err);
      }
    }
  }
}

processImages();
