#Include <JSON>

full := FileRead('../chars/profiles/full.json')
full := JSON.parse(full)

allCharList := ""

for cat, characters in full["chars"] {
    fileContents := ""
    for , char in characters["buttons"] {
        fileContents .= char '`r`n'
        allCharList .= (StrReplace(StrReplace(char, '&#'), ';') ',')
    }
    fileContents := RTrim(fileContents, '`r`n')
    FileDelete('../chars/txt/' cat '.txt')
    FileAppend(fileContents, '../chars/txt/' cat '.txt')
}

allCharList := RTrim(allCharList, ',')
allCharList := Sort(allCharList, "N D,")
allCharArr := StrSplit(allCharList, ',')

FileDelete('../chars/txt/AllChars_HTML.txt')
fileContents := ""
for , char in allCharArr {
    fileContents .= '&#' char ';`r`n'
}
fileContents := RTrim(fileContents, '`r`n')
FileAppend(fileContents, '../chars/txt/AllChars_HTML.txt')

FileDelete('../chars/txt/AllChars_Unicode.txt')
fileContents := ""
for , char in allCharArr {
    fileContents .= Format('U+{:X}`r`n', char)
}
fileContents := RTrim(fileContents, '`r`n')
FileAppend(fileContents, '../chars/txt/AllChars_Unicode.txt')