let changeLog = { usingRevision: -1, changes: [] }
let changesAfterSave = false
document.getElementById("saveEditedProfile").addEventListener("click", applyChanges)

document.getElementById("manage2Editor").addEventListener("click", function() {
    document.getElementById("manage").classList.replace("show", "hide")
    document.getElementById("editor").classList.replace("hide", "show")

    let characters = document.querySelectorAll('.buttons button');

    characters.forEach(char => {
        let newChar = char.cloneNode(true);
        char = char.parentNode.replaceChild(newChar, char)

        newChar.addEventListener('dblclick', editText)
        newChar.addEventListener('contextmenu', removeButton)
    });
})

document.getElementById("editor2Manage").addEventListener("click", function() {
    if (changeLog.changes.length > 0 && changesAfterSave)
        alert("You have unsaved changes!\nWhile they will be usuable, they won't stay next time you reload this page\nSave now?") // TODO: UI

    document.getElementById("editor").classList.replace("show", "hide")
    document.getElementById("manage").classList.replace("hide", "show")

    let characters = document.querySelectorAll('.buttons button');

    characters.forEach(char => {
        let newChar = char.cloneNode(true);
        char = char.parentNode.replaceChild(newChar, char)
    });

    applyListeners()
})

function editText(event) {
    let curText = event.target.innerText
    event.target.innerText = ""

    let input = document.createElement("input")
    input.value = curText
    event.target.appendChild(input)

    input.addEventListener("focusout", saveEditText)
    input.addEventListener("keyup", saveEditText)

    function saveEditText(event2) {
        if (event2.type === "keyup" && event2.key !== "Enter")
            return

        let newText = event2.target.value
        let parent = event2.target.parentElement

        parent.innerHTML = ""
        parent.innerText = newText
        
        changeLog.changes.push({ type: "renamed", cat: parent.parentElement.getAttribute("name"), button: parent.getAttribute("index"), newtext: newText })
        changeLog.usingRevision++
        changesAfterSave = true
    }
}

function removeButton(event) {
    changeLog.changes.push({ type: "removed", cat: event.target.parentElement.getAttribute("name"), button: event.target.getAttribute("index") })
    event.target.remove()

    changeLog.usingRevision++
    changesAfterSave = true
}

function applyChanges() {
    if (changeLog.usingRevision === -1)
        return // No changes were made

    fetch(selectedProfile)
        .then(response => response.text())
        .then(fileContents => {
            selectedProfile = selectedProfile.match('[^/]*\.json')[0]
            applyAndFinalise(JSON.parse(fileContents))
        })
        .catch(e => {
            applyAndFinalise(localStorage[selectedProfile])
        })
    
    function applyAndFinalise(dataStr) {
        console.log(dataStr)
        for (let i = 0; changeLog.usingRevision >= i; i++) {
            let change = changeLog.changes[i]

            if (change.type === "removed") {
                dataStr.chars[change.cat].buttons.splice(change.button, 1)
            } else if (change.type === "renamed") {
                dataStr.chars[change.cat].buttons[change.button] = change.newtext
            }
        }
        localStorage.test = JSON.stringify(dataStr)
        alert("Saved profile to [name]" )
    }
}

function getAvailableName() {
    let i = 1
    return Math.random()
    //if (!localStorage.hasOwnProperty())
    //while
}
