var commands = require('./src/commands');

module.exports = {
    displayname : 'Facts',
    description : 'Recites factoids in response to things people say in chat.',

    init : require('./src/schema'),
    web_init : require('./src/web'),

    commands : [{
            name : 'Learn Fact',
            description : 'Remember a factoid for given trigger.',
            usage : 'learn /trigger/ factoid',
            trigger : /learn/i,
            func : commands.learn
        }, {
            name : 'Say Fact',
            description : 'Force Fritbot to say a given factoid; useful for testing new facts before teaching them.',
            usage : 'say factoid',
            trigger : /say/i,
            func : commands.say
        }, {
            name : 'Explain Fact',
            description : 'Explains what fact Fritbot just recited.',
            usage : 'what was that',
            trigger : /what was that/i,
            func : commands.explain
        }, {
            name : 'Have Item or Learn Word',
            description : 'Teaches Fritbot a new word or item. Type must start with $, omit to give items.' +
                '\nExample: "have a cow" results in adding "a cow" to $item list, "have $color yellow" adds yellow to $color list. ',
            usage : 'have [$type] itemname',
            trigger : /have/i,
            func : commands.have
        }
    ],

    listeners : [{
        name : 'Fact Listener',
        description : 'Listens to all text for triggers',
        trigger : /.*/,
        func : commands.listener
    }]
};
