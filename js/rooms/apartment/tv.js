window.rooms.push({
    title: 'Watching TV',
    name: 'apartment.livingRoom.tv',
    connections: {
        'back': 'apartment.livingRoom.sofa'
    },
    description: `
        <p>The TV starts just in time for the late afternoon <i>news</i>.</p>
        <p>Go <b>back</b> to return to the sofa.</p>
    `,
    onEnter (room) {
        room.game.showCutscene('watch-news')
    }
})


/*
Watch TV

TODO:
- Player enter the room and watch tv.
- The news start just as the TV is turned on, making the player watch them before anything else.

The TV starts just in time for the news. You watch the intro and are just about to zap to another channel when you hear the final headline:

"And finally, tonight's in-depth story: [Y corp] unveils their plan to connect the world.
Earlier today, [Y corp], known for their popular suite of web services provided free of charge, revealed their latest project."

It was at their yearly tech conference [Y thou], that the [Y corp] CEO Isaac Belmont announced the new [X product]. Let's watch the announcement:

"Like many others, we aim to make the world a better place for all of humanity.
To make it happen, we realized the world needs to be connected in a smarter way than we are today.
The internet made it easy to share information, but ultimately divided us more than ever.

Since merely sharing information isn't enough, we developed the new [X product] to help people connect on a whole new level.

**The CEO raises his hand, showing a small chip.**
Here it is: a tiny computer that is implamted into the neck in seconds. It connects your brain directly to the internet, and to all the people around the world.
This not only gives instant, convenient access to information - it lets you really understand the people around you.

But this is not all. New technology is traditionally only available to some parts of the population.
That's why we will give the new [X product] away for free, to any person, anywhere on the planet. Oh, and we're starting today.

Come and join us at any of our launch events around world to learn more, and get your own device.
The first million people to get their implants will also get lifelong premium memberships to all other [Y corp] services.

Let's connect your future - and bring the world together!"

---

Back in the news studio, they continue by saying that
"[Y corp] claims that already more than 157,300 people have gotten chips implanted, in the first 8 hours after the announcement.
According to reports from major cities around the world, people are gathering in the streets and leaving their usual schedules to visit the [Y corp] events. The hype iz REEEEAL!"

"Let's get back to the studio, and hear what our expert panel has to say:"


- A panel discuss the news after the report:
    - People of the panel:
        - The news anchor, who has a hard time keeping up with the discussion, giving the hyped person way too much time to make fun of the expert.
        - One expert that is critical, asking good questions while pointing out important things.
        - Someone working with technology, who's clearly acting with exageregated enthusiasm and hyping the news and making fun of the expert.
    - Questions / Discussions:
        - Has this technology been tested thoroughly?
        - What about the company behind this? Why are they giving this away for free?
            - The expert points out that [Y corp] already owns massive amounts of user data.
                - This new product will take their data collection to a whole new level. Imagine having your personal thoughts sent out on the internet.
            - Hyper:
                - Stop being such a killjoy. Imagine
        - The expert is critical of the news report, because he believe they give way too much space for the hype.
            - It's important to stay neutral and encourage people critical, so they can make wise choices.
            - The Hyper only replies:
                - "Ahh... Here we go again Mr. Killjoy! A release like this has never happened at this scale before."
            - The expert replies: "And that's exactly we need to relax and stay rational."
            - The hyper is visibly mad and is getting increasingly agressive against the expert. So the news anchor has no choice but to say "Alright, I think end this here. Thank you both for joining us tonight!"


            - NOTE: Maybe hard to convey in a way that adds meaning / makes sense for the story:
                - When the camera fades out, you can hear in the background how the argument starts again, boiling over and ending with a fight.
                    - "Come on, this discussion is over! Stop fighting!"




Further story details:
Basically, [Y corp] arrange massive launch parties in all major cities across the globe.
Their new device literally takes the world by storm. It's everything that's in people's minds. Seemingly everyone want to get a device.
It's so widely spread that it just seems too good to be true - Someone must have been planning this launch for a long time.
Later on in the story, the player realize that [Y corp] started building hype for their
new unannounced project already months back, at the time when Kevin started his job.

The player realize:
"Somehow, I just missed it. Seems like they carefully selected their audience to direct all hype at...

I didn't see it coming until now, when it's spreading like crazy and probably already is too late to do something.
Now my friend is in danger - and even worse, this huge company is taking control of the brains of millions of people. In just a day...

How did this happen? How can everyone go crazy just like that? What am I missing?"


- Let the player make a choice
    - save your friend
    - save the world
    - save both






- Further ideas (text messages):
    - Immediately after the news show is over, the player gets a message on their phone.
    1. "Have you seen the news about [Y corp]!? I can't believe it's completely free!"
        - The player texts a response: "Hmm... It's free of charge, yes. But not really free."
        - The friend's reply: "No, it IS free! Come here and I'll show you how easy it is to get one!"
    2. And from another friend, sending a video showing the launch party outside of "Man, their launch party is crazy! Just look at everyone who's here! Are you coming tonight!?"
        - Whereby the player thinks: "What's happening? Are everyone going insane just like that? What am I missing?"

- Find information task (computer task):
    - Then, after the player has had an intense moment of despair, they realize something. They get an idea, and with that, a glimpse of hope:
    - At first, they pick up their phone and try calling the friend, who still doesn't respond.
        - TODO: Add detail that the player tries calling the friend somewhere earlier in the story (maybe after completing the first task, maybe when sitting down in the sofa)
            - The friend did not respond, but the player thought "Maybe he did X. He could be back at any time."

    - Then, the player realize that the friend's notes around the apartment were critical about this whole thing.
        - He did leave some notes around the apartment, but he must know more than that. I need to find out.
        - I haven't checked his computer yet.
        - Give task to check the computer to learn more about the project and other stuff.
            - Maybe just give the player the task to look around the apartment for more information.
                - Don't tell them to go to the computer - let them figure out that that's the next spot they need to go to.
            - To complete the task, they need to


- IDEA: [Y corp] thinks they are a good company, making the world a better place.
    - But they don't see how much harm their "good intentions" are causing.
        - Maybe they know about it but don't care because they have some kind of hidden agenda.
            - Connect the world, steal their data and take control over the minds of millions of people?
        - Or even worse, they believe their "good intentions" so completely that they've gone truly mad.



- Random idea:
    - Company name: [Y corp]
    - Company motto: "Why though?" - word play on "Y" and asking questions.



IDEA:
- Player might be able to watch other channels in the future as well.
- Not a priority though, as it doesn't add to the story.

IDEA: Channels:
    movie - watching it will make time pass.
    random tv show / documentary - watching it will make time pass.
    news - interesting for both story and Gameplay - give the player their next task.
*/
