function applyListeners() {
    let characters = document.querySelectorAll('.buttons button');
    let multiArea = document.getElementById('multiArea');
    let rand = document.getElementById('addRand');

    function addRandomChar() {
        let i = count.value
        while (i > 0) {
            if (!multiMode) {
                textArea.value += getRandomChar(document.getElementById('ranType').value)
            } else {
                multiArea.value += getRandomChar(document.getElementById('ranType').value)
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

    if (ranType === 'cat') {
        let chosenCat;
        let catFound = false
        while (!catFound) {
            chosenCat = Math.floor(Math.random() * categories.length)
            if (categories[chosenCat].children[0].children[0].checked)
                catFound = true
        }
        let ranIndex = Math.floor(Math.random() * (categories[chosenCat].childElementCount - 1)) + 1 // Index from cat start
        return categories[chosenCat].children[ranIndex].innerText
    } else {
        let totalChars = 0, indexArr = [], selectedCats = []

        for (let o = 0; o < categories.length; o++) {
            let cat = categories[o]
            if (cat.querySelector('h2 > input').checked) {
                totalChars += cat.querySelectorAll('button').length
                indexArr.push(totalChars)
                selectedCats.push(cat)
            }
        }
        let selectedChar = Math.ceil(Math.random() * totalChars)
        let i = indexArr.length - 1
        while (indexArr[i] >= selectedChar) {
            i = i - 1
            if (i === -1)
                break
        }
        selectedChar = (i !== -1 ? selectedChar - indexArr[i] : selectedChar)
        return selectedCats[i + 1].children[selectedChar].innerText
    }
}