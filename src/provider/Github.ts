import axios from "axios";
import logger from "../utils/logger";
import { IGitHubProvider, IAccessTokenResponse, IUserResponse } from "./IGithubProvider";

export default class GithubProvider implements IGitHubProvider {
  async validateToken(code: string): Promise<string> {
    try {
      const urlAccessToken = "https://github.com/login/oauth/access_token";
      const { data } = await axios.post<IAccessTokenResponse>(urlAccessToken, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
      });
      return data.access_token;
    } catch (err) {
      logger.error(err);
      return;
    }
  }

  async getUser(token: string): Promise<IUserResponse> {
    const urlGetUserData = "https://api.github.com/user";
    const response = await axios.get<IUserResponse>(urlGetUserData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    // Check up whether or not the user had been created
    return response.data;
  }
}
