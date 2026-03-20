const fs = require("fs");
const path = require("path");

const musicRoot = path.join(__dirname, "music");

function isMp3(filename) {
  return filename.toLowerCase().endsWith(".mp3");
}

function niceName(folderName) {
  return folderName
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

const folders = fs.readdirSync(musicRoot, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .sort((a, b) => a.localeCompare(b));

const playlists = folders.map(folder => {
  const folderPath = path.join(musicRoot, folder);

  const tracks = fs.readdirSync(folderPath, { withFileTypes: true })
    .filter(entry => entry.isFile() && isMp3(entry.name))
    .map(entry => `music/${folder}/${entry.name}`)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return {
    name: niceName(folder),
    tracks
  };
});

console.log("const PLAYLISTS = " + JSON.stringify(playlists, null, 2) + ";");

Run:
