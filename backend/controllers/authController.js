const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};