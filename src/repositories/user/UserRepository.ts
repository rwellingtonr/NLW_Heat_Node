import prismaClient from "../../../prisma";
import { IUser } from "../../interface/user";
import { IUserRepository } from "./IUserRepository";

export default class UserRepository implements IUserRepository {
  async findOneByGithub(id: number): Promise<IUser> {
    return await prismaClient.user.findFirst({ where: { github_id: id } });
  }
  async findById(id: string): Promise<IUser> {
    return await prismaClient.user.findFirst({
      where: { id },
    });
  }

  async create({ github_id, login, avatar_url, name }: IUser): Promise<IUser> {
    const user = await prismaClient.user.create({
      data: {
        github_id,
        login,
        avatar_url,
        name,
      },
    });
    return user;
  }
}
