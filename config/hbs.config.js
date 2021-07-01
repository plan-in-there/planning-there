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

hbs.registerHelper('planIsOwnedBy', function (options) {
    const {user, plan} = options.hash;
    if (user && (user.id === event.owner?.id || user.id === event.owner)) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
})

hbs.registerHelper('eventUserCategories', function (options) {
    const { event, user, category } = options.hash;
    if (event || user?.includes(category)) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})