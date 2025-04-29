import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface AuthRequest extends Request {
  userId?: string;
}
const authUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token Invalid!");
    }

    const isTokenValid = jwt.verify(
      token,
      process.env.JWT_USER_SECRET as string
    );

    if (typeof isTokenValid === "object" && isTokenValid !== null) {
      const decodedId = isTokenValid.id;
      req.userId = decodedId;
      next();
    }
  } catch (error) {
    throw new Error("Token Invalid");
  }
};

export default authUser;
