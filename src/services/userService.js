require("dotenv").config();

const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const createUserService = async (name, email, password) => {
    try {

        //check if user already exist
        const user = await User.findOne({email: email});
        if (user) {
            console.log(`User ${name} already exists, duplicate email: ${email}`);
            return null;
        }

        //hash password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        
        // save to db
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role:"ThachDev",
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        //fet user by email
        const user = await User.findOne({email: email});
        if (user) {
            //compare password
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // create token
                const payload = {
                    email: user.email,
                    name: user.name
                }

                const access_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name
                    }

                };
            }else {
                return {
                EC: 2,
                EM: "Email or password is not correct!"
                }
            }
        }else {
            return {
                EC: 1,
                EM: "Email or password is not correct!"
            }
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserService = async () => {
    try {
        let result = await User.find({}).select("-password");
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService, loginService, getUserService
}