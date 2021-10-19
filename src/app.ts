// Importing the Liberys
import express from "express"
import "dotenv/config"

const PORT = 4000

const app = express()

app.get("/github", (req, res) => {
  // Redirect the user to asking for authorisation on github
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  )
})

app.get("/signin/callback", (req, res) => {
  // Axis code
  const { code } = req.query
  return res.json(code)
})

app.listen(PORT, () => {
  console.log(`hello, listen to port: ${PORT}`)
})
