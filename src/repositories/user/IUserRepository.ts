import { IUser } from "../../interface/user";

export interface IUserRepository {
  findOneByGithub(id: number): Promise<IUser>;
  findById(id: string): Promise<IUser>;
  create(user: IUser): Promise<IUser>;
}
