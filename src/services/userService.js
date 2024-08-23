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





module.exports = {
    createUserService
}