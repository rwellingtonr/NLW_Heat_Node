export interface IAccessTokenResponse {
  access_token: string;
}
export interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

export interface IGitHubProvider {
  validateToken(code: string): Promise<string>;
  getUser(token: string): Promise<IUserResponse>;
}
