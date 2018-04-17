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
    - "Here are some convenient features to improve your experience playing this game:"
    - End with "You can read more in the `help` section." at the bottom.
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

- Ending
	- One 2x good - you save both your friend and the world.
	- One 1x good where you get to choose which one to save - your friend or the world.
	- One 2x bad where you fail both saving your friend and the world.

- The company's motives:
	- They are basically trying so hard to "do the right thing" that they just end up doing bad things, while striving for their "good cause".
	- Like Facebook, they say they want to "connect people"

- Kevin signed a contract that he can't get out of.
	- Either you, as the player help him, or you try save the world, or you try to do both!
	- Because of the memory issues, he might not even remember the contract.

- In his notes, he explain how he at first was excited about the work. But at a later time, he lost that enthusiasm.

- Kevin witnessed another employee who had gone through the whole process - and he was scared.
	- The results on the weren't favorable.
	- Before he lost his mind, he choose to contact someone.
		- Maybe they get involved in the story and play a part.
	- The company might have picked up on this, trying to reach out to Kevin.

- Add new direction to `help`: `back` with alias `b`.

- Fix autocomplete for `CustomParsers`
    - Maybe each `CustomParser` can supply their own command completions, but still use the regular code?
    - This way, players could get the same experience in the whole game, even in custom sections or in the help menu.

- Add content to the computer
    - Browser has multiple tabs open, which the player can read through.
    	- One of them ties to the story
    - Email client is open in the background.
        - A new email has been received.
            - Possibly an email part of a conversation of seveal ones.
            - Perhaps email giving further details about how Kevin is handling the situation at his work? Maybe he tried to contact someone about what was happening and got a reply? Or maybe they've been in contact for a while?
        - Email client could be visible to the player when they've completed the task to search for some information in the web browser.
            - Maybe the completion of the task triggers a GameEvent that in turn makes a notification pop up on the computer, giving the user a choice to go to the email client.

- Add TV
	- Maybe three different channels to choose from.
		- One is a movie
            - If player chooses to watch it, time will pass.
            - *In a future version of the game, time could be a precious resource that will depend on the player's actions. But not for a basic version.*
        - Another one is some random TV show.
		- And finally, we have the news, which give a clue about the story.
            - Possible the only way to get on and get to the next task?
                - The player sees something interesting and wants to know more
                - So the task tells them to go to the computer to look for more information.

- Improve apartment.bedroom.window
    - Add notes that give story details for the curious player.
    - *Discuss how to add several notes in one place*
        - Either a GameEvent, that players read through note by note.
        - Or let notes be identified by `first note`, `second note` etc.
        - Or Skip the note part, adding a `noteboard` item, where reading it will be done in multiple parts.
            - Each part focusing on it's own note.
            - *Should notes be movable? - should the player be able to pick them up?*

- Update docstrings in rooms.js and similar files. Move documentation comments to related classes instead.

---
# Bugs




---
# In progress








---
# To think about
- *Should players be limited from going back to the start rooms?*
    - Probably not, as it's hard to know what rooms can be returned to and which that can't.
    - In some cases, this could be an interesting game mechanic, but then the player needs to be aware that their actions are permanent and that they can't change things afterwards.

- Maybe the game doesn't need to be that open after all. It might fit better with the theme (and be easier to develop). A game where the story is more linear, but offer small variations that add replayability and time for exploration, is likely a better approach than a massive open world game with separate story lines and player choices.
    - Maybe it can be a mystery game even though it's linear? Indeed it can!





---
# Ideas
- Find good fonts

- Revise font styles (text highlighting) for different kinds of information.
    - Maybe show "check" as bold italics in 'outside.js'

Time jump - Kevin hasn't come home yet
	- Allow player to watch TV, which makes time pass.
	- Make items available after the time jump that weren't available at first.

- Add `help` section start page, like `read notes` has.
    - Basically use the same code, but display a help page instead of a note.
    - This will give users a overview of what's available, and help them navigate.

