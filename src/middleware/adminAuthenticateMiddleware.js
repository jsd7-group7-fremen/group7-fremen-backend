import { verify } from "../utils/token.js";
import User from "../models/user.model.js";
import UnAuthorizeError from "../error/UnAuthorizeError.js";

const adminAuthenticateMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new UnAuthorizeError("Unauthenticated");
    const decoded = verify(token);
    const user = await User.findById(decoded.id);

    if (!user) throw new UnAuthorizeError("Unauthenticated");
    if (!user.isAdmin) throw new UnAuthorizeError("Unauthenticated");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default adminAuthenticateMiddleware;
