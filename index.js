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

function getRandomChar() {
    let uprng = document.getElementById('uprng').checked
    let downrng = document.getElementById('downrng').checked
    let overlaprng = document.getElementById('overlaprng').checked
    let joinrng = document.getElementById('joinrng').checked
    let upchars = document.querySelector(".buttons > div:nth-child(1)").childElementCount - 1 // Minus 1 to remove h2 elem
    let downchars = document.querySelector(".buttons > div:nth-child(2)").childElementCount - 1
    let overlapchars = document.querySelector(".buttons > div:nth-child(3)").childElementCount - 1
    let joinchars = document.querySelector(".buttons > div:nth-child(4)").childElementCount - 1
    let char = Math.floor(Math.random() * (upchars + downchars + overlapchars + joinchars + 1))
    if (char < upchars && uprng) {
        return char
    } else if (char < upchars + downchars && char >= upchars && downrng) {
        return char
    } else if (char < upchars + downchars + overlapchars
        && char >= upchars + downchars && overlaprng) {
        return char
    } else if (char < upchars + downchars + overlapchars + joinchars
        && char >= upchars + downchars + overlapchars && joinrng) {
        return char
    } else {
        return getRandomChar()
    }      
}