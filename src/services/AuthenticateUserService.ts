import axios from "axios"
import prismaClient from "../../prisma"
/*
 * Receive the code (string) (done)
 * Recover the access_token on GitHub (done)
 * Recover user's info on GitHub (done)
 * check whether the user already exist on DB, (done)
 *  TRUE = Generate the token (done)
 *  FALSE = Create on DB and generate a new token (done)
 * Return the token with the use's info
 */

interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  avatar_url: string
  login: string
  id: number
  name: string
}

class AuthenticateUserService {
  async execute(code: string) {
    // Get the access token
    const urlAccessToken = "https://github.com/login/oauth/access_token"
    const urlGetUserData = "https://api.github.com/user"
    // in the axiso token you might define which data it should've in the return
    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(urlAccessToken, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      })
    // Get the user's data on GitHub
    // The header should allow the authorization token's type
    // Between the <> you should pass the data's type you'd like to get
    const response = await axios.get<IUserResponse>(urlGetUserData, {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      },
    })

    // Check up whether or not the user had been created
    const { login, id, name, avatar_url } = response.data
    // compare the GitHub id with the ID
    let user = await prismaClient.user.findFirst({ where: { github_id: id } })
    // If the user doesn't exist yet, then I'll create this one
    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      })
    }

    return response.data
  }
}

export { AuthenticateUserService }
