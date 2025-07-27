waitForElm('.buttons > div:last-child > button:last-child').then(() => {
    // First time only
    let clipBtn = document.getElementById('ctc');
    let clear = document.getElementById('clear');

    clear.addEventListener('click', function() {textArea.value = multiArea.value = ''})
    clipBtn.addEventListener('click', function() {navigator.clipboard.writeText(textArea.value)});


    // Every time profile is switched
    applyListeners()
})

function applyListeners() {
    let characters = document.querySelectorAll('.buttons button');
    let textArea = document.getElementById('textArea');
    let count = document.getElementById('count')
    let addMulti = document.getElementById('addMulti');
    let multiCheck = document.getElementById('multiCheck');
    let multiArea = document.getElementById('multiArea');
    let rand = document.getElementById('addRand');
    let i = 1;
    let multiMode = false;

    count.addEventListener('change', function() {i = count.value});
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
                textArea.value += characters[getRandomChar('cat')].innerText;
            } else {
                multiArea.value += characters[getRandomChar('cat')].innerText;
            }
            i--
        };
        i = count.value;
    });
    

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
}

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

function getRandomChar(ranType) {
    let categories = document.querySelector(".buttons").children
    let totalChars = 0
    for (var i = 0; i < categories.length; i++) {
        totalChars += categories[i].childElementCount - 1 // Minus 1 to remove h2 elem
    }
    let chosenCat;
    let catFound = false
    while (!catFound) {
        chosenCat = Math.floor(Math.random() * categories.length)
        if (categories[chosenCat].children[0].children[0].checked)
            catFound = true
    }
    return Math.floor(Math.random() * categories[chosenCat].childElementCount)
}