# funny-character-maker

Use combining diacritic characters to create funny and unique characters

## How to use

- Press any button and the character inside it will be appended to the end of the text box
- Press the random button to select a random character (It will only select a character that has a checked heading)
- Select the checkbox next to "Loop string" this makes characters go into the loop string box, pressing "Add Loop String" will then add all the characters in to loop string to the main textbox
- You can change how many characters are added with the top-most text box (Note: Normal buttons, random and loop string are all affected by this)
- You can access more characters by typing `debugAddSpareChars()` into console (Note: These characters don't display correctly, so they were omitted)

## What's in this repo

All the different categories of characters have been sorted into their own files, as well as a master file with all the characters. All these files are sorted in order of as they appear in Unicode, and formatted as HTML Decimal

- [Up Characters](chars/up.txt)
- [Down Characters](chars/down.txt)
- [Overlap Characters](chars/overlap.txt)
- [Join & Misc Characters](chars/join.txt)
- [Spare Characters](chars/spare.txt)
- [All Characters (HTML)](chars/AllChars_HTML.txt)
- [All Characters (Unicode)](chars/AllChars_Unicode.txt)

## Running locally

Set up a http server to allow for fetching of the char files, below is an example for Node.js

```sh
npm -g http-server
http-server
# Then click the provided link
```

## Credits

- [R74n.com](https://c.r74n.com/combining) - Original concept and some characters
- [UnicodePlus](https://unicodeplus.com/) - Got the remaining characters from here
