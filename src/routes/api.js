const express = require('express');
const { createUser, handleLogin, getUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

const routerAPI = express.Router();

// const { getUsersAPI, postCreateUserAPI,
//     putUpdateUserAPI, deleteUserAPI

// } = require('../controllers/apiController')


// routerAPI.get('/users', getUsersAPI);
// routerAPI.post('/users', postCreateUserAPI);
// routerAPI.put('/users', putUpdateUserAPI);
// routerAPI.delete('/users', deleteUserAPI);

routerAPI.all('*', auth)

routerAPI.get('/', (req, res) => {
    return res.status(200).json("Hello world")
})

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

routerAPI.get("/user", getUser);

module.exports = routerAPI; //export default