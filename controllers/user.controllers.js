import { Op } from "sequelize";
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

//Register or siginup user
export const registrationUrl = async (req, res) => {
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
          const newUser = await userModel.create({
            username: username,
            email: email,
            password: password,
          });
          if (newUser) {
            res.json({
              crtAccount: true,
              usr: newUser.username,
              usrP: newUser.userport,
              ctrTime: newUser.createdAt,
              uptdTime: newUser.updatedAt,
            });

            console.log("user details: " + username, email, password);
          }
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

//Valification for login
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

//Decoded cookie
export const ctokenUrl = async (req, res) => {
  const { ctoken } = req.body;
  try {
    if (ctoken) {
      //decode token from cookie & send back decode details
      res.json({
        dtoken: true,
        username: ctoken,
      });
      console.log(ctoken);
    } else {
      res.json({
        erMgs: "Failed to load user account, Please login or reload page!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      erMgs: "Server failed to load user account, Please login or reload page!",
    });
  }
};

//All rerouting controllers involved by res.json({}) method!!!!
//simplicity and readbility is key
//LOGIN PAGE
export const loginUrl = async (req, res) => {
  res.render("components/login");
};

//SIGUP PAGE
export const signupgUrl = async (req, res) => {
  res.render("components/signup");
};

//search account or user
export const qryusrUrl = async (req, res) => {
  const { srchVal } = req.body;
  try {
    if (srchVal !== "") {
      const usrs = await userModel.findAll({
        where: {
          username: {
            [Op.startsWith]: `%${srchVal}`,
          },
        },
      });

      if (usrs) {
        res.send(usrs.username);
      } else if (!usrs) {
        res.send("No user found!");
      }
    } else if (srchVal === "") {
      res.send("empty field");
    }
  } catch (error) {
    console.log(error);
    res.send(
      "Server failed to validate your search!, Please login or reload page!"
    );
  }
};

export const srchpgUrl = async (req, res) => {
  res.render("components/search");
};

/* export const qryusrUrl = async (req, res) => {
  const { srchVal } = req.body;
  console.log(srchVal);
  try {
    if (srchVal === "") {
      res.json({
        erMgs: "Search field is empty!",
      });
    } else if (srchVal !== "") {
      res.render("components/search");
    } else {
      res.json({
        erMgsEls:
          "Failed to validate your search, Please login or reload page!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      erMgsSrvr:
        "Server failed to validate your search!, Please login or reload page!",
    });
  }
};
 */
