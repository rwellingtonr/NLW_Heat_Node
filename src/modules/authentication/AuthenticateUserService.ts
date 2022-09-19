import axios from "axios";
import prismaClient from "../../../prisma";
import { sign } from "jsonwebtoken";
import { IUserRepository } from "../../repositories/user/IUserRepository";
import { IGitHubProvider } from "../../provider/IGithubProvider";
/*
 * Receive the code (string) (done)
 * Recover the access_token on GitHub (done)
 * Recover user's info on GitHub (done)
 * check whether the user already exist on DB, (done)
 *  TRUE = Generate the token (done)
 *  FALSE = Create on DB and generate a new token (done)
 * Return the token with the use's info
 */
export class AuthenticateUserService {
  constructor(private userRepository: IUserRepository, private githubProvider: IGitHubProvider) {}
  async execute(code: string) {
    // Get the access token
    // in the axiso token you might define which data it should've in the return
    const accessToken = await this.githubProvider.validateToken(code);
    // Get the user's data on GitHub
    const { login, id, name, avatar_url } = await this.githubProvider.getUser(accessToken);
    // compare the GitHub id with the ID
    await this.userRepository.findOne(id);
    let user = await prismaClient.user.findFirst({ where: { github_id: id } });
    // If the user doesn't exist yet, then I'll create this one
    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }

    // Authentication token
    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      { subject: user.id, expiresIn: "1d" }
    );

    return { token, user };
  }
}
