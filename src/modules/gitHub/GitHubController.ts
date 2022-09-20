import { Request, Response } from "express";

export function gitHubLogin(req: Request, res: Response) {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
}
export function singinCb(req: Request, res: Response) {
  const code = req.query["code"] as string;
  return res.json({ code });
}
