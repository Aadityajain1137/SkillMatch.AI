const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");
async function registerUser(req, res) {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({
    message: "Provide username ,email and password",
});
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res
      .status(400)
      .json({ message: "Account already exists with email or username" });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
  });
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid paswword or email.",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "user loogedin successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.token;
  if (token) {
    await tokenBlacklistModel.create({ token });
  }

  res.clearCookie("token");
  res.status(200).json({
    message: "User logout successfully",
  });
}

async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
module.exports = { registerUser, loginUser, logoutUser, getMe };
