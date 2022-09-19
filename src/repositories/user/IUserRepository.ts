import { IUser } from "../../interface/user";

export interface IUserRepository {
  findOne(id: number): Promise<IUser>;
}
