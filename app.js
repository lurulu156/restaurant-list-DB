const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
const methodOverride = require('method-override')
const session = require('express-session')

require('./config/mongoose')

//set up handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)

//set listen port
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})