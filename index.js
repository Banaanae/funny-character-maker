// TODO:
// Add random button
// Make multi char mode affected by loop
// Fix enter in textarea
// Add more fonts
// Make copy and random button 50% of manage div

let characters = document.querySelectorAll('button:not(.manageCtrl)');
let textArea = document.getElementById('textArea');
let count = document.getElementById('count')
let clipBtn = document.getElementById('ctc');
let addMulti = document.getElementById('addMulti');
let multiCheck = document.getElementById('multiCheck');
let multiArea = document.getElementById('multiArea');
let i = 1;

count.addEventListener('change', function() {i = count.value});
clipBtn.addEventListener('click', function() {navigator.clipboard.writeText(textArea.value);})
multiCheck.addEventListener('change', function() {multiMode = multiCheck.checked})
addMulti.addEventListener('click', function() {textArea.value += multiArea.value})

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
    });
});