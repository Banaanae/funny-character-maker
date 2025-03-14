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

function createProfileOption(profile) {
    let prflLink = document.createElement('a')
    let prflName;
    fetch(profile)
        .then(response => response.text())
        .then(fileContents => {
            prflName = JSON.parse(fileContents)
            prflLink.innerText = prflName.name
            prflLink.href = '#'
            prflLink.id = profile.replace(/.+\/(\w+)\.json/, '$1')

            prflLink.addEventListener('click', function (elem) {
                console.log(elem)
                document.querySelector('.profileBtn').innerText = prflName.name
                switchProfile('../chars/profiles/' + elem.target.id + '.json')
            })
        
            document.querySelector('.profileList').appendChild(prflLink)
        })
}