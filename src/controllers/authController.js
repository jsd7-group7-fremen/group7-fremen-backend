import { comparePassword, hashPassword } from "../utils/hash.js";
import User from "../models/user.model.js";
import { sign } from "../utils/token.js";
import { validateRegister } from "../utils/validate.js";
import BadRequestError from "../error/BadRequestError.js";

const register = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      password,
      image,
      isAdmin = false,
      createDate,
      userStatus = "active",
      gender,
      dateOfBirth,
    } = req.body;

    const { error } = await validateRegister({
      fullName,
      email,
      password,
      image,
      isAdmin,
      createDate,
      userStatus,
      gender,
      dateOfBirth,
    });
    if (error) {
      throw new BadRequestError(error.message);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.insertMany({
      fullName,
      email,
      password: hashedPassword,
      image,
      isAdmin,
      createDate,
      userStatus,
      gender,
      dateOfBirth,
    });

    res.status(200).json({
      message: "register success",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email: email });
    if (!existUser) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    const hashedPassword = existUser.password;
    const isMatch = await comparePassword(password, hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    const token = sign({ id: existUser.id, email: existUser.email });

    res.status(200).json({
      message: "login success",
      access_token: token,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  // console.log("req =>", req);
  res.send("GET /api/auth/profile");
};

const updateProfile = async (req, res, next) => {
  res.send("PATCH /api/auth/profile");
};

const deleteProfile = async (req, res, next) => {
  res.send("DELETE /api/auth/profile");
};

export { register, login, getProfile, updateProfile, deleteProfile };
