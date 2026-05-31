import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const src = "public/assets";
const files = readdirSync(src).filter(f => /\.(jpg|jpeg)$/i.test(f));

for (const file of files) {
  const input  = join(src, file);
  const before = statSync(input).size;

  // 手机屏宽最大 750px，图片宽度够用；quality 72 视觉无损
  await sharp(input)
    .resize({ width: 900, withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(input + ".tmp");

  // 覆盖原文件
  const { rename, unlink } = await import("fs/promises");
  await unlink(input);
  await rename(input + ".tmp", input);

  const after = statSync(input).size;
  const pct   = Math.round((1 - after / before) * 100);
  console.log(`${file}: ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB  (-${pct}%)`);
}
