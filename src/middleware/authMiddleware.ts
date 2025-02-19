import { Request, Response, NextFunction } from "express";

const API_SECRET_TOKEN = process.env.API_TOKEN;

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token after "Bearer"

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  if (token !== API_SECRET_TOKEN) {
    res.status(403).json({ message: "Forbidden: Invalid token" });
    return;
  }

  next(); // Proceed if token is valid
};
