const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const folder = path.join(__dirname, "../music/Latin");
const FFMPEG_PATH = "ffmpeg"; // or full path

const files = fs.readdirSync(folder).filter(f => f.toLowerCase().endsWith(".m4a"));

if (!files.length) {
  console.log("No .m4a files found.");
  process.exit(0);
}

files.forEach(file => {
  const input = path.join(folder, file);
  const output = input.replace(/\.m4a$/i, ".mp3");

  const cmd = `"${FFMPEG_PATH}" -y -i "${input}" -c:a libmp3lame -b:a 192k "${output}"`;

  console.log(`\n🎧 Converting ${file}...`);

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Failed: ${file}`);
      console.error(stderr || error.message);
    } else {
      console.log(`✅ Done: ${file}`);
    }
  });
});