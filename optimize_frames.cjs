const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'whitewolfsequence');

console.log('Optimizing frames: Converting PNG to compressed JPG...');

try {
  // Convert all png to jpg with quality 10 (1-31 scale, 1 is best, 10 is good balance)
  execSync(`"${ffmpeg}" -i "${dir}/%05d.png" -q:v 10 "${dir}/%05d.jpg"`);
  console.log('Conversion successful!');

  // Delete old PNGs to save space
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (file.endsWith('.png')) {
      fs.unlinkSync(path.join(dir, file));
    }
  });
  console.log('Old PNG frames deleted.');
} catch (err) {
  console.error('Error during optimization:', err.message);
}
