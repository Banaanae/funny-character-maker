waitForElm('.buttons > div:last-child > button:last-child').then(() => {
    let characters = document.querySelectorAll('button:not(.manageCtrl)');
    let textArea = document.getElementById('textArea');
    let count = document.getElementById('count')
    let clipBtn = document.getElementById('ctc');
    let addMulti = document.getElementById('addMulti');
    let multiCheck = document.getElementById('multiCheck');
    let multiArea = document.getElementById('multiArea');
    let rand = document.getElementById('addRand');
    let clear = document.getElementById('clear');
    let i = 1;
    let multiMode = false;

    count.addEventListener('change', function() {i = count.value});
    clipBtn.addEventListener('click', function() {navigator.clipboard.writeText(textArea.value)});
    multiCheck.addEventListener('change', function() {multiMode = multiCheck.checked});
    addMulti.addEventListener('click', function() {
        while (i != 0) {
            textArea.value += multiArea.value;
            i--
        }
        i = count.value;
    });
    addRand.addEventListener('click', function() {
        while (i != 0) {
            if (!multiMode) {
                textArea.value += characters[getRandomChar()].innerText;
            } else {
                multiArea.value += characters[getRandomChar()].innerText;
            }
            i--
        };
        i = count.value;
    });
    clear.addEventListener('click', function() {textArea.value = multiArea.value = ''})

    characters.forEach(char => {
        char.addEventListener('click', function() {
            while (i != 0) {
                if (!multiMode) {
                    textArea.value += char.innerText;
                } else {
                    multiArea.value += char.innerText;
                }
                i--
            };
            i = count.value;
        })
    });
})


function waitForElm(selector) { // https://stackoverflow.com/a/61511955
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function getRandomChar() { // TODO: Impove this
    let uprng = document.getElementById('uprng').checked
    let downrng = document.getElementById('downrng').checked
    let overlaprng = document.getElementById('overlaprng').checked
    let joinrng = document.getElementById('joinrng').checked
    let upchars = 52//lineCount('./chars/up.txt')
    let downchars = 40//lineCount('./chars/down.txt')
    let overlapchars = 67//lineCount('./chars/overlap.txt')
    let joinchars = 4//lineCount('./chars/join.txt')
    let char = Math.floor(Math.random() * (upchars + downchars + overlapchars + joinchars + 1))
    console.log(char + ' ' + upchars)
    if (char <= upchars - 1 && uprng) { // TODO: I hate this must fix
        return char
    } else if (char <= upchars + downchars - 1 && char >= upchars && downrng) {
        return char
    } else if (char <= upchars + downchars + overlapchars - 1
        && char >= upchars + downchars && overlaprng) {
        return char
    } else if (char <= upchars + downchars + overlapchars + joinchars - 1
        && char >= upchars + downchars + overlapchars && joinrng) { // Fails if only join selected, too much recursion
        return char
    } else {
        return getRandomChar()
    }
}

function lineCount(file) {
    return fetch(file)
        .then(response => response.text())
        .then(fileContent => {
            const lines = fileContent.split('\n');
            console.log(lines.length)
            return lines.length;
        })
}