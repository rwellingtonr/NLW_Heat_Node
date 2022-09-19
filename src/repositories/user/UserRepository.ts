import prismaClient from "../../../prisma";
import { IUser } from "../../interface/user";
import { IUserRepository } from "./IUserRepository";

export default class UserRepository implements IUserRepository {
  async findOne(id: number): Promise<IUser> {
    return await prismaClient.user.findFirst({ where: { github_id: id } });
  }
}
