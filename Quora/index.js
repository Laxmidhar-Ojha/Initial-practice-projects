const express=require("express");
const { appendFile } = require("fs");
const app=express();
const port=8080;
const path=require("path"); //requeiring path for foldeers like public and views
const { v4 : uuidv4} = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extend: true})); //to parse the data from post req
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views")); //so that we can access it from outside its folder

app.use(express.static(path.join(__dirname, "public"))); 

let posts=[
    {
        id: uuidv4(),
        username:"banty",
        content:"i love to code"
    },
    {
        id: uuidv4(),
        username:"smruti",
        content:"hi there"
    },
    {
        id: uuidv4(),
        username:"manty",
        content:"hi, i got my 1st placement!"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
   let{username,content}=req.body;
   let id = uuidv4();
   posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    let newcontent=req.body.content;
    post.content=newcontent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("app is listening");
});
