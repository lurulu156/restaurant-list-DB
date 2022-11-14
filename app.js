const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// 引用路由器
const routes = require('./routes')

require('./config/mongoose')

//set up handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

//set listen port
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})