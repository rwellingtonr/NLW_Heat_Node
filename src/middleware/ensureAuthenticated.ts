import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string
}

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
  try {
    // the verification will return a type equals as IPayload
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload
    req.user_id = sub
    // pass these values to other classes
    return next()
  } catch (error) {
    resp.status(401).json({ errorCode: "token;expired" })
  }
}
