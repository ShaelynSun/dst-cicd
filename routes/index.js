let express = require("express")
let router = express.Router()
let mongoose = require("mongoose")
require("./connect.js")
require("../models/usr")
const Usr = mongoose.model("Usr")


/* GET home page. */
router.get("/", function (req, res) {
    res.render("index", { title: "Dynamic Story Telling" })
})

router.get("/reg",function(req,res) {
    res.render("reg", {title: "register",})
})

router.get("/login",function(req,res){
    res.render("login",{title:"login",})
})

router.register_user = (req, res) =>{
    res.setHeader("Content-Type", "application/json")
    let user = new Usr({
        username:req.body.username,
        password:req.body.password
    })
    Usr.findOne({"username":user.username},function(err,data){
        if(data != null){
            res.json({ message: "the user has already existed", data: user} )
            // return res.redirect('/reg');
        }else{
            user.save(function(err){
                if(err){
                    res.json({ message: "User NOT Added!", errmsg : err } )
                    // return res.redirect('/');
                }else{
                    res.json({data: user.username, message: "Successful!"})
                    // res.redirect('/');
                }
            })
        }
    })
}

router.login_user = (req, res) => {
    res.setHeader("Content-Type", "application/json")
    Usr.findOne({"username":req.body.username},function(err,user){
        if(!user){
            res.json({ message: "the user is not existed"} )

        }
        else if(user.password != req.body.password){
            res.json({ message: "the password is wrong"} )
        }
        else {
            res.json({data: user.username, message: "login successfully"})
        }
    })
} 

module.exports = router
