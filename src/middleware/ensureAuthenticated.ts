import { Request, Response, NextFunction } from "express"

// It must check if the user is authenticated
export default function ensureAuthenticated(
  req: Request,
  resp: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization
  if (!authToken) {
    return resp.status(401).json({
      errorCode: "token.invalid",
    })
  }

  /*
   * Bearer token (a4d64asd4a4f56asf8sd)
   * Fist posistion: bearer
   * Second position: token value
   */
  const [, token] = authToken.split(" ")
}
