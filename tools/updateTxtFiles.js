const fs = require('fs');
const path = require('path');

const fullPath = path.join(__dirname, '../chars/profiles/full.json');
const full = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

let allCharList = "";

for (const [cat, characters] of Object.entries(full.chars)) {
    let fileContents = "";
    for (const char of characters.buttons) {
        fileContents += char + '\r\n';
        allCharList += char.replace(/&#/g, '').replace(/;/g, '') + ',';
    }
    fileContents = fileContents.trim();
    
    const categoryFilePath = path.join(__dirname, '../chars/txt', `${cat}.txt`);
    fs.writeFileSync(categoryFilePath, fileContents);
}

allCharList = allCharList.replace(/,$/, ''); // Remove trailing comma
const allCharArr = allCharList.split(',').sort((a, b) => Number(a) - Number(b));

const allCharsHtmlPath = path.join(__dirname, '../chars/txt/AllChars_HTML.txt');
let htmlFileContents = "";
for (const char of allCharArr) {
    htmlFileContents += `&#${char};\r\n`;
}
htmlFileContents = htmlFileContents.trim();
fs.writeFileSync(allCharsHtmlPath, htmlFileContents);

const allCharsUnicodePath = path.join(__dirname, '../chars/txt/AllChars_Unicode.txt');
let unicodeFileContents = "";
for (const char of allCharArr) {
    unicodeFileContents += `U+${parseInt(char).toString(16).toUpperCase()}\r\n`;
}
unicodeFileContents = unicodeFileContents.trim();
fs.writeFileSync(allCharsUnicodePath, unicodeFileContents);
