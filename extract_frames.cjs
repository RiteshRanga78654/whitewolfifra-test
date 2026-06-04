const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, 'public', 'White_Wolf_Infra_building_develo…_202605081242.mp4');
const outputDir = path.join(__dirname, 'public', 'whitewolfsequence');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Extracting frames from:', input);
console.log('Output directory:', outputDir);

try {
  // Extracting at 24fps for a 7s video (~168 frames)
  execSync(`"${ffmpeg}" -i "${input}" -vf "fps=24" "${outputDir}/%05d.png"`);
  console.log('Successfully extracted frames!');
} catch (err) {
  console.error('Error extracting frames:', err.message);
  process.exit(1);
}
