# Todo
- Story
    - Mystery, the player don't know a lot from the start.
    - Notes left behind by a person and some clues.
    - Unknown what has happened to the person
        - Go out and explore.
    - Ending:
        - The player finds evidence making them suspect something terrible.
        - Eventually they find the person. But only if they make the right choices...
        - Use a time limit - every action counts and takes time.
            - Time is precious... Only X actions to make. This includes both moves between rooms, as well as actions in each room.
            - Depending on what the game time is when a player comes to a room, or triggers an event, the game plays differently. This adds to replayability and adds value to trying different strategies and choices.
            - Show time in game UI
                - X days/hours left
                - 05:20 left
                - Display time as a date, where time progresses.
                    - This is probably most suitable for the setting of the game.
                    - Add different amounts of time when moving between different areas - add minutes when going between rooms, hours or days when going between environments.
        - The player visits different environments throughout the game.
            - Each environment has multiple rooms that tie together.
            - Environments explain different parts or perspectives of the story but add together when seen as a whole.
        - If the player made the right choices - and did the right things in time, they may find the person.
        - If they made the right choices, but took too much time doing so, they find the person when it's too late.
        - If they make the wrong choices, it doesn't matter - the person is already gone.

    - Ending idea
        - The player is searching for their friend
        - But as the player explores, they find something disturbing.
            - Their friend might be involved in something bigger, darker - they are in trouble and need help
                - The player feels that they are getting dragged into it as well. Maybe make a crucial choice at this point - which determines the ending?
                - The choice: The friend is getting dragged into their friends problem

