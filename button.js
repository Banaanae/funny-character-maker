/**
 * Adds the character buttons to the specified selector
 * @param {*} path path to the list of characters
 * @param {*} selector css selector for where the buttons go
 */
function addBtns(path, selector) {
    fetch(path)
        .then(response => response.text())
        .then(fileContents => {
            const lines = fileContents.split('\n');
            lines.forEach(function(line) {
                createButton(line.trim());
            });
        })

    function createButton(content) {
        const button = document.createElement('button');
        button.innerHTML = content;
        document.querySelector(selector).appendChild(button);
    }
}

addBtns('./chars/up.txt', '.buttons > div:nth-child(1)')
addBtns('./chars/down.txt', '.buttons > div:nth-child(2)')
addBtns('./chars/overlap.txt', '.buttons > div:nth-child(3)')
addBtns('./chars/join.txt', '.buttons > div:nth-child(4)')

/**
 * Adds the characters that don't display correctly
 * Can only be called via console
 */
function debugAddSpareChars() {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.innerText = "Spare"
    div.appendChild(h2);
    document.querySelector(".buttons").appendChild(div);
    addBtns('./chars/spare.txt', '.buttons > div:nth-child(5)')
}