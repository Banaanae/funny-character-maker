/**
 * Adds the character buttons to the specified headers
 * @param {*} path path to the list of characters
 */
function parseProfile(path) {
    fetch(path)
        .then(response => response.text())
        .then(fileContents => {
            createProfile(fileContents)
        })
        .catch(e => {
            createProfile(localStorage[path])
        })

    function createProfile(fileContents) {
        const profile = JSON.parse(fileContents)
        console.log(profile)
        console.log(profile.chars)

        for (const [category, value] of Object.entries(profile.chars)) {
            console.log(category, value);

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
            });
        };

        function createButton(content, div) {
            const button = document.createElement('button');
            button.innerHTML = content;
            div.appendChild(button);
        }
    }
}

parseProfile('./chars/profiles/default.json')
//parseProfile('./chars/profiles/full.json')
