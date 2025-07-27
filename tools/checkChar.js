const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const checkGui = {
    chrsToCheck: '',
    forceUnicode: false,
    pauseBetweenChars: true
};

function promptUser() {
    rl.question('Enter characters to check (e.g., U+XXXX, &#XXXX; or a string): ', (input) => {
        checkGui.chrsToCheck = input;
        checkChar(0);chrsToCheck
    });
}

function checkChar(index) {
    let chrsToCheck = checkGui.chrsToCheck;

    if (chrsToCheck.includes('U+')) {
        chrsToCheck = [chrsToCheck.replace('U+', '0x')];
    } else if (chrsToCheck.includes('&#') || (isDigit(chrsToCheck) && !checkGui.forceUnicode)) {
        chrsToCheck = [chrsToCheck.replace(/&#|;/g, '')];
    } else if (isHexDigit(chrsToCheck) && (!isDigit(chrsToCheck) || checkGui.forceUnicode)) {
        chrsToCheck = ['0x' + chrsToCheck];
    } else if (chrsToCheck !== '') {
        chrsToCheck = chrsToCheck.split('').map(c => c.charCodeAt(0));
    } else {
        return;
    }

    if (index < chrsToCheck.length) {
        let chrToCheck = Number(chrsToCheck[index]);
        const chrDecToCheck = `&#${chrToCheck};`;
        let msgContents = `Checking ${String.fromCharCode(chrToCheck)} (${index + 1}/${chrsToCheck.length}) ${chrDecToCheck} U+${chrToCheck.toString(16).toUpperCase()}\n`;
        chrToCheck = `&#${chrToCheck};`;

        const profilesDir = path.join(__dirname, '../chars/profiles');
        fs.readdir(profilesDir, (err, files) => {
            if (err) throw err;

            files.forEach(file => {
                if (file.endsWith('.json')) {
                    const profile = JSON.parse(fs.readFileSync(path.join(profilesDir, file), 'utf8'));
                    msgContents += `${profile.name}:\n`;

                    for (const [cat, val] of Object.entries(profile.chars)) {
                        for (const char of val.buttons) {
                            if (char === chrDecToCheck) {
                                msgContents += `  ${cat}\n`;
                            }
                        }
                    }

                    if (msgContents.endsWith(':\n')) {
                        msgContents += '  (not found)\n';
                    }
                }
            });

            console.log(msgContents);
            if (checkGui.pauseBetweenChars) {
                rl.question('Press Enter to continue to the next character...', () => {
                    checkChar(index + 1);chrsToCheck
                });
            } else {
                checkChar(index + 1);chrsToCheck
            }
        });
    } else {
        rl.close();chrsToCheck
    }
}

function isDigit(str) {
    return /^\d+$/.test(str);
}

function isHexDigit(str) {
    return /^[0-9A-Fa-f]+$/.test(str);
}

promptUser();
