# Tools

Tools for built-in profile creation and editing

### checkChar

Checks if a character is present in any built-in profiles
It determines how to treat the string in order of:
1. As Unicode, if prefixed with U+
2. As decimal, if prefixed with &# (Note: trailing ; is not needed) or comprised only of digits with force unicode off
3. As Unicode, if hexidecimal (without 0x) or decimal with force unicode
4. As the character itself, if all above fail (Note: multiple characters are allowed)

### updateTxtFiles

Updates the text files of characters based off the full profile
