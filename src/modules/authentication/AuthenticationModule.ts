import GithubProvider from "../../provider/Github";
import UserRepository from "../../repositories/user/UserRepository";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserService } from "./AuthenticateUserService";

const userRepository = new UserRepository();
const githubProvider = new GithubProvider();
const service = new AuthenticateUserService(userRepository, githubProvider);
const authenticateUserController = new AuthenticateUserController(service);
export default authenticateUserController;
