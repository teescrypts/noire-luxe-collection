import jwt from "jsonwebtoken";

export interface JWTPayload {
  userId: string;
  email: string;
  role: "customer" | "admin";
}

export function verifyTokenEdge(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  } catch {
    return null;
  }
}
