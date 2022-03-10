const express = require("express")
const route = require("./route")
const path = require('path')
const exp = require("constants")

const server = express()

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

server.use(express.static('public'))

server.use(express.urlencoded({extended: true}))

server.use(route)

server.listen(3000, () => console.log("RUNNING AT PORT 3000") )