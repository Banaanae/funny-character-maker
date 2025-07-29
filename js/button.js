let multiMode = false;
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
            div.setAttribute("name", category)
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

            let i = 0;
            value.buttons.forEach(function(character) {
                createButton(i, character, div);
                i++
            })
        }

        function createButton(i, content, div) {
            const button = document.createElement('button');
            button.innerHTML = content.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
            button.setAttribute("index", i)
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

    let textArea = document.getElementById('textArea');
    let count = document.getElementById('count')
    let addMulti = document.getElementById('addMulti');
    let multiCheck = document.getElementById('multiCheck');
    let multiArea = document.getElementById('multiArea');
    let i = 1;

    count.addEventListener('change', function() {i = count.value});
    multiCheck.addEventListener('change', function() {multiMode = multiCheck.checked});
    addMulti.addEventListener('click', function() {
        while (i != 0) {
            textArea.value += multiArea.value;
            i--
        }
        i = count.value;
    });

    // Every time profile is switched
    applyListeners();
}

initialiseProfile();
