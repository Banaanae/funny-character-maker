function switchProfile(newProfile) {
    document.querySelector('.buttons').innerHTML = ''
    parseProfile(newProfile)
    waitForElm('.buttons > div:last-child > button:last-child').then(applyListeners)
}

// Populating profile dropdown

// Add built in
createProfileOption('../chars/profiles/default.json')
createProfileOption('../chars/profiles/full.json')
createProfileOption('../chars/profiles/unicode.json')

// Add custom profiles from local storage
for (const [profile] of Object.entries(localStorage)) {
    createProfileOption(profile)
}

function createProfileOption(profile) {
    fetch(profile)
        .then(response => response.text())
        .then(fileContents => {
            createOption(fileContents)
        })
        .catch(() => { // else local storage
            createOption(localStorage[profile], profile)
        })

    function createOption(fileContents, localName = '') {
        let prflLink = document.createElement('a')

        prflName = JSON.parse(fileContents)
        prflLink.innerText = prflName.name
        prflLink.href = '#'
        if (localName === '') {
            prflLink.id = profile.replace(/.+\/(\w+)\.json/, '$1')
        } else {
            prflLink.id = localName
        }

        // TODO: Not hard coded
        if (document.querySelector('.profileList').childElementCount < 3) {
            prflLink.addEventListener('click', function (elem) {
                console.log(elem)
                document.querySelector('.profileBtn').innerText = elem.target.innerText
                switchProfile('../chars/profiles/' + elem.target.id + '.json')
            })
        } else {
            prflLink.addEventListener('click', function (elem) {
                document.querySelector('.profileBtn').innerText = elem.target.innerText
                switchProfile(elem.target.id)
            })
        }
    
        document.querySelector('.profileList').appendChild(prflLink)
    }
}

let importPrfl = document.getElementById('import')

importPrfl.addEventListener('change', function() {
    let files = importPrfl.files

    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            let file = files[i];
            reader.onload = function(e) {
                let content = e.target.result
                let name = file.name.replace(/(.+)\.json/, '$1')
                let i = 1
                while (localStorage.name) {
                    name = file.name.replace(/(.+)\.json/, '$1') + i
                    i++
                }
                localStorage.setItem(name, content)
                createProfileOption(name)
            }
            reader.readAsText(file)
        }
    }
})
