import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const user = req.body;
    const userExist = await userModel.findOne({
      email: user.email,
    });
    if (userExist) {
      return res.status(300).json({
        message: "user already exist",
      });
    }

    const hashPassword = await bcrypt.hash(user.password, 5);

    const response = await userModel.create({
      email: user.email,
      password: hashPassword,
      name: user.name,
    });

    const token = jwt.sign(
      {
        userId: response._id,
      },
      process.env.JWT_SECRET
    );

    res.json({ message: "signup Success", token: token });
  } catch (err) {
    console.log(err);
    res.json({
      error: err,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;

    const userFind = await userModel.findOne({
      email: user.email,
    });

    if (!userFind) {
      return res.status(403).json({
        message: "Invalid credentials",
      });
    }
    console.log(user.password, userFind.password);
    const passMatch = await bcrypt.compare(user.password, userFind.password);

    if (!passMatch) {
      return res.status(403).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        userId: userFind._id,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      message: "Login success",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

export { signup, login };
