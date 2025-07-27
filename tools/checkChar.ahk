#Include <JSON>

checkGui := Gui(, "Check Character")
checkEdt := checkGui.AddEdit()
checkBtn := checkGui.AddButton(, 'Check')
checkMod := checkGui.AddCheckbox(, 'Force Unicode')

checkBtn.OnEvent('Click', CheckChar)
checkGui.Show()

CheckChar(*) {
    chrsToCheck := checkEdt.Value
    if InStr(chrsToCheck, 'U+')
        chrsToCheck := [StrReplace(chrsToCheck, 'U+', '0x')]
    else if InStr(chrsToCheck, '&#') or (IsDigit(chrsToCheck) and !checkMod.Value)
        chrsToCheck := [StrReplace(StrReplace(chrsToCheck, '&#'), ';')]
    else if IsXDigit(chrsToCheck) and (!IsDigit(chrsToCheck) or checkMod.Value)
        chrsToCheck := ['0x' chrsToCheck]
    else if chrsToCheck != '' {
        chrsToCheck := StrSplit(chrsToCheck)
        for i, c in chrsToCheck
            chrsToCheck[i] := Ord(c)
    } else
        return
    
    for i, chrToCheck in chrsToCheck {
        chrDecToCheck := Format("&#{:d};", chrToCheck)
        msgContents := 'Checking ' Chr(chrToCheck) ' (' i '/' chrsToCheck.Length ') ' chrDecToCheck ' ' Format('U+{:X}', chrToCheck) '`n'
        loop files '../chars/profiles/*.json', 'F' {
            profile := JSON.parse(FileRead(A_LoopFileFullPath))
            msgContents .= profile["name"] ':`n'
            for cat, val in profile["chars"] {
                for , char in val["buttons"] {
                    if (char = chrDecToCheck)
                        msgContents .= '  ' cat '`n'
                }
            }
            if RegExMatch(msgContents, ':\n$')
                msgContents .= '  (not found)`n'
        }
        MsgBox msgContents
    }
}