import { comparePassword, hashPassword } from "../utils/hash.js";
import User from "../models/user.model.js";
import { sign } from "../utils/token.js";
import { validateRegister } from "../utils/validate.js";
import BadRequestError from "../error/BadRequestError.js";
import NotFoundError from "../error/NotFoundError.js";
import NoChangesError from "../error/NoChangesError.js";

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
  try {
    const { _id } = req.user;
    console.log(_id);
    // const { userId } = req.params;
    // console.log(userId);
    const user = await User.findById(_id);
    if (!user) {
      throw new NotFoundError(`User not found`);
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { fullName, email, image, gender, dateOfBirth } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id);

    if (!user) {
      throw new NotFoundError(`User not found`);
    }

    if (!fullName && !email && !image && !gender && !dateOfBirth) {
      throw new NoChangesError(`Not thing change`);
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (image) user.image = image;
    if (gender) user.gender = gender;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;

    await user.save();
    res.status(200).json({
      user,
      message: "updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const { _id, userStatus } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      throw new NotFoundError(`User not found`);
    }

    user.userStatus = "inactive";
    await user.save();

    console.log("userStatus => ", user);
    res.status(200).json({
      massage: "Delete complete",
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, getProfile, updateProfile, deleteProfile };
