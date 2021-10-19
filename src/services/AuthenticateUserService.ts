import axios from "axios"

/*
 * Receive the code (string)
 * Recover the access_token on GitHub
 * check whether the user already exist on DB,
 *  TRUE = Generate the token
 *  FALSE = Create on DB and generate a new token
 * Return the token with the use's info
 */

class AuthenticateUserService {
  async execute(code: string) {
    // Get the access token
    const url = "https://github.com/login/oauth/access_token"
    const response = await axios.post(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    })
    return response.data
  }
}

export { AuthenticateUserService }
