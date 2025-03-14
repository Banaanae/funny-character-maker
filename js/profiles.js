function switchProfile(newProfile) {
    document.querySelector('.buttons').innerHTML = ''
    parseProfile(newProfile)
    waitForElm('.buttons > div:last-child > button:last-child').then(applyListeners)
}