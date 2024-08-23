const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
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
                return "create an access token";
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
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}



module.exports = {
    createUserService, loginService,
}