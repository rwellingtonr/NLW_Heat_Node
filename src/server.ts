import { serverHttp } from "./app"

const PORT = 4000

serverHttp.listen(PORT, () => {
  console.log(`hello, listen to port: ${PORT}`)
})
