/**
 * Adds the character buttons to the specified headers
 * @param {*} path path to the list of characters
 */
function parseProfile(path) {
    return new Promise((resolve, reject) => {
        fetch(path)
            .then(response => {
                return response.text()
            })
            .then(fileContents => {
                createProfile(fileContents)
                resolve()
            })
            .catch(e => {
                const localData = localStorage[path];
                if (localData) {
                    createProfile(localData)
                    resolve()
                } else {
                    reject(new Error("Profile doesn't exist?"))
                }
            })
    })

    function createProfile(fileContents) {
        const profile = JSON.parse(fileContents)

        for (const [category, value] of Object.entries(profile.chars)) {
            let div = document.createElement('div')
            let input = document.createElement('input')
            let h2 = document.createElement('h2')
            let label = document.createElement('label')

            input.type = 'checkbox'
            input.checked = value.checked
            
            label.innerHTML = '&nbsp;' + value.name

            h2.appendChild(input)
            h2.appendChild(label)

            div.appendChild(h2)
            document.querySelector('.buttons').appendChild(div)

            value.buttons.forEach(function(character) {
                createButton(character, div);
            })
        }

        function createButton(content, div) {
            const button = document.createElement('button');
            button.innerHTML = content;
            div.appendChild(button);
        }
    }
}

async function initialiseProfile() {
    await parseProfile('./chars/profiles/default.json')

    // First time only
    let clipBtn = document.getElementById('ctc')
    let clear = document.getElementById('clear')

    clear.addEventListener('click', function() {textArea.value = multiArea.value = ''})
    clipBtn.addEventListener('click', function() {navigator.clipboard.writeText(textArea.value)});

    // Every time profile is switched
    applyListeners();
}

initialiseProfile();
