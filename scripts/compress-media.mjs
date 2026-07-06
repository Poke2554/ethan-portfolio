import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const mediaRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "media");
const maxWidth = 2000;
const jpegQuality = 82;

async function compressFile(filePath) {
  const before = fs.statSync(filePath).size;
  const output = await sharp(filePath)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: jpegQuality, mozjpeg: true })
    .toBuffer();

  if (output.length < before * 0.95) {
    fs.writeFileSync(filePath, output);
    console.log(
      `✓ ${path.basename(filePath)} : ${Math.round(before / 1024)} Ko → ${Math.round(output.length / 1024)} Ko`,
    );
    return before - output.length;
  }

  console.log(`– ${path.basename(filePath)} : déjà optimisé`);
  return 0;
}

async function walk(dir) {
  let saved = 0;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      saved += await walk(fullPath);
    } else if (/\.(jpe?g)$/i.test(entry.name)) {
      saved += await compressFile(fullPath);
    }
  }

  return saved;
}

if (!fs.existsSync(mediaRoot)) {
  console.log("Aucun dossier public/media trouvé.");
  process.exit(0);
}

console.log("Compression des images…");
const saved = await walk(mediaRoot);
console.log(`Terminé. ${Math.round(saved / 1024 / 1024)} Mo économisés.`);
