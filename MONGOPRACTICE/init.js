const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main()
.then(()=>{
    console.log("connection succesfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

let allChats = [
    {
    from:"banty",
    to:"smruti",
    msg:"love you",
    created_at: new Date()
    },
    {
        from:"smruti",
        to:"banty",
        msg:"I hate you",
        created_at: new Date()
    },
    {
        from:"banty",
        to:"smruti",
        msg:"But why",
        created_at: new Date()
    },
    {
        from:"smruti",
        to:"banty",
        msg:"I don't know",
        created_at: new Date()
    },
    {
        from:"banty",
        to:"smruti",
        msg:"Okay",
        created_at: new Date()
    },
    {
        from:"banty",
        to:"smruti",
        msg:"I love you",
        created_at: new Date()
    }
];

Chat.insertMany(allChats);