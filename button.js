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
