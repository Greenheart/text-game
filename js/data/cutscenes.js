window.cutscenes = [{
    id: 'watch-news',
    scenes: [{
        title: 'The TV starts',
        text: `<p>The TV starts just in time for the news. You watch the intro and are just about to zap to another channel when you hear the final headline...</p>`
    }, {
        title: 'Watching the News',
        text: `<i><p>"And finally, tonight's in-depth story: [Y corp] unveils their plan to connect the world.</p>
        <p>Earlier today, [Y corp], known for their popular suite of web services provided free of charge, revealed their latest project.</p>
        <p>It was at their yearly tech conference [Y thou], that the [Y corp] CEO Isaac Belmont announced the new [X product]. Let's watch the announcement..."</p></i>`
    }, {
        text: `<i><p>"Like many others, we aim to make the world a better place for all of humanity.
        To make it happen, we realized the world needs to be connected in a smarter way than we are today.</p>

        <p>The internet made it easy to share information, but ultimately divided us more than ever.
        Since merely sharing information isn't enough, we developed the new [X product] to help people connect on a whole new level.</p></i>
        <p>The CEO raises his hand, showing a small chip.</p>

        <i><p>Here it is: a tiny computer that is implanted into the neck in seconds. It connects your brain directly to the internet, and to all the people around the world.</p>
        <p>This not only gives instant, convenient access to information - it lets you really understand the people around you.<p></i>`
    }, {
        text: `<i><p>But this is not all. New technology is traditionally only available to some parts of the population.
        That's why we will give the new [X product] away for free, to any person, anywhere on the planet. Oh, and we're starting today!</p>

        <p>Come and join us at any of our launch events around world to learn more, and get your own device.
        The first million people to get theirs will also get lifelong premium memberships to all other [Y corp] services.</p>

        <p>Let's connect your future - and bring the world together!"</p></i>`
    }, {
        title: 'Back in the news studio',
        text: `<p>As the show returns to the news studio, you start thinking...</p>

        <i><p>Wow... So this is what they've been so secretive about.</p>
        <p>This device has clearly done something to my friend.</p></i>

        <p>There's an expert panel gathered in the studio, discussing the announcement. Maybe they know more.</p>`,
        question: {
            text: '<p><i>Hmm... Do I want to keep watching the news panel discussion?</i></p>',
            answers: {
                yes (cutscene) {
                    // IDEA: Add some secret or detail that is important for the later stages of gameplay.
                    // Perhaps something that the player needs to find if they want an ending where they save the world from [Y corp].
                    cutscene.nextScene()
                },
                no (cutscene) {
                    // IDEA: Prevent player from ever watching the news or the panel discussion again. This applies to both of these alternatives.
                    cutscene.end()
                }
            }
        }
    }, {
        title: 'Watching the panel discussion',
        text: `<i><p>"[Y corp] claims that already more than 157 000 people have gotten chips implanted, in the first 8 hours after the announcement.</p>
        <p>According to reports from major cities around the world, people are gathering in the streets and leaving their usual schedules to visit the [Y corp] events."</p></i>`
    }]
}]


/*

IDEA: Possibly add something about how well the device been tested to th eexpert panel discussion. One is critical but the others have good faith in [Y corp] (since they are paid to promote the product).

NOTE: Let's connect YOUR future - or OUR future?



*/
