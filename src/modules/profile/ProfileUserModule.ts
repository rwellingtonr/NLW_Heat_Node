import UserRepository from "../../repositories/user/UserRepository";
import { ProfileUserController } from "./ProfileUserController";
import { ProfileUserService } from "./ProfileUserService";

const service = new ProfileUserService(new UserRepository());

export default new ProfileUserController(service);
