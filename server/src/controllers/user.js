import { error, serverError, success } from "../utils/response.js";
import { getImagePath } from "../utils/functions.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userAwait = await User.findOne({ email });
    if (userAwait) return error(res, "Usuário já cadastrado.", 400);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await user.save();
    return success(res, user);
  } catch (error) {
    return serverError(res, error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne(
      { email },
      {
        name: 1,
        email: 1,
        password: 1,
        role: 1,
      }
    );
    if (!user) return error(res, "Usuário ou senha incorreta.", 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return error(res, "Usuário ou senha incorreta.", 400);

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET
    );
    user.password = undefined;

    user.avatar = getImagePath(user.avatar, "avatars");

    return success(res, "Usuário logado com sucesso", { user, token });
  } catch (error) {
    return serverError(res, error);
  }
};
