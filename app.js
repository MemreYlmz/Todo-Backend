const express = require('express')
const app = express()

app.get('/todos', function (req, res) {
  res.send([{todo:"Fuck my ass" , id:1},{todo:"Fuck your ass" , id:2}])
})

app.listen(3000)