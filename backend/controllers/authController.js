import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ email, password, role });
  res.json({
    _id: user._id,
    email: user.email,
    role: user.role,
    token: generateToken(user._id)
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
