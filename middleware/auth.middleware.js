const express = require("express");
const bcrypt = require("bcrypt");
const { userModel, logoutModel } = require("../model/user.model");
var jwt = require('jsonwebtoken');


const auth = async(req, res, next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    const blacklist = await logoutModel.findOne({ token });
    if(token){
        if(blacklist){
           res.send({msg: "Please Login again"})
           return
        }else{
            try{
                jwt.verify(token, 'masai', (err, decoded)=>{
                    if(decoded){
                        next()
                    }else{
                        res.send({msg:"token is not recognixed"})
                    }
                })
        
               }catch(err){
        res.json({msg: err.message})
               } 
        }
       
    }else{
        res.send({msg:"Please Login"})
    }
}

module.exports={
    auth
}