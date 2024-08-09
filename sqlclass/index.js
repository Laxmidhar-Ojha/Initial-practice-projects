const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require ("express");
const app= express();
port = 8080;
const path= require("path");
const methodOverride= require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'banty@1234'
  }); 

  let getRandomUser = () => {
      return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
      ];
    };

 app.get("/", (req,res)=>{
    let q=`SELECT COUNT(*) FROM user`;
     try{
        connection.query(q, (err,result) =>{
            if(err) throw err;
            let count =result[0]["COUNT(*)"];
            res.render("home.ejs",{count});
          });
     }catch(err){
        console.log(err);
        res.send("error ind db");
     };
 });

 //show route
 app.get("/user",(req,res)=>{
    let q =`SELECT * FROM user`;
    try{
        connection.query(q, (err,users) =>{
            if(err) throw err;
           res.render("showusers.ejs",{users});
          });
     }catch(err){
        console.log(err);
        res.send("error ind db");
     };
 });

 //edit route
 app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
        connection.query(q, (err,result) =>{
            if(err) throw err;
            let user=result[0];
           res.render("edit.ejs",{user});
          });
     }catch(err){
        console.log(err);
        res.send("error ind db");
     }
 });
 
 //update route
 app.patch("/user/:id",(req,res)=>{
    let {id}=req.params;
    let {password:formPass,username:newUsername}=req.body;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
        connection.query(q, (err,result) =>{
            if(err) throw err;
            let user=result[0];
            if(formPass!=user.password){
                res.send("WRONG PASSWORD");
            }else {
                let q2=`UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
                connection.query(q2,(err,result)=>{
                    if(err) throw err;
                    res.redirect("/user");
                });
            }
          });
     }catch(err){
        console.log(err);
        res.send("error ind db");
     }
 });

 app.listen("8080", ()=>{
    console.log("app is listening to port 8080");
 });

