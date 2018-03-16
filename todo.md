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

- Tasks
    - Add UI component to show tasks
    - A room shows a thought bubble (representing the player's own thoughts) "This chest is locked. I wonder if there's a key somewhere..."
    - This could give the player clues to help them progress.
    - Timed tasks (complete X before a certain in game date/time)

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

- Update `help` with new commands.


- Investigate how to avoid duplicate actions for items. Maybe add some way to specify which actions that can result in the same function being executed?
    - An array of acceptable action verbs for a given function
    - Or an object with the two properties: 1) the function to execute, and 2) the verbs to execute it for.

- Add `inspect [object]` command - "Take a moment to determine what you can do with an object."
    - Useful to help the player when they are stuck.

    - Add description / or task to find out if the friend is at home or not.
        - "Find out if your friend is at home. Why is the door open?"



- update desk
- add apartment.livingRoom.computer
    - Maybe add it as an item with special methods
- add bedroom
- add bedroom.window
- add bedroom.wardrobe
    - Standing open, looks like someone searched through it in a hurry.




# Bugs
- Fix positioning for the input field.
    - This is caused by the positioning of the input field + status message. It needs to get a better positioning.
    - When the player has typed 'help' and then tries to type a command like 'continue' for example, the help 'window' will not disappear and there will be multiple layers of text on top of each other.
    - Use different positioning on start screen.

- Prevent movement and actions when user is in the help menu, when game.gameStarted === true.

- Make sure to clear the status message when new commands are entered in the help menu - they should not stick around until the help menu is closed and the player returns to the main menu.
    - Maybe clear the status once the done() method is executed?
    - Or always when a new command is entered?


# In progress
- Add new rooms according to the updated apartment structure.




# To think about
- Should the dictionary define common actions?
    - These actions would be usable only if items (targets of the action) meet certain requirements.
- or should all items define their own actions, allowing for customization?

- How should room state be handled?
    - Some rooms may need to print different information at the first visit than when they are re-visited.
        - For this, maybe use `room.visited` to alter description and other things.
            - One solution could be that, if the room needs dynamic description, set description to a function rather than a string
            - This way, the description can be altered based on state, with minimal changes to the game engine.
    - Others need to have special behaviors.
    - Adding on custom methods to every room might work, but could be messy.

- Maybe replace `Player.use()`, `Player.check()` and similar verb-actions with a generic method, that branches out to the specific logic for each action?
    - Ex. call the specific `useItem()` from the generic method based on the verb.



---
# Ideas
- Display names of items that can be interacted with in *italics* font to make them stand out.

- Add new commands to the help section as the player progress through the world, instead of adding everything at once.

- Maybe add a slight delay - or a typing effect, adding character by character to the screen as new information is available.
    - This would reduce instant reactions and make the game feel more relaxed
    - Maybe this could also be achieved by adding slight delays (200-400 ms)

- Make decisions in other ways than writing
    - (Clicking on buttons or graphics)
        - The text based is engaging in its own way, it will be special for players who aren't used to the style of game - but hopefully the story is engaging enough to keep them going.
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
    - Perhaps tied to the player name - allows multiple saves.

- Make the text pop out a bit when appearing
    - Otherwise it will look pretty stale and people might not get that there is new text on the screen than from the previous text message
    - Background color on status message and room title
    - Maybe add a slight gray background that fades out over time.



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


- Add window.DEBUG options:
    - Quickly start at a specific room, with a specific state.
    - automatically set username and start the selected room.

- Add convenience feature:
    - Autocomplete commands



---
# Low prio ideas
- Items have a weight or space cost to store in inventory. This allows the player to only pick certain items.

- in the sofa, it could be possible to sit down and look at a digital photo frame, which reveals details and backstory - but makes in game time pass (which could affect gameplay later)

- Background images related to each room
    - If well selected from unsplash and similar, it will improve immersion and help tell the story.

- Gameplay idea:
    - "Eat/do something that doesn't make sense" => get a unexpected secret/ progression in the game/story.
    - E.g. doing something weird opens a door and a person comes out saying "Wait! You can't do that"

- Add autocomplete of available commands.
    - Use tab to quickly autocomplete input.

- The player gets some kind of score by doing things?
    - Getting items, helping people

- Add fun responses as status messages:
    - "You think that's a good idea? Hah!"
    - "Good luck with that!"

- Animate the status message
    - Make it bounce from side to side when a status message is shown.

- Add about section to either game page itself or on my website:
    - "At one point, I wanted to be a author. At another, I wanted to be a developer. So I figured, why not just do both?

    This is an exploration of interactive storytelling. How to make characters and environments feel more alive mainly through text. Instead of fancy graphics, this game uses one of the best renderers there are; the human imagination."

- Maybe fix the text highlighting issue caused by the DOM-order where inventory is in between the header and the gameText. Or maybe not worth it.

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
