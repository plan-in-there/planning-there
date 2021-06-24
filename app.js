const express = require('express')
const app = express()
const logger = require('morgan')
const path = require('path')


require('./config/db.config.js')
require('./config/hbs.config')










app.use((req, res, next) => {
  res.locals.path = req.path;
  next()
 
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


const router = require('./config/routes.config')
app.use('/', router)



const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Ready! Listening on port ${port}`);
});