- Show summary of each chapter at the end of it.
    - notes found, clues found etc.
    - Summarize key points of the story
        - "I went to X and did Y"
            - Allow the player to follow along with the story´, by telling it to them, from the perspective of the main character.
    - *This could also be handled through* `GameEvent`s

- Create save points, each time a chapter is completed (like the apartment)
    - Maybe even display "Chapter 1: The Apartment", big text covering the whole screen and slowly fading out over 2-4 seconds, showing the `ui.gameContent`.

- Play a sound effect to notify the user when a task is completed

- Change background music / ambient sounds for different environments.

- Background music ideas:
    - Use private demo tracks from https://soundcloud.com/greenheartmusic "Whatever Demo1" and "Deep ID 1 Demo2". Almost complete background tracks, just need some finishing touches.
        - For "Whatever Demo1", add a third chorus in the end and some outro and finish mixing.
        - For "Deep ID 1 Demo2", add background chords/harmonies to the chorus and finish mixing.
    - Other tracks might also be suitable.

- Maybe describe the condition for completing a task in the task details
    - E.g. "2/9 rooms visited."
    - *Could clarify what players need to do - or ruin the experience of exploring the game world, by telling them exactly what to do.*

- Make it possible to disable all text input when "Press enter to continue..." is the only available action. Only the enter key should work.
    - This could be enabled when `useContinuePlaceholder()` is activated - or when `player.activeItem` is set
    - Maybe this could help clarify that there are times where no other actions than an Enter press makes sense - like in menus.

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
        - Show environment title, e.g. "The Apartment" as a header at the top of this component.
        - Highlight available directions to move in:
            - green: available directions
            - yellow: where you came from (if available)
        - Fade out/hide unavailable directions.

- Add new commands to the help section as the player progress through the world, instead of adding everything at once.

- Maybe use a dark background and light text to be easier on the eyes.
    - Or add a dark theme that users can toggle.

