import "dotenv/config";
import { describe, it, expect } from "vitest";
import { generateToken, verifyToken } from "./jsonwebtoken";
import logger from "./logger";

describe("JWT", () => {
  it("should generate a token", () => {
    const token = generateToken("someID");
    expect(typeof token).toBe("string");
  });

  it("should decrypt", () => {
    const token = generateToken("MyTokenID");
    const payload = verifyToken(token);
    logger.debug(payload.userId);
    expect(typeof payload).toBe("object");
    expect(payload.userId).toBe("MyTokenID");
  });
});
