import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, 'public');

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  const tempPath = filePath + '.tmp';
  
  try {
    const stat = fs.statSync(filePath);
    const originalSize = (stat.size / 1024).toFixed(2);
    
    let pipeline = sharp(filePath);
    
    // Automatically apply high compression for these types
    if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline.jpeg({ quality: 75, progressive: true, mozjpeg: true }).toFile(tempPath);
    } else if (ext === '.png') {
      await pipeline.png({ quality: 75, compressionLevel: 8, palette: true }).toFile(tempPath);
    } else if (ext === '.webp') {
      await pipeline.webp({ quality: 75, effort: 6 }).toFile(tempPath);
    }

    const newStat = fs.statSync(tempPath);
    const newSize = (newStat.size / 1024).toFixed(2);
    
    // Only replace if the new size is smaller and meaningful (e.g. at least 5% smaller)
    if (newStat.size < stat.size * 0.95) {
      fs.renameSync(tempPath, filePath);
      console.log(`✅ Optimized: ${path.basename(filePath)} | ${originalSize}KB -> ${newSize}KB`);
    } else {
      fs.unlinkSync(tempPath);
      // console.log(`⏩ Skipped: ${path.basename(filePath)} | Already optimized`);
    }
  } catch (error) {
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    console.error(`❌ Error processing ${path.basename(filePath)}:`, error.message);
  }
}

async function traverseDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await traverseDir(fullPath);
    } else {
      await optimizeImage(fullPath);
    }
  }
}

async function main() {
  console.log('🚀 Starting Image Optimization (this might take a while)...');
  await traverseDir(PUBLIC_DIR);
  console.log('✨ Image Optimization Complete!');
}

main();
