// TODO:
// Add more fonts

let characters = document.querySelectorAll('button:not(.manageCtrl)');
let textArea = document.getElementById('textArea');
let count = document.getElementById('count')
let clipBtn = document.getElementById('ctc');
let addMulti = document.getElementById('addMulti');
let multiCheck = document.getElementById('multiCheck');
let multiArea = document.getElementById('multiArea');
let rand = document.getElementById('addRand');
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