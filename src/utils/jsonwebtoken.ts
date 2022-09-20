import "dotenv/config";
import jwt from "jsonwebtoken";

export function generateToken(id: string) {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    subject: id,
    expiresIn: "1h",
  });
  return token;
}

export function verifyToken(token: string) {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
}
