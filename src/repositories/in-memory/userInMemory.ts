import { IUser } from "../../interface/user";
import { IUserRepository } from "../user/IUserRepository";

export class UserInMemory implements IUserRepository {
  public users: IUser[] = [];

  async findOneByGithub(id: number): Promise<IUser> {
    return await this.users.find((user) => user.github_id === id);
  }
  async findById(id: string): Promise<IUser> {
    return await this.users.find((user) => user.id === id);
  }

  async create(user: IUser): Promise<IUser> {
    await this.users.push(user);
    return user;
  }
}
