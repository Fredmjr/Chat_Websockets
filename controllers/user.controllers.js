import userModel from "../models/user.model.js";
import express from "express";

//user registration
export const signupUrl = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await userModel.create({
      username: username,
      email: email,
      password: password,
    });
    if (newUser) {
      res.json({
        usrP: newUser.userport,
        ctrTime: newUser.createdAt,
        uptdTime: newUser.updatedAt,
      });

      console.log("user details: " + username, email, password);
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginUrl = async (req, res) => {
  res.render("components/login");
};

//All rerouting controllers involved by res.json({}) method!!!!
//simplicity and readbility is key

export const valUrl = async (req, res) => {
  res.send("valUrl");
};
