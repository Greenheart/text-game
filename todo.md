# Todo
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

- Tasks
    - Add UI component to show tasks
    - A room shows a thought bubble (representing the player's own thoughts) "This chest is locked. I wonder if there's a key somewhere..."
    - This could give the player clues to help them progress.


- Bugs
    - Make the player enter his name before giving instructions or else the UI will be messy.

    - Fix positioning for the input field.
        - This is caused by the positioning of the input field + status message. It needs to get a better positioning.
        - When the player has typed 'help' and then tries to type a command like 'continue' for example, the help 'window' will not disappear and there will be multiple layers of text on top of each other.
        - Use different positioning on start screen.


# In progress




# To think about
- Should the dictionary define common actions?
    - These actions would be usable only if items (targets of the action) meet certain requirements.
- or should all items define their own actions, allowing for customization?





# Ideas
- Gameplay idea:
    - "Eat/do something that doesn't make sense" => get a unexpected secret/ progression in the game/story.
    - Ex a door opens and a person comes out "Wait! You can't eat that" - instead of an error message.

- Make decisions in other ways than writing
    - Clicking on buttons or graphics
    - Select from predefined responses when conversing with NPCs.

- The player will meet different characters
    - In short, the relationships with other characters matter.
    - Some just tell a story or ask questions
    - Some give items
    - Some want help with problems
        - The player must chose if they want to help them, and how.
    - How the player responds to characters affects how the continuing gameplay will work out.
        - Some future events might require that the player is friend with a certain character, or has a specific item.

- Save progress using localStorage

- Add autocomplete of available commands.
    - Use tab to quickly autocomplete input.

- The player gets some kind of score by doing things?
    - Getting items, helping people

- Add fun responses as status messages:
    - "You think that's a good idea? Hah!"
    - "Good luck with that!"

- Animate the status message
    - Make it bounce from side to side when a status message is shown.

- Make the text pop out a bit when appearing
    - Otherwise it will look pretty stale and people might not get that there is new text on the screen than from the previous text message
    - Background color on status message and room title

- Background images related to each room
    - If well selected from unsplash and similar, it will improve immersion and help tell the story.

- Give items id
    - prevent strange bugs
    - also remove items by id, rather than name string.
    - id related to room ex: kitchen, chef's note.

- Diary
    - Keep notes created by the player to help them solve the mystery
    - Automatically add important information for the puzzles or story.
        - Add backstory as the player discovers things

- Gameplay ideas:
    - The player gathers items, to craft tools, to solve puzzles/tasks.
    - The player is encouraged to explore and experiment.

---



# Done
- Replace `done` command with "Press enter to continue..." where possible.

- Parse commands
    - Get user input when "enter" is pressed
    - clear user input box

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

- Instructions
    - Add simple in-game help which prints out commands and their syntax to the main text area. Examples:
        -  `take [object]`: Pick up an object.
        -  `[direction]`: Move in a given direction.
        - `read [object]`: Read a `book` or a `note`.
        - To see these commands at any time, just type `help`.

- Backpack (Inventory)
    - Pick up items to use later
    - List them on the side of the main screen

- The player shouldn't be able to have a username that is a command in the game, or other keywords (maybe?).
