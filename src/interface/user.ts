import { IMessage } from "./message";

export interface IUser {
  id?: string;
  name: string;
  github_id: number;
  avatar_url: string;
  login: string;
  message?: IMessage[];
}
