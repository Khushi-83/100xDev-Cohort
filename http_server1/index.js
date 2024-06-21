const express = require('express')
const app = express()
const port = 3000

app.get("/router_handler", (req, res) => {
  res.send('Hello Kus to the world of Express!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
