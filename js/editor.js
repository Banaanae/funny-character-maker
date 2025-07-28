let changeLog = { usingRevision: -1, changes: [] }
let changesAfterSave = false

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
        alert("You have unsaved changes\nDiscard them?") // TODO: UI

    document.getElementById("editor").classList.replace("show", "hide")
    document.getElementById("manage").classList.replace("hide", "show")

    let characters = document.querySelectorAll('.buttons button');

    characters.forEach(char => {
        let newChar = char.cloneNode(true);
        char = char.parentNode.replaceChild(newChar, char)
    });

    applyListeners()
})

function editText() {

}

function removeButton(event) {
    console.log(event.target.parentElement.getAttribute("name"))

    changeLog.changes.push({ "type": "removed", "char": `&#${event.target.innerText.charCodeAt(0)};` })
    event.target.remove()
}