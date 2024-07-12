import { verify } from "../utils/token.js";
import User from "../models/user.model.js";
import UnAuthorizeError from "../error/UnAuthorizeError.js";

const authenticateMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    // console.log("Token => ", token);
    if (!token) throw new UnAuthorizeError("Unauthenticated");

    const decoded = verify(token);
    // console.log("decoded => ", decoded);
    const user = await User.findById(decoded.id);
    // console.log("user => ", user);
    if (!user) throw new UnAuthorizeError("Unauthenticated");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateMiddleware;
