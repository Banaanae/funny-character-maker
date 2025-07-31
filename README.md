# funny-character-maker

Use combining diacritic characters to create funny and unique characters

## How to use

- Press any button and the character inside it will be appended to the end of the text box
- Press the random button to select a random character (It will only select a character that has a checked heading)
- Select the checkbox next to "Loop string" this makes characters go into the loop string box, pressing "Add Loop String" will then add all the characters in to loop string to the main textbox
- You can change how many characters are added with the top-most text box (Note: Normal buttons, random and loop string are all affected by this)
- You can access more characters by switching profiles to `Full`, many of these characters don't display correctly (on my Windows 11 laptop, with only default english langauge packs)

## What's in this repo

All the different categories of characters have been sorted into their own files, as well as a master file with all the characters. All these files are sorted in order of as they appear in Unicode, and formatted as HTML Decimal

- [Up Characters](chars/txt/up.txt)
- [Down Characters](chars/txt/down.txt)
- [Overlap Characters](chars/txt/overlap.txt)
- [Join & Misc Characters](chars/txt/join.txt)
- [Spare Characters](chars/txt/spare.txt)
- [All Characters (HTML)](chars/txt/AllChars_HTML.txt)
- [All Characters (Unicode)](chars/txt/AllChars_Unicode.txt)


### Footnotes

Many of these characters have been sorted quite subjectively, so many of these characters have different interactions between speccific characters. I have attempted to sort them by their most common behaviour, but support between devices varies.

More specifically, some characters may behave differently when the preceeding character is a whitespace (or nothing), I sorted based on the behaviour of when a latin letter was preceeding. Additionally many characters won't render correctly, instead falling back to a box with its unicode code. Problematic characters were placed into the "Spare" category (under the full profile) 

## Running locally

Set up a http server to allow for fetching of the char files, below is an example for Node.js

```sh
npm -g http-server
http-server
# Then click the provided link
```

## Creating a profile

Profiles are json-formatted files which list out all the categories and characters, below is an example:
```json
{
    "name":"Example", // Name shown in the profile switcher
    "chars": {
        "category-name": { // Only used internally, but should be similar to heading below
            "name": "Category Name", // Name for the category heading
            "checked": true, // If the checkbox to include in random is ticked by default
            "buttons": ["&#123;", "&tab;", "String"] // Buttons to add in html format
        }
    }
}
```

There are 2 ways I create profiles, using the built-in editor or a full editor using a text editor.

### Built-in Editor

This is best for small edits of an existing profiles, it can:
- Delete buttons (right click)
- Edit button contents (double click)
- Edit default random categories (check / uncheck the boxes)

After making desired changes you can save a copy or overwrite the profile. (Note: Built-in profiles cannot be overwritten)

### Full Editor

This for when you when you have a large amount of characters to add / change, or want to make your own categories.

If you know what category each button should belong to, simply add them all following the conventions in above example (see the [full profile](chars/profiles/full.json) for a real world example).

If not, place all characters in a "To Sort" category, then sort based on desired look, function etc.

## Credits

- [R74n.com](https://c.r74n.com/combining) - Original concept and some characters
- [UnicodePlus](https://unicodeplus.com/combining) - Got the remaining characters from here
