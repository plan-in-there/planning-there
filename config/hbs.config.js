const hbs = require('hbs');

hbs.registerPartials(__dirname + '/../views/partials')

hbs.registerHelper('eventHasCategory', function(options) {
    const {category, event} = options.hash
    if (event?.category.includes(category)) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})