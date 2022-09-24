import { describe, beforeAll, it, expect } from "vitest";
import { IUser } from "../../interface/user";
import { ProfileUserService } from "./ProfileUserService";
import { UserInMemory } from "../../repositories/in-memory/userInMemory";

describe("ProfileUserService", () => {
  let repository: UserInMemory;
  let service: ProfileUserService;
  let user: IUser;
  beforeAll(() => {
    user = {
      avatar_url: "anyOne",
      github_id: Date.now(),
      login: "anyOne",
      name: "anyName",
      id: "myId",
    };
    repository = new UserInMemory();
    service = new ProfileUserService(repository);
  });

  it("Should find a user by id", async () => {
    repository.create(user);
    const res = await service.execute(user.id as string);
    expect(res).toBe(user);
  });
  it("Should throw an error", async () => {
    const res = await service.execute("kkkk");
    expect(res).toBe(undefined);
  });
});
