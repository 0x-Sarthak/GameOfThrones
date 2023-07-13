const express = require("express");
const bcrypt = require("bcrypt");
const { userModel, logoutModel, postModel } = require("../model/user.model");

var jwt = require('jsonwebtoken');
const { auth } = require("../middleware/auth.middleware");

const contentRouter = express.Router();

contentRouter.get('/',auth, async(req, res)=>{
 try{
    if(req.body.firstName){
        const data = await postModel.find({firstName:req.body.firstName})
        res.send(data)
    }else{
        const data = await postModel.find()
        res.send(data)
    }
   
 }catch(err){
    res.status(400).send(err.message)
 }
})


contentRouter.post('/',auth, async(req, res)=>{

    const {firstName, lastName, department, salary}= req.body
    try{
        const post = postModel({firstName, lastName, department, salary})
        await post.save();
        res.status(200).send(req.body)
    }catch(err){
        res.send({err: err.message})
    }
})





    
contentRouter.patch('/edit/:postID',auth, async(req, res)=>{
    const {postID} = req.params
    
    try{
        const post= await postModel.findOne({_id:postID})
     await postModel.findByIdAndUpdate({_id: postID}, req.body)
            res.send({msg:"Post has been updated", post:req.body})
    }catch(error){
        res.status(400).send({error:error.message, heree:"error"})
    }
    
})










    contentRouter.delete('/delete/:postID',auth, async(req, res)=>{

        const {postID} = req.params
        
        try{
            const post= await postModel.findOne({_id:postID})
                await postModel.findByIdAndDelete({_id: postID})
                res.send({msg:"post has been deleted"})
        }catch(error){
            res.status(400).send({error:error.message, heree:"asfds"})
        }
    })

module.exports={
    contentRouter
}