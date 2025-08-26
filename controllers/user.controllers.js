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
  const { username, email, password } = req.body;
  try {
    if (username !== "" && email !== "" && password !== "") {
      //email verification
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailTrimmed = email.trim();
      if (!emailRegex.test(emailTrimmed)) {
        return res.json({
          erMgs: "Please enter a valid email address.",
        });
      } else {
        //Password verification
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:'",.<>/?~`|])[A-Za-z\d!@#$%^&*()_+\-=[\]{};:'",.<>/?~`|]{8,}$/;
        const passwdVerify = passwordRegex.test(password);
        const inputRules =
          "<br>- At least one lowercase letter. <br>- At least one uppercase letter. <br> - At least one digit. <br> - At least one special character.  <br> - No periods! (.) <br>- No spaces  <br> - Minimum length of 8 characters.";
        if (passwdVerify) {
          res.json({
            redirMgs: true,
          });
        } else {
          res.json({
            paswdMgs: inputRules,
          });
        }
      }
    } else {
      res.json({
        erMgs: "fill in all fileds!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      erMgs: "Failed to submit user details",
    });
  }
};
