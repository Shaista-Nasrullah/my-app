import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";
import mongoose from "mongoose";
mongoose.set("debug", true);

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validation
    if (!name) {
      return res.send({ message: "Name us Required" });
    }
    if (!email) {
      return res.send({ message: "Email us Required" });
    }
    if (!password) {
      return res.send({ message: "Password us Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone Number us Required" });
    }
    if (!address) {
      return res.send({ message: "Address us Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer us Required" });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).send({
        success: false,
        message: "Invalid email or password",
        error,
      });
    }

    //Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    // Input validation
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New Password is required" });
    }

    // Check if user exists with the provided email and answer
    const user = await userModel.findOne({ email, answer });

    // If user is not found
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }

    // Hash the new password
    const hashed = await hashPassword(newPassword);

    // Update the user's password in the database
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    // Send success response
    return res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    // Handle any errors
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.send("Protected Route");
};

//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    // password validation
    if (password && password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while updating user profile",
      error,
    });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id }) // Filter orders by user ID
      .populate("products")
      .populate("buyer", "name");
    // Populate product details, excluding photo field

    res.json(orders);
    console.log(res);
  } catch (error) {
    console.error("Error fetching orders:", error); // Add detailed logging
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch orders", error });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({}) // Filter orders by user ID
      .populate("products")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    // Populate product details, excluding photo field

    res.json(orders);
    console.log(res);
  } catch (error) {
    console.error("Error fetching orders:", error); // Add detailed logging
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch orders", error });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updating order status",
      error,
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});

    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch users", error });
  }
};
