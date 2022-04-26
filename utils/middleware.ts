import * as jwt from "jsonwebtoken";
import { Users } from "../libs/models/user";

export const loginRequired = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const auth = authHeader && authHeader.split(" ");
  if (auth[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid Token Type" });
  }
  jwt.verify(auth[1], process.env.JWT_KEY as string, async (error, user) => {
    if (error) return res.status(401).json({ message: "Unauthorized" });
    try {
      const userData = await Users.findById(user._id).select("-password");
      if (!userData) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = userData;
      next();
    } catch (error) {
      next(error);
    }
  });
};
