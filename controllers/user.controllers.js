import { Op } from "sequelize";
import userModel from "../models/user.model.js";
import express from "express";

//Auto login
export const autlgUrl = async (req, res) => {
  const { ckie } = req.body;
  try {
    if (ckie === null || !ckie) {
      res.render("components/login");
    }
  } catch (error) {
    console.log(error);
    console.log("Auto login failed error!");
  }
};

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
          const ifexists = await userModel.findOne({
            where: {
              email: email,
            },
          });
          if (ifexists) {
            res.json({
              erMgs: "User with provided credentials exists!",
            });
          } else {
            const newUser = await userModel.create({
              username: username,
              email: email,
              password: password,
            });
            if (newUser) {
              res.json({
                crtAccount: true,
                redir: true,
                usr: newUser.username,
                usrP: newUser.userport,
                ctrTime: newUser.createdAt,
                uptdTime: newUser.updatedAt,
              });

              console.log("user details: " + username, email, password);
            }
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
        const emlrslt = await userModel.findOne({
          where: {
            email: email,
          },
        });
        if (!emlrslt) {
          return res.json({
            erMgs: "No user with such credentials, Please signup!",
          });
        } else {
          //Password verification
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:'",.<>/?~`|])[A-Za-z\d!@#$%^&*()_+\-=[\]{};:'",.<>/?~`|]{8,}$/;
          const passwdVerify = passwordRegex.test(password);
          const inputRules =
            "At least one lowercase letter, One uppercase letter, One digit, One special character, No periods! (.),No spaces, length of 8 characters.";
          /*  "<br>- At least one lowercase letter. <br>- At least one uppercase letter. <br> - At least one digit. <br> - At least one special character.  <br> - No periods! (.) <br>- No spaces  <br> - Minimum length of 8 characters."; */
          if (passwdVerify) {
            console.log(email, password);
            const chkdemail = await userModel.findOne({
              where: {
                email: email,
              },
            });
            if (chkdemail) {
              const chkdpwd = await userModel.findOne({
                where: {
                  email: email,
                  password: password,
                },
              });

              if (chkdpwd) {
                //send token instead here for login then of send email and port in production
                //here token
                //here token
                //here token
                res.json({
                  ifRedir: true,
                  usr: chkdpwd.username,
                  usrP: chkdpwd.userport,
                });

                console.log(chkdpwd.password);
              } else {
                res.json({
                  erMgs: "Incorrect password!",
                });
              }
            }
          } else {
            res.json({
              paswdMgs: inputRules,
            });
          }
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
        const users = usrs.map((user) => {
          return {
            username: user.dataValues?.username,
            userport: user.dataValues?.userport,
          };
        });
        if (Array.isArray(users) && users.length === 0) {
          return res.json({
            erMgs: "No user found!",
          });
        } else {
          console.log(users);
          return res.send(users);
        }
      }
    } else if (srchVal === "") {
      return res.json({
        erMgs: "Empty search field!",
      });
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

//Query user for chat page
export const qrysrchusrUrl = async (req, res) => {
  const port = req.params.userport;
  try {
    if (port) {
      const usr = await userModel.findOne({
        where: {
          userport: port,
        },
      });

      if (usr) {
        res.json({
          acunt: true,
          nm: usr.username,
          eml: usr.email,
        });
        console.log(usr.username + usr.email);
      }
    } else {
      res.send("Unable to connect with user!");
    }
  } catch (error) {
    console.log(error);
    res.send(
      "Server failed to validate your search!, Please login or reload page!"
    );
  }
};

//Chat page
export const srchusrchtUrl = async (req, res) => {
  try {
    res.render("components/chatpage");
  } catch (error) {
    console.log(error);
    res.send(
      "Server failed to validate your search!, Please login or reload page!"
    );
  }
};

//
export const mgsprtUrl = async (req, res) => {
  const { chtprt, chtmgs, chtlgr } = req.body;
  try {
    if ((chtprt, chtmgs, chtlgr)) {
      //add code to write user port and user message to db here!!!!!!!!!
      //write to db userport & usermgs
      //write to db userport & usermgs
      //write to db userport & usermgs
      //write to db userport & usermgs
      //write to db userport & usermgs
      //write to db userport & usermgs
      //write to db userport & usermgs
      //write to db userport & usermgs
      //write to db userport & usermgs
      //write to db userport & usermgs
      //write to db userport & usermgs
      //write to db userport & usermgs
      res.send(
        `wrote to db usrprt: ${chtprt} & usrmgs: ${chtmgs} & usrloger: ${chtlgr}`
      );
    } else if (!chtmgs) {
      res.send("message is empt!");
    }
  } catch (error) {
    console.log(error);
    res.send("Unable to send message!, Please login or reload page!");
  }
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

//Delete user from db
// For devs only remove or comment out this url & controller
export const dtlusrUrl = async (req, res) => {
  const prt = req.params.prt;

  try {
    if (prt) {
      const rsltsprt = await userModel.findByPk(prt);
      if (rsltsprt) {
        const rsltdtl = await rsltsprt.destroy();
        if (rsltdtl) {
          res.send("account deleted!");
        } else {
          res.send("Unable to delete account!");
        }
      } else {
        res.send("No account with such credentials!");
      }
    } else {
      res.send("failed to delete user account!");
    }
  } catch (error) {
    console.log(error);
  }
};
