const hbs = require('hbs');
const moment = require('moment')
const genre = require('../data/genre.json')
const categories = require('../data/categories.json');

hbs.registerPartials(__dirname + '/../views/partials')


hbs.registerHelper('eventHasCategory', function(options) {
    const {keyWord, key, event} = options.hash
    if (keyWord === 'category') {
        if (event?.category.includes(key)) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    } else if ( keyWord === 'genre') {
        if (event?.genreRestrictions.includes(key)) {
            console.log(key)
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    }  else if ( keyWord === 'dressList') {
        if (event?.dressCode.includes(key)) {
            console.log(key)
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    }      
})

hbs.registerHelper('planIsOwnedBy', function (options) {
    const {user, event} = options.hash;
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

hbs.registerHelper('dateFormatter', function (options) {
    const { date } = options.hash
    return  moment(date).format('YYYY-MM-DD')
})

hbs.registerHelper('dataLabels', function (options) {
    const { id, selector } = options.hash;
    return genre[id][selector];
})

hbs.registerHelper('pronoms', function (options) {
    const { user } = options.hash
    return genre[user.genre]?.pronom;
});

hbs.registerHelper('categoryLabel', function(options) {
    const { id, selector } = options.hash;
    return categories[id][selector];
});

hbs.registerHelper('interestIcon', function (options) {
    const { interest } = options.hash;
    return categories[interest]?.icon;
});

hbs.registerHelper('profileIsOwnedBy', function (options) {
    const {user, profile} = options.hash;
    if(user && profile && (user._id.toString() == profile._id.toString())) {
        return options.fn(this)
    } else {
        return options.inverse(this)
    }
})

hbs.registerHelper('dateFormatterList', function (options) {
    const { date } = options.hash
    return  moment(date).format('DD-MM-YYYY')
})

hbs.registerHelper('active', (options) => {
    const { path, match } = options.hash;
    return path === match ? 'active' : '';
  })

  hbs.registerHelper('dotted', (content, length) => {
    return content.length > length ? `${content.substring(0, length)}...` : content;
  })

  hbs.registerHelper('like', function (options) {
      const {matches, user} = options.hash

      if(matches.some(x => x.userId == user?.id)) {
        return options.inverse(this)
      } else {
        return options.fn(this)
      }
  })

  