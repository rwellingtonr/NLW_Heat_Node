import { IUserRepository } from "../../repositories/user/IUserRepository";
import { IGitHubProvider } from "../../provider/IGithubProvider";
import { generateToken } from "../../utils/jsonwebtoken";
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
    // in the axios token you might define which data it should've in the return
    const accessToken = await this.githubProvider.validateToken(code);
    // Get the user's data on GitHub
    const { login, id, name, avatar_url } = await this.githubProvider.getUser(accessToken);
    // compare the GitHub id with the ID
    let user = await this.userRepository.findOneByGithub(id);
    // If the user doesn't exist yet, then I'll create this one
    if (!user) {
      user = await this.userRepository.create({
        github_id: id,
        login,
        avatar_url,
        name,
      });
    }
    // Authentication token
    const token = generateToken(user.id);

    return { token, user };
  }
}
