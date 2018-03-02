# Todo
- Parse commands
    - Parse command
        - Action
        - (Pick up / drop items)
            - Show item description when initially picked up.
        - (Use items)

- Moving between rooms
    - parse direction commands
        - east, west, north, south, up, down, left, right

- Set up version control.
    - Install git for windows.
    - Add project, organize.
    - Upload to GitHub as a backup.

- Story
    - Mystery, the player don't know a lot from the start.
    - (Amnesia, Myst)
    - Notes left behind by a person and some clues.
    - Unknown what has happened to the person
        - Go out and explore.
    - Ending:
        - The player finds evidence making them suspect something terrible.
        - Eventually they find the person. But only if they make the right choices...
        - Use a time limit - every action counts and takes time.
            - Time is precious... Only X actions to make. This includes both moves between rooms, as well as actions in each room.
        - If the player made the right choices - and did the right things, they may find the person.
        - If they made the right choices, but took too much time doing so, they find the person when it's too late.
        - If they make the wrong choices, it doesn't matter - the person is already gone.

- Instructions
    - Add simple in-game help which prints out commands and their syntax to the main text area. Examples:
        -  `take [object]`: Pick up an object.
        -  `[direction]`: Move in a given direction.
        - `read [object]`: Read a `book` or a `note`.
        - To see these commands at any time, just type `help`.






# To think about
- Should the dictionary define common actions?
    - These actions would be usable only if items (targets of the action) meet certain requirements.
- or should all items define their own actions, allowing for customization?






# Ideas
- Make decisions in other ways than writing
    - Clicking on buttons or graphics

- Backpack (Inventory)
    - Pick up items to use later
    - List them on the side of the main screen

- The player will meet different characters
    - In short, the relationships with other characters matter.
    - Some just tell a story or ask questions
    - Some give items
    - Some want help with problems
        - The player must chose if they want to help them, and how.
    - How the player responds to characters affects how the continuing gameplay will work out.
        - Some future events might require that the player is friend with a certain character, or has a specific item.

- The player gets some kind of score by doing things?
    - Getting items, helping people

- Save progress using localStorage

- Add autocomplete of available commands.
    - Use tab to quickly autocomplete input.

- Add fun responses to the status message:
    - "You think that's a good idea? Hah!"
    - "Good luck with that!"

- Animate the status message
    - Make it bounce from side to side when a status message is shown.



---



# Done
- Replace `done` command with "Press enter to continue..." where possible.

- Parse commands
    - Get user input when "enter" is pressed
    - clear user input box
