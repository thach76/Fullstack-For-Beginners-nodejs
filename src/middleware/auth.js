const jwt = require('jsonwebtoken'); 
// const express = require('express');

//Tất cả api cần phải gửi kèm access token ở header, ngoại trừ login/register
const auth = (req, res, next) => {
    const white_list = ["/", "/register", "/login"]
    console.log(">>> call auth" )
    // not in white_list
    if (white_list.find(item => '/v1/api/' + item === req.originalUrl)) {
        console.log(">>> white_list")
        next()
    } else {
        console.log(">>> req" + req.headers['authorization'])
        const authHeader = req.headers['authorization'];

        if (authHeader && authHeader.split(' ')[1]){
            // const token = req.headers.Authorization.split(' ')[1] 
            const token = authHeader.split(' ')[1];
            // verify token
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                console.log(">>> check token: " + decoded)
                req.user = decoded; // Lưu thông tin đã giải mã từ token vào req.user
                next()
            } catch (error) {
                return res.status(401).json({message: "Token bị hết hạn/hoặc không hợp lệ" })
            }
        }
        else {
            return res.status(401).json({message: "Bạn chưa truyền Access Token ở header/ hoặc Token bị hết hạn" })
        }
    }
}

module.exports = auth;