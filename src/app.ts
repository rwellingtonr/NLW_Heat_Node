// Importing the Liberys
import express from "express"
import "dotenv/config"
import { router } from "./routes"

const PORT = 4000
// Create app express
const app = express()
// Convert the data to Json
app.use(express.json())
app.use(router)

app.get("/github", (req, res) => {
  // Redirect the user to asking for authorisation on github
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  )
})

// app.get("/", (req, res) => {
//   res.json("hello")
// })

app.get("/signin/callback", (req, res) => {
  // Axis code
  const { code } = req.query
  return res.json(code)
})

app.listen(PORT, () => {
  console.log(`hello, listen to port: ${PORT}`)
})
