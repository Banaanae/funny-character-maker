function applyListeners() {
    let characters = document.querySelectorAll('.buttons button');
    let multiArea = document.getElementById('multiArea');
    let rand = document.getElementById('addRand');

    function addRandomChar() {
        let i = count.value
        while (i > 0) {
            if (!multiMode) {
                textArea.value += getRandomChar('cat')
            } else {
                multiArea.value += getRandomChar('cat')
            }
            i--
        }
    }

    // Clone and replace random button to remove listeners (removeEventListeners doesnt work for some reason)
    let newRand = rand.cloneNode(true);
    rand.parentNode.replaceChild(newRand, rand)
    newRand.addEventListener('click', addRandomChar)

    characters.forEach(char => {
        char.addEventListener('click', function() {
            let i = count.value
            while (i > 0) {
                if (!multiMode) {
                    textArea.value += char.innerText;
                } else {
                    multiArea.value += char.innerText;
                }
                i--
            };
        })
    });
}

function getRandomChar(ranType) {
    let categories = document.querySelector(".buttons").children
    let chosenCat;
    let catFound = false
    while (!catFound) {
        chosenCat = Math.floor(Math.random() * categories.length)
        if (categories[chosenCat].children[0].children[0].checked)
            catFound = true
    }
    let ranIndex = Math.floor(Math.random() * (categories[chosenCat].childElementCount - 1)) + 1 // Index from cat start
    return categories[chosenCat].children[ranIndex].innerText
}