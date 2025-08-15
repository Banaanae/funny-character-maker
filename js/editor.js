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
    if (changeLog.usingRevision + 1 !== changeLog.changes.length)
        changeLog.changes.splice(changeLog.usingRevision + 1)

    //event.preventDefault()
    let curText = event.target.innerText
    event.target.innerText = ""

    let input = document.createElement("input")
    input.value = curText
    event.target.appendChild(input)

    input.addEventListener("focusout", saveEditText.bind(null, curText))
    input.addEventListener("keyup", saveEditText.bind(null, curText))

    function saveEditText(curText, event2) {
        if (event2.type === "keyup" && event2.key !== "Enter")
            return

        let newText = event2.target.value
        let parent = event2.target.parentElement

        parent.innerHTML = ""
        parent.innerText = newText
        
        changeLog.changes.push({ type: "renamed", cat: parent.parentElement.getAttribute("name"), button: parent.getAttribute("index"), oldtext: curText, newtext: newText })
        changeLog.usingRevision++
        changesAfterSave = true
    }
}

function removeButton(event) {
    if (changeLog.usingRevision + 1 !== changeLog.changes.length && !event.hasOwnProperty("fake"))
        changeLog.changes.splice(changeLog.usingRevision + 1)

    if (!event.hasOwnProperty("fake")) {
        event.preventDefault()
        changeLog.changes.push({ type: "removed", cat: event.target.parentElement.getAttribute("name"), button: event.target.getAttribute("index"), text: event.target.innerText })
        changeLog.usingRevision++
    }

    event.target.remove()
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
        for (let i = 0; changeLog.usingRevision >= i; i++) {
            let change = changeLog.changes[i]

            if (change.type === "removed") {
                dataStr.chars[change.cat].buttons.splice(change.button, 1)
            } else if (change.type === "renamed") {
                dataStr.chars[change.cat].buttons[change.button] = change.newtext
            }
        }

        let prflNewName = document.getElementById('newName')
        let i = 1, savename = ''
        dataStr.name = prflNewName.value
        if (localStorage.hasOwnProperty(prflNewName.value)) {
            while (localStorage.hasOwnProperty(prflNewName.value + i))
                i = i + 1
            savename = prflNewName.value + i
        } else {
            savename = prflNewName.value
        }
        localStorage[savename] = JSON.stringify(dataStr)
        createProfileOption(savename)
        changesAfterSave = false
        alert("Successfully saved profile")
    }
}

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'z') {
        event.preventDefault()
        undo()
    } else if (event.ctrlKey && event.key === 'y') {
        event.preventDefault()
        redo()
    }
})

function undo() {
    if (changeLog.usingRevision === -1)
        return
    
    let toUndo = changeLog.changes[changeLog.usingRevision], button
    if (toUndo.type === "removed") {
        button = document.createElement("button")
        button.innerText = toUndo.text
        button.setAttribute("index", toUndo.button)
        if (toUndo.button > document.querySelector(`div[name="${toUndo.cat}"] > button:last-child`).getAttribute("index")) {
            document.querySelector(`div[name="${toUndo.cat}"]`).appendChild(button)
        } else {
            let i = 1
            try {
                while (toUndo.button < Number(document.querySelector(`div[name="${toUndo.cat}"] > button:nth-last-child(${i})`).getAttribute("index"))) {
                    i = i + 1
                }
            } catch {}
            document.querySelector(`div[name="${toUndo.cat}"]`).insertBefore(button, document.querySelector(`div[name="${toUndo.cat}"] > button:nth-last-child(${--i})`))
        }
    } else if (toUndo.type === "renamed") {
        button = document.querySelector(`div[name="${toUndo.cat}"] > button[index="${toUndo.button}"]`)
        button.innerText = toUndo.oldtext
    }
    button.addEventListener('dblclick', editText)
    button.addEventListener('contextmenu', removeButton)
    changeLog.usingRevision--
}

function redo() {
    if (changeLog.usingRevision + 1 === changeLog.changes.length)
        return
    
    changeLog.usingRevision++
    let toRedo = changeLog.changes[changeLog.usingRevision]

    let event = {}
    event.parent = document.querySelector(`div[name="${toRedo.cat}"]`)
    event.target = event.parent.querySelector(`button[index="${toRedo.button}"]`)
    event.fake = true

    if (toRedo.type === "removed")
        removeButton(event)
    else if (toRedo.type === "renamed")
        document.querySelector(`div[name="${toRedo.cat}"] > button[index="${toRedo.button}"]`).innerText = toRedo.newtext
}

function getAvailableName() {
    let i = 1
    return Math.random()
    //if (!localStorage.hasOwnProperty())
    //while
}
