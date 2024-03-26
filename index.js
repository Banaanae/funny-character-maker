waitForElm('.buttons > div:last-child > button:last-child').then((elm) => {
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
                textArea.value += characters[Math.floor(Math.random() * 163)].innerText;
            } else {
                multiArea.value += characters[Math.floor(Math.random() * 163)].innerText;
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


function waitForElm(selector) {
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