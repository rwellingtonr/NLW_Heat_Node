import { IUserRepository } from "../../repositories/user/IUserRepository";

export class ProfileUserService {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(userId: string) {
    const user = this.userRepository.findById(userId);

    return user;
  }
}