- **Tasks**
    - Both active and *inactive tasks are kept for now* to allow for example statistics to be shown in the future.
    - Keeping inactive tasks would also allow us to track *how well* the player completed them, or to *track their decisions that may affect further story/gameplay*. Feels like a good place to store this information.

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
- `back` command. Quickly get back to where you came from (not just in the computer room, but anywhere it's possible to move around).
	- Only remembers the latest direction - or multiple steps?

- User types action => objects become clickable => When objects are clicked, they get typed into the text input field.

- Update `room.name` to `room.id` to increase naming consistency.

- Consider moving items into separate file(s) to separate them from specific rooms.
    - This would allow multiple instances of items to exist in the same/ multiple rooms without duplicating code.
    - Instead of adding hard coded item objects, add string `id`s that some kind of `initializeItems()` method could use to find the actual item instances.

- Create a `Item` class and move item-related logic there.
    - Items could be instances of the class, based on configuration objects like `room`s or `task`s.

- Possibly show a modal of some kind describing a new task when it's received? Or just populate game content.
    - *This is a feature for a later time. The minimal approach should work fine for now.*

- Allow player to see details about a task
    - *Possible future feature*
    - Maybe by hovering the task title? *(Not touch-friendly)*
    - Maybe clicking the task?
    - Maybe add `tasks` command which will show details about the active tasks in the game content area. Maybe a similar approach to how both the help and notes are interacted with: `[task number]` or `next`/`prev`

- Timed tasks (complete X before a certain in game date/time)
    - *Possible future feature, low prio initially.*

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

- Update `help` with new actions. *Do it again in the future.*

- Background images related to each room
    - If well selected from unsplash and similar, it will improve immersion and help tell the story.
        - *Interesting idea, but will require some work to implement.*
        - Easier, to just let the player imagine how the environment look like.

- Clarify usage of "Commands" and "Actions". Perhaps call everything for actions, to be more user friendly. Commands sound more complicated, and might steal attention from the core experience.
    - Go through all UI text. Perhaps even code, to stay consistent.

- Replace all note dates with actual dates, cross checked with a calendar
    - Ensure date formatting is correct: E.g. `Thursday, May 12th`

- Fix game credits - show everyone involved rather than individual names.
    - Add people to the thanks section of the readme
    	- Thanks for help testing and giving feedback.
    - Update main menu text and HTML meta information. Also look over GitHub page.

- Write something about the project on samuelplumppu.se:
    - "At one point, I wanted to be a author. At another, I wanted to be a developer. So I figured, why not just do both?

    This is an exploration of interactive storytelling. How to make characters and environments feel more alive using text. Instead of fancy graphics, this game uses one of the best renderers there are; the human imagination."
    - Since this game is built from the ground up, it's both a game engine and a game. Several parts of this project could theoretically be reused for another text game with a completely different story and setting. This was not intentional during development, but rather a consequence of how the (at the time) most sane design choices ended up creating a project that is kind of modular, where the content itself can be replaced.
    - Another fun part of this project is that we tracked ideas, planning and progress in Git, making it easy to see how we thought at a given time.
    - *Create the game first :P *

- Consider using JS modules to separate scripts in a safe way.
    - *Modules are not commonly supported.*

- Items have a weight or space cost to store in inventory. This allows the player to only pick certain items.
    - *Or just don't use that many items in the game - Only use those that add value to the gameplay experience.*

- Refactor: Add helper method `Game.setCustomParser(customParser)`
    - This will not only set game.customParser, but also bind `this` to the game instance. This would remove need for the `game` parameter in all parsers, and increase consistency with other parts of the codebase.
    - *Just not sure if this change brings any real improvement though. `game` might be just as good.*

- Maybe rename `item.movable` to `item.collectible` or something similar.
    - Since the adjective movable is related to the action `player.move()`, it might be confusing.
    - *Naming issue*




---
# Inspiration
- (Amnesia, Myst)
- AQW
    - > Worldmap> Throne Of Darkness> Scarletta, Tower of mirrors.
        - This world area is a great example of how the different rooms can contain different tasks or secrets that will unveil later on in the game. The player will progress and understand that certain items that wasn't relevant for them at the time will become relevant in the future. In this way you can create great story elements and simple tasks that can seem like an endless puzzle for the player but in reality it's quite simple to pump out tons of different tasks and things the player can interact with.
        - TLDR; each room may contain several things to interact with, but only a handful are useful for the player at the moment, but later on in some rooms later a task may require the player to combine items from previous rooms.
- Simon Stålenhag - Flodskörden
    - Different environments.
    - Jumps in Time.
    - Seemingly irrelevant details that add to the story.
- Zork
    - Command parsing, how bad commands are handled - comical error messages instead of "You can't do that."
---







# Done
- Refactor the doorhandle in apartment.outside to use a `GameEvent`
    - Tell the user to `Press enter to continue` instead of `go north to enter`.
    - Make sure players can't get back to `apartment.outside` and only are allowed to enter the apartment. This way, they don't see the text shown in the event twice.

- Items are shown from the room when reading a note for the first time (and picking it up).
    - Maybe only show items of the room if not `player.activeItem` is set?

- Items also get shown when a GameEvent is triggered.
    - In `GameEvent.onStart()`, set `game.itemText('')` to prevent this.

- `take jacket` in wardrobe might make sense to not prevent gameplay for the player.
    - Just prevent the `move()` action from happening in another room than the wardrobe


- Prevent duplicate action names in `inspect [object]`.

- Improve white box text
    - "once inside here" -> "once inside this box"

- Add `view` action
    - "view photo frame" - trigger same action as for `take`

- Reading the poster and then picking it up doesn't update room.showItems()
    - See what happens when the poster is read.

- *Should autocomplete only work for valid completions?*
- For example, autocompleting a object name for an action it can't be used for takes away from the player's freedom to try different thoughts.
- This might cause players to experience the game as more linear than it is.

- Allow `read notes` to trigger even if user types `read note`, to decrease possible typos and thereby improve player experience.

- Improve wardrobe by adding items that provide details and backstory.

- Add `room.playerCanInteract()` to limit players from interacting with objects unless they meet some condition. See `room.playerCanLeave()` for inspiration.
    - Also document in `rooms.js` docstrings or in the `Room` class.
    - This could be used to limit interactions with `TV` in `apartment.livingRoom.sofa` or `computer` in `apartment.livingRoom.desk`.

- Refactor player actions to improve how they are parsed.
    - This removes some duplicate code, while also preparing for new features, planned for the future.

- **Implement a basic version of tasks**
1. Show Tasks UI component
2. Add initial task directly to `game.tasks`
    - Each task has some properties like `active`, `title` and `description`
3. Introduce the first task once the player opens the apartment door (right before they enter the hallway).
    - "Find out if your friend is at home. Why did he leave the door open?"
4. Add `game.player.updateTasks()`.
    - This shows the player's *active* tasks in the task UI component.
5. Design UI to show tasks in a nice way.
6. Add some way to check if the task is completed
- In this basic example, it could be to visit all rooms of the apartment: `rooms[apartment].every(r => r.visited)`
7. Implement basic version of `GameEvent`s:
    - Each `GameEvent` is a separate object, containing:
    - `onStart()`:
        - Callback starting the event, and performing all main tasks of the event.
        - Maybe set a custom parser, move the player to a specific location or similar.
    - `onEnd()`:
        - **Optional** callback for cleaning up state up once the event is finished and return to the game.
8. Add example `GameEvent`: Triggered when all rooms of the apartment have been visited.


- Dicuss and implement `GameEvent`s
    - Used to handle specific logic that don't happen in a specific room, or by specific actions, but happen because of some other condition.
        - For example the player have visited all required rooms, interacted with some object - or maybe the game state (like in game time and date) says the event should happen.
    - The game has all registered events centrally, enabling it to continually check if any `GameEvent` should be triggered.
    - `game.updateGameEvents()` - Checks if some new event should trigger.
    - Possible places to check and trigger events:
        - `player.move()` - Will be enough for
        - `player.updateUI()` - Will capture all cases if it's called in `player.move()` as well.

- Items are not properly dropped from the inventory
    - At least it's not updated in the UI

- When the player have no current `active` tasks, the UI component should be hidden.

- Add a checkmark next to the task header.
- Add styling for completed tasks: green text.

- Add window.DEBUG options:
    - Quickly start at a specific room, with a specific state.
    - automatically set username and start the selected room.

- add apartment.livingRoom.computer
    - Maybe add it as an item with special methods
        - This would be possible now thanks to the `CustomParser` feature.
        - And this would make a much cleaner transition than "west" or "east"... :P
        - Different actions would simply be implemented into the custom parser.
            - If that file grow large, it could be split into several sub modules.
    - Maybe add it as it's own room, with items that represent different interactions the player can make with the computer. This solution allows reuse of the existing structure while giving pretty good creative freedom.

- Clear itemText when showing a note directly from a room.

- `read` not working when player is inspecting the tv timetable.

- Improve autocompletions:
    - For `take` and `drop`, don't suggest items with `item.movable === false`
    - Not working for objects with uppercase names.

- Ensure uppercase names work properly everywhere.

- Kitchen
    - TV time table on the fridge door
        - might imply that the friend is not himself.
        - might also give a clue that the TV is important for the story.

- Add new rooms according to the updated apartment structure.

- Prevent other actions than 'north' or 'n' when player has checked the doorhandle in `apartment.outside`

- Possible to start the same task multiple times by typing `use doorhandle` repeatedly. Add a check in `player.giveNewTask()` to fix.

- Improve `inspect [object]`
    - Clarify status message to not confuse players that they can interact with the object from that view, but have to press enter first.
        - Disabling all forms of text input except the enter key would solve this.
    - Or get around this issue by allowing interactions with the `inspect`ed item, but nothing else?

- After using `read notes` for the first time, the player can't use further commands without pressing enter once first. This could be caused by `player.activeItem` not being cleared properly when the `read notes` view is closed.

- Further improve autocompletions: Don't autocomplete `read` for items without a read action.

- Some actions should not trigger autocompletions for items.
    - for example if player has poster in inventory and tries to autocomplete `take p` (to take the `photo frame`), `poster` should not be a given completion.

- Autocomplete not working for `read poster` but it is for `take poster`. Check other completions for other `read` targets too.

- Add a poster somewhere in the Apartment
    - about the company and what they do
    - also marketing poster for the new wearable device.
        - might imply that the friend is not himself.

- add bedroom
- add bedroom.window
- add bedroom.wardrobe
    - Standing open, looks like someone searched through it in a hurry.

- **Tasks**
    - Add UI component to show tasks
    - A room shows a thought bubble (representing the player's own thoughts) *"This chest is locked. I wonder if there's a key somewhere..."*
        - This "thought bubble" could just be *italics text for an initial version.*
    - Tasks give the player clues to help them progress.
        - Completing tasks also rewards them, making them feel more engaged with the story since they see that they've accomplished something.
    - Think about when and how to check for task updates
        - Probably around the time that the player inventory is displayed.
        - This could also be handled by callback functions in rooms.
        - Or, *probably best of all*, the game has some registered `GameEvent`s that are checked regularly to see if the player has made sufficient progress.
    - Register tasks centrally in the game to allow other components to interact with tasks.
        - Probably store tasks in another file though: `tasks.js`
    - When the player gets a new task, use the lookup `game.tasks` to find the one and add it to `player.tasks`.

- It should not be possible to start the game without choosing a username.
- Improve styling for `inspect` list items.
- List actions such as `take` if the item is movable.

- Status message from `inspect [object]` shouldn't be cleared.

- `player.activeItem` need to prevent the player from taking actions in the current room.
    - The question is where to put a check for this.
        - A possible candidate is `onInput`, wrapping the contents of the `if player.name` block. However, this might disable other commands so it has to be tested properly.

- Autocomplete not working for multiple words
    - "use photo " -> Press tab (autocomplete) -> "use photo photo frame"

- Refactor:
    - Add `Game.setVisibleSection()`
        - hide current visible section
        - set to new one
        - show new section

    - Add `Game.isVisible(gameSection)` to increase readability around the codebase.

- Improve help section
    - Make it possible to change help page by entering `[help page number]` and press enter.
    - Show "Help - Page 1/3" in title
    - This feels similar to how the user navigate in `read notes`, and allows us to reuse an already known pattern.
    - Also consider adding `n`, `p` and `next` and `prev` to navigate between pages, for those who want to navigate that way.
    - Show instructions in the status message - and in the placeholder.
        - Status: Enter a help page number to view it. Use `n` or `p` to view the next/previous page.
        - Placeholder: Press enter to return to the game.

    - When help is active, use a custom parser.
        - if input is a number that match a help page number - show it
        - if input is `n` or `p` or `next` or `prev`, show the next or previous help page. If at end and showing next, show start. If at start and going backwards, show end.
        - if input is blank, return to game (or main menu)
        - else show instructions

- Help section is not responsive.
    - It could shrink responsively to be about 2-300 px narrower on smaller screens, without causing major problems with the layout.
    - The white container div needs to shrink together with the help table though. Possibly make the white background take full width when help section is visible, and it's a small screen.

- Add `inspect [object]` command - "Take a moment to determine how you can interact with an object. Very useful if you don't know what to do."
    - Useful to help the player when they are stuck.
    - *Though, this situation should hopefully be avoided - by giving the players clear ideas of what to do, through tasks or through the room descriptions.*

- Remove 'destroy' action keyword. Add it back if needed in the future.

- Clarify "You can't drop message" for notes.

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
    - Add support for multiple notes.
    - State a date, but no year, to leave that up for interpretation by the player.
    - Should these be added to some kind of collection that remains with the player through the game?
        - In that case, don't add them to the inventory.
        - Also don't allow them to be dropped
        - Store them in `player.collection.notes` or just `player.notes`
            - Figure out a convenient way for the player to read them
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
