const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes/index')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/products', router)


app.listen(PORT, () => {
  console.log(`Currently listening to PORT ${PORT}` )
})
