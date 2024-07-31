const express= require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride= require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
.then(()=>{
    console.log("connection succesfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

// let chat1=new Chat({
//     from:"banty",
//     to:"smruti",
//     msg:"I love you",
//     created_at: new Date()
// });
// chat1.save().then((res)=>{
//     console.log(res);
// });

app.get("/",(req,res)=>{
    res.send("connectin established")
});

//index route
app.get("/chats",async (req,res)=>{
    let chats= await Chat.find();
    res.render("index.ejs",{chats});
});

//new msg create 
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//save route
app.post("/chats",(req,res)=>{
    let {from,msg,to}=req.body;
    let newChat= new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at: new Date()
    });
    newChat.save().then((res)=>{console.log(res);}).catch((err)=>{console.log(err);});
    console.log(newChat);
    res.redirect("/chats");
});
//edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//update route
app.put("/chats/:id",async (req,res)=>{
   let {id}=req.params;
   let{msg:newMsg}=req.body;
   let updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    console.log(updatedChat);
    res.redirect("/chats");
});
//destroy route
app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    res.redirect("/chats")
    console.log(deletedChat);
});

app.listen(8080,()=>{
    console.log("app is listening")
});