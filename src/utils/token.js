import jwt from "jsonwebtoken";

const sign = (payload) => {
  console.log("Sign Token", process.env.ACCESS_TOKEN_SECRET);
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const verify = (token) => {
  // console.log("Verify Token", process.env.ACCESS_TOKEN_SECRET);
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export { sign, verify };
