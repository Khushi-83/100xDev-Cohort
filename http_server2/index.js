const express = require('express')
const app = express()
const port = 3000

app.get("/route-handler", function(req, res) {
    res.json({
        Name: "Khus",
        Age: 21
    })
  })

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})