import { hashPassword } from "../utils/hash.js";

const register = async (req, res, next) => {
  res.send("POST /api/auth/register");
};

const login = async (req, res, next) => {
  res.send("POST /api/auth/login");
};

const getProfile = async (req, res, next) => {
  res.send("GET /api/auth/profile");
};

const updateProfile = async (req, res, next) => {
  res.send("PATCH /api/auth/profile");
};

const deleteProfile = async (req, res, next) => {
  res.send("DELETE /api/auth/profile");
};

export { register, login, getProfile, updateProfile, deleteProfile };