- The friends apartment
    - A phone rings
        - Whether the player chooses to answer the phone in their friends apartment - affects the gameplay and future story events (keypoints).
        - If phone answered
            - Unclear, distorted voice (the player don't get to know that this is the friend - but the friend knows that the player answered the phone, which is important for the story or the ending.)

- Text messages (or contact through a third person)
    - Introduced a good part into the story
    - Communicate with the person - different outcomes based on previous choices
    - Maybe get the player to hesitate if they really made the right choices. By making the player feeling guilty because the friend is turning against the player.

- "Thought bubble"
    - Appear when interesting
    - The character tells interesting details and thoughts that add to the backstory and depth of the game.

- Change the pace of the game
    - Start with a slow pace and unfold the mystery slightly while teaching the player the basics of gameplay.
    - Eventually, increase the pace - e.g. let the player complete a task before a certain in game date/time.
        - Increased pace => intensity, make the player feel more engaged after slow periods.
        - Decreased pace => emotional, heavy setting, focus on details rather than fast decisions.
    - Why not incorporate literate timed events?
        - Unprepared 10 s countdown timer where the player have to make a choice or else they miss out on something / lose?
        - Surprising the player could also help keep them engaged by the story since they would feel that they get closer to an intense situation than if they have all the time in the world to think about their next move.

- Weather changes through the story
    - Starts out with late afternoon sun. Continues with clouds as the evening comes closer. Wind starts blowing, light rain is coming. In the end the weather depends on the player's actions? If good ending: "Hey, the sun shines. It's a new day.". If bad: do something else.

- Show the player basic commands rather than telling them to read the `help` section the first they do.
    - "Generally speaking, commands follow the structure `[verb] [object]`."
- Make them learn basic commands through the early game.
    - "If you want to learn more, see `help`" instead of an indirect "read the help before you start."
    - The very first room, `start`, could for example use a status message that says something like "You can move to a new room by entering the direction you want to go in."
    - Or perhaps use a custom `.tutorial` section that is shown on key points of the gameplay. This way, messages could stick around without interfering with features used for the gameplay.

- Also make users aware of the convenience features that are available:
    1. Press tab to autocomplete a command or an object.
        - This is surprisingly accurate and saves a lot of typing.
        - With this, it doesn't have to be as tedious to play a text game - now we can actually focus on one of the genre's great strengths: expressiveness and creative freedom.

    2. Type anywhere on the page - everything will be added to the input field regardless of where the cursor is focused.

    3. Use the arrow keys to navigate the command history
        - This allows you to reuse your previous commands.
        - When you've found what you want, just press enter.
        - Remember that you always come back to a blank state
            - This can be used to quickly clear the input field by pressing up and then down. And I thought CTRL + A was the best there was...

    - These could be introduced in the beginning, or as tips later during the game. But at the very least, they should be mentioned so those who want to learn more can read about it before they start playing.

- Update `help` with new commands.

- Add `inspect [object]` command - "Take a moment to determine how you can interact with an object. Very useful if you don't know what to do."
    - Useful to help the player when they are stuck.
    - *Though, this situation should hopefully be avoided - by giving the players clear ideas of what to do, through tasks or through the room descriptions.*

- Tasks
    - Add UI component to show tasks
    - A room shows a thought bubble (representing the player's own thoughts) "This chest is locked. I wonder if there's a key somewhere..."
    - This could give the player clues to help them progress.
    - Timed tasks (complete X before a certain in game date/time)
    - Think about when and how to check for task updates
        - Probably around the time that the player inventory is displayed.

    - Introduce the first task once the player opens the door.
        - Add the task to the task UI component.
        - "Find out if your friend is at home. Why is the door open?"




- add apartment.livingRoom.computer
    - Maybe add it as an item with special methods
    - Maybe add it as it's own room, with items that represent different interactions the player can make with the computer. This solution allows reuse of the existing structure while giving pretty good creative freedom.
- add bedroom
- add bedroom.window
- add bedroom.wardrobe
    - Standing open, looks like someone searched through it in a hurry.


- Kitchen
    - TV time table on the fridge door
        - might imply that the friend is not himself.
        - might also give a clue that the TV is important for the story.

- Add a poster somewhere in the Apartment
    - about the company and what they do
        - might imply that the friend is not himself.




---
# Bugs

- Autocomplete not working for multiple words
    - "use photo " -> Press tab (autocomplete) -> "use photo photo frame"



---
# In progress
- Add new rooms according to the updated apartment structure.









---
# To think about
- *Should players be limited from going back to the start rooms?*
    - Probably not, as it's hard to know what rooms can be returned to and which that can't.
    - In some cases, this could be an interesting game mechanic, but then the player needs to be aware that their actions are permanent and that they can't change things afterwards.

- Maybe the game doesn't need to be that open after all. It might fit better with the theme (and be easier to develop). A game where the story is more linear, but offer small variations that add replayability and time for exploration, is likely a better approach than a massive open world game with separate story lines and player choices.
    - Maybe it can be a mystery game even though it's linear? Indeed it can!




---
# Ideas
- Strange phrasing in beginning of the "In the sofa in front of the TV."

- Add help section to right side of UI to make commands available
    - Or add a message in top right corner: "Stuck? Type `help`."

- Basic map in the bottom right corner
    - Show squares to represent rooms.
    - Show connections to other rooms
    - Show the player
    - This way, the basic directions
    - Mini compass: show directions on each side of the map with an arrow. N, S, E, W

    -Simplified idea (to save dev time):
        - Could be shaped as a compass (circle)
        - Show current room short name/title in the center.
        - Highlight available directions to move in.
        - Fade out unavailable directions.

- Add new commands to the help section as the player progress through the world, instead of adding everything at once.

- Maybe use a dark background and light text to be easier on the eyes.
    - Or add a dark theme that users can toggle.

- Maybe add a slight delay - or a typing effect, adding character by character to the screen as new information is available.
    - This would reduce instant reactions and make the game feel more relaxed
    - Maybe this could also be achieved by adding slight delays (200-400 ms)
    - Another idea is to let rooms fade in and out over this transition time.

- Make decisions in other ways than writing
    - (Clicking on buttons or graphics)
        - The text based is engaging in its own way, it will be special for players who aren't used to the style of game - but hopefully the story is engaging enough to keep them going.
    - **Select from predefined responses**
        - when conversing with NPCs
        - when having to make choices in intense moments where the player only can do one thing.

- The player will meet different characters
    - In short, the relationships with other characters matter.
    - Some just tell a story or ask questions
    - Some give items
    - Some want help with problems
        - The player must chose if they want to help them, and how.
    - How the player responds to characters affects how the continuing gameplay will work out.
        - Some future events might require that the player is friend with a certain character, or has a specific item.

- Save progress using localStorage
    - Perhaps tied to the player name - allows multiple saves.
    - On start screen, users can choose a saved game from the list - or enter a name to start a new game.
        - If no games yet: only display "Enter your name" and input field.
    - Show list of usernames to represent saves.
        - a table structure would make alignments of names and buttons simple.
    - Click a name to load it (anchor tag with onclick)
    - Possibly some feature to delete a save (click a small 'X' button to the right of the name)
    - Add save command - and/or add autosave to when the browser unloads and possibly every N minutes.

- Make the text pop out a bit when appearing
    - Otherwise it will look pretty stale and people might not get that there is new text on the screen than from the previous text message
    - Background color on status message (and any additions to #game-text)
        - add a span with a transition class to the newly added text.
        - add the transition class to the status message
        - remove classes after a timeout
    - Maybe add a slight gray background that fades out over time.

    - Animate the status message
        - Make it bounce from side to side when a status message is shown.

- Gameplay ideas:
    - The player gathers items, to craft tools, to solve puzzles/tasks.
    - The player is encouraged to explore and experiment.






---
# Low prio ideas
- In the sofa, it could be possible to sit down and look at a digital photo frame, which reveals details and backstory - but makes in game time pass (which could affect gameplay later)

- Make sure the game UI is responsive on smaller screen sizes.
    - Focus down to small laptops
    - Also check high res viewports too.

- Make sure fonts are consistent across browsers.
- Look into using the Chrome monospace font (Consolas) as default game font.
- Consolas seems to be preinstalled on both macOS and Windows, which will be the main platforms. Look into supplying it as a web font, to support Linux.
- *Lower prio, as the main platforms macOS and Windows work decently. Focus on gameplay.*

- When autocompleting objects without having any search term, cycle through all available objects one by one, one for each consecutive tab press.
    - *This needs some work, but could be a nice feature* to quickly enter objects in rooms.
    - At the same time, this takes away from the experience of finding objects that are part of puzzles and similar.

- Refactor:
    - Add `Game.setVisibleSection()`
        - hide current visible section
        - set to new one
        - show new section
    - *This could simplify the codebase quite a bit, but is a low prio for now.*

- Background images related to each room
    - If well selected from unsplash and similar, it will improve immersion and help tell the story.
        - *Interesting idea, but will require some work to implement.*
        - Easier, to just let the player imagine how the environment look like.

- Replace all note dates with actual dates, cross checked with a calendar
    - Ensure date formatting is correct: E.g. `Thursday, May 12th`

- Add about section to my samuelplumppu.se:
    - "At one point, I wanted to be a author. At another, I wanted to be a developer. So I figured, why not just do both?

    This is an exploration of interactive storytelling. How to make characters and environments feel more alive mainly through text. Instead of fancy graphics, this game uses one of the best renderers there are; the human imagination."
    - *Create the game first*

- Consider using JS modules to separate scripts in a safe way.
    - *Modules are not commonly supported.*

- Items have a weight or space cost to store in inventory. This allows the player to only pick certain items.
    - *Or just don't use that many items in the game - Only use those that add value to the gameplay experience.*





---
# Inspiration
- (Amnesia, Myst)
- AQW
    - > Worldmap> Throne Of Darkness> Scarletta, Tower of mirrors.
        - This world area is a great example of how the different rooms can contain different tasks or secrets that will unveil later on in the game. The player will progress and understand that certain items that wasn't relevant for them at the time will become relevant in the future. In this way you can create great story elements and simple tasks that can seem like an endless puzzle for the player but in reality it's quite simple to pump out tons of different tasks and things the player can interact with.
        TLDR; each room may contain several things to interact with, but only a handful are useful for the player at the moment, but later on in some rooms later a task may require the player to combine items from previous rooms.
- Simon Stålenhag - Flodskörden
    - Different environements.
    - Jumps in Time.
    - Seemingly irrelevant details that add to the story.
- Zork
    - Command parsing, how bad commands are handled - comical error messages instead of "You can't do that."
---







# Done
- Show `notes` in UI somewhere
    - Perhaps something like "2 notes found" in it's own UI component
    - Show with background, below the inventory in bottom left corner.

- Update sentence in "on the computer":
    - "So careful with security (...), yet leaving this detail unchecked."

- Do you write "hehe" in text?

- When taking a note and then taking the photo frame, there's an undefined item in the inventory.

- Clarify note collection:
    - Add example: `E.g. "1"`

- Split rooms into separate files
    - Add folder `/js/rooms` for all rooms and items
    - Add folder for each environment
        - Add each `room` in a separate file: E.g. `/js/rooms/apartment/outside.js`
        - The room file holds all content for that room:
            - Room data + item data

- Add note collection and improve how notes work.
    - When taking notes, add them to the collection, instead of inventory
        - Maybe show another message to highlight that this isn't added to the inventory, but another place: "Added a new note to your collection."

    - The notes left behind by the friend could be diary entries
    - *TODO*: Add support for multiple notes.
    - State a date, but no year, to leave that up for interpretation by the player.
    - Should these be added to some kind of collection that remains with the player through the game?
        - In that case, don't add them to the inventory.
        - Also don't allow them to be dropped
        - Store them in `player.collection.notes` or just `player.notes`
            - *TODO*: Figure out a convenient way for the player to read them
                - Maybe through "read notes"
                    - Once that command is submitted, the player will see a list of all notes.
                        - Show note number and its date
                    - To view individual notes, enter the number of the note
                        - E.g. "1" + [Enter] which shows note number 1.
                    - Then press enter to get back to the list again.
                - and enter again to get back to the current room.


- **To implement note collection:**
1. When interacting with a note (take, read) for the first time, add it to `player.notes`, instead of inventory. `player.notes` remain the whole session: notes don't need to be dropped.
    - Maybe only add the note if it's explicitly taken - this way, the player can make a choice to keep notes for later, or just read them and continue.
        - They might need to go back to notes in the future, which is why they should take notes they find with them.

2. Show message: "You found a new note. Use `read notes` to view your collection."

3. Add command `read notes`. `notes` need to be some kind of keyword
    - Set the title to `Note Collection`
    - This command shows a list of notes:
        - Note #1 - April 12th
        - Note #6 - May 1st

4.  In this list, enter the number of the note you want to read and press enter to view it.
    - This requires some kind of flag to trigger another parser than the regular one - this feature could also be useful in other contexts.
        - This temporary parser could offer greater freedom in game mechanics and allow different rooms to have their unique features.
        - Maybe `game.temporaryCommandParser` could be set to a function at those times when it's needed. In the regular parser, wrap everything in a conditional. Use the temporary parser if its set.
        When the section is completed, unset the temporary parser again.
        - This way, entire custom sections could easily be added onto the core game engine.
        - Maybe add this code to another file than the main one to organize the project better.
    - Use regular `note.actions.read()` to show contents

5. Press enter to get back to the `read notes` menu
6. Press enter again to return to the current room.

- Add support for autocompletion of keywords like `notes`. Add their own section to the dictionary.

- How should room state be handled?
    - Some rooms may need to print different information at the first visit than when they are re-visited.
        - For this, maybe use `room.visited` to alter description and other things.
            - One solution could be that, if the room needs dynamic description, set description to a function rather than a string
            - This way, the description can be altered based on state, with minimal changes to the game engine.
    - Others need to have special behaviors.
    - Adding on custom methods to every room might work, but could be messy.
        - An example that works is `room.playerCanLeave()` that lets the game engine know if the current room state allows the player to leave the room in the direction they want.
    - **Conclusion:**
        - Use `room.state` for custom state used by the room.
        - Common state, like `room.visited` will be set by the game engine itself.
        - Use dynamic descriptions (a function) if the need arises.
        - Standardize methods as far as possible, e.g. `room.playerCanLeave()`

- Add the name of the friend: Kevin

- Show different descriptions based on if rooms have been visited.
    - Rooms keep track of this.visited status
    - Solve by using a `description` function

- add note.read as a boolean to note.state
    - Keep track of if the player read the note or not
    - When taking up the note: Only also force read it if its not already read.

- Improve the error messages for missing data:
    - Instead of asking a question like "What do you want to pick up?", tell them that "What do you want to take up? Usage: `take [object]`."

- Add "The" in front of rooms to make rooms feel more significant.

- Display names of items that can be interacted with in *italics* font to make them stand out.
    - Since they are shown in a separate section, the `#item-text` div, they are already pretty separated.
    - This feature is however interesting for items that use a custom display - not the `#item-text` div, but custom text in the description.
        - if used in this case, better be consistent?

- Maybe fix the text highlighting issue caused by the DOM-order where inventory is in between the header and the gameText. *Or maybe not worth it.*
    - Disable highlighting for
        - inventory
        - status message

- On keydown event - always focus the input field

- Add window.DEBUG options:
    - Quickly start at a specific room, with a specific state.
    - automatically set username and start the selected room.

- Prevent movement and actions when user is in the help menu, when game.gameStarted === true.
- Maybe even make the input uneditable - only accept enter.

- Make sure to clear the status message when new commands are entered in the help menu - they should not stick around until the help menu is closed and the player returns to the main menu.
    - Maybe clear the status once the done() method is executed?
    - Or always when a new command is entered?

- Fix positioning for the input field.
    - This is caused by the positioning of the input field + status message. It needs to get a better positioning.
    - When the player has typed 'help' and then tries to type a command like 'continue' for example, the help 'window' will not disappear and there will be multiple layers of text on top of each other.
    - Use different positioning on start screen.

- Add autocomplete of available commands.
    - Use tab to quickly autocomplete input.

- Give items id
    - prevent strange bugs
    - also remove items by id, rather than name string.
        - This seems hard to fix. A simpler solution is to always use unique names for items.
        - Since notes should be tracked in their own collection, not in the inventory, this is no longer a problem.
    - id related to room ex: kitchen, chef's note.
    - itemName + number - "note-1"

- update desk

- Remember latest commands to allow fast re-use.
- Press up key to automatically enter the latest entered command into the text field.
- Then navigate with up key (the previous command) and down key (the next command) to go back/forward in the history.
- This could help power users get a better experience playing.
- Also helps when some character is mistyped and you quickly want to fix it.

- Improve visuals of help menu - display as table - or just align the descriptions properly horizontally.

- Make sure user cant have any aliases as their name - Update isCommand()
- Add aliases for directions to help menu
- Add aliases for quick navigation: `n`, `s`, `e`, `w` mapping to directions.

- update kitchen
    - add section fridge
    - add section table

- add section sofa

- Improve how items are shown while objects are active. Add default to `Press enter to continue...` when items are used. If this isn't suitable in some situations, I'll look at it then. But it works for now.

- Issue: Handle `[object]`s with multiple word names, e.g. `"photo frame"`

- update livingRoom
    - This is now the open area of the apartment connecting to multiple sections of the living room, and the kitchen.

- It should not be possible to move if the game hasn't started yet.

- add bathroom
    - add shower
        - possible to investigate the shower and find a clue.
- update hallway to show the bathroom
- move kitchen and fix connections.

- When reading a note, items for the room should not be displayed.
    - Perhaps hide or clear itemText as soon as an item is active - or do it manually.
    - Either use generic solution with `player.activeItem`
    - Or manually use `game.itemText('')` in all "blocking" actions.
        - Likely the generic will be better long term - but for now, a manual solution should work.

- Add `go [direction]` command although it's preferred to just use `[direction]`

- Prevent "use doorbell" from overflowing the game text area. Only show the two messages once.

- Consider displaying items in a separate content area from the main gameText. This allows items to be updated without having to update the gameText (and in some cases reprocess to get the same state).

- Ensure the item section of a description is updated when something happens to them. E.g. `take` or `drop`.

- Add the property `movable` to items to know if an item can be picked up or not.

- "I didn't understand that" doesn't get cleared when game starts.
    - Make sure to clear game.status('') when game starts.

- Prevent game from starting if name is empty.

- Make the dictionary private by adding it inside the game closure rather than using a global reference.

- Make the player enter his name before giving instructions or else the UI will be messy.

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








---


# Archived Ideas
## Either won't fix - or not suitable for the theme of this game
- Investigate how to avoid duplicate actions for items. Maybe add some way to specify which actions that can result in the same function being executed?
    - An array of acceptable action verbs for a given function
    - Or an object with the two properties: 1) the function to execute, and 2) the verbs to execute it for.
        - *Low prio, until this becomes a significant problem with 10+ instances of items that reuse actions*

- Maybe replace `Player.use()`, `Player.check()` and similar verb-actions with a generic method, that branches out to the specific logic for each action?
    - Ex. call the specific `useItem()` from the generic method based on the verb.
    - *This is not needed at this time - currently only a waste of time*

- Player diary
    - Keep notes created by the player to help them solve the mystery
        - *There isn't really that much to keep track of. They can do it on their own.*
    - Automatically add important information for the puzzles or story.
        - Add backstory as the player discovers things
        - *This doesn't add to the theme of the game. The player need to discover things themselves.*

- Gameplay idea:
    - "Eat/do something that doesn't make sense" => get a unexpected secret/ progression in the game/story.
    - E.g. doing something weird opens a door and a person comes out saying "Wait! You can't do that"
    - *Might work, but the theme of the game is dark, mystery which doesn't really fit with this idea.*

- The player gets some kind of score by doing things?
    - Getting items, helping people
    - *Not suitable for this game at all since it's narrative driven.*

- Add fun responses as status messages:
    - "You think that's a good idea? Hah!"
    - "Good luck with that!"
    - *Don't add to the theme of theme of the game.*

- Should the dictionary define common actions?
    - These actions would be usable only if items (targets of the action) meet certain requirements.
- or should all items define their own actions, allowing for customization?
    - *For now, items with custom actions seems to work fine.*
