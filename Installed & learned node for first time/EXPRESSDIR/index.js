const express=require("express");
const app=express();
// const path=require("path");
// console.dir(app);
let port = 1005;

//app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

// app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"/views"));


app.get("/register",(req,res)=>{
    let{user,password}=req.query;
    res.send(`Standard GET Response. Welcome ${user}!`)
});
app.post("/register",(req,res)=>{
    let{user,password}=req.body;
     res.send(`Standard GET Response. Welcome ${user}!`)
    console.log(req.body)
})

// app.get("/",(req,res)=>{
//     res.render("home.ejs")
// });

app.listen(port,()=>{
    console.log(`App is listening ${port}`);
});
// app.use((req,res)=>{
//     console.log("request recieved")
//     res.send("this is basic response")
// });
// app.get("/",(req,res)=>{
//     res.send("Recieved for /r ")
// })
// app.get("/apple",(req,res)=>{
//     res.send("Recieved for apple ")
// })
// app.get("/anish",(req,res)=>{
//     res.send("Recieved for Anish ")
// })
// app.get("/ig/:username",(req,res)=>{
//     // const followers= ["Anish","Varun","Rahul","Suraj"]
//      let {username}=req.params;
//     const instadata=require("./data.json");
//     console.log(instadata);
//     const data = instadata[username]
//     res.render("home.ejs",{data});
// //    console.log(username);
// })