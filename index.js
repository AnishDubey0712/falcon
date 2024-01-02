const { faker } = require('@faker-js/faker'); // to generate fake user data
const mysql = require('mysql2');
const express = require("express");
const app= express();
const path = require("path");
const methodOverride=require("method-override"); // to override method
app.use(methodOverride("_method")); 
app.use(express.urlencoded({extended: true})); // to parse form data after using patch req
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


// let user= ["123","123_user","abc@gmail.com","abc1234"];
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'anishd##21'
});

let createRandomUser = ()=> {
  return [
     faker.string.uuid(),
     faker.internet.userName(),
     faker.internet.email(),
    //avatar: faker.image.avatar(),
     faker.internet.password(),
    // birthdate: faker.date.birthdate(),
    // registeredAt: faker.date.past(),
];
};

app.listen("8080",()=>{
  console.log("App is listening:8080");
});
app.get("/",(req,res)=>{
  let q=`SELECT count(*) from user`;
  try{
    connection.query(q,(err,result)=>{
        if(err) throw err;
        console.log(result[0]["count(*)"])
        let count = result[0]["count(*)"];
        res.render("home.ejs",{count});
    });
}catch(err){
    console.log(err);
    res.send("Some error in DB ")
};

});

app.get("/user",(req,res)=>{
  let q = `select * from user`;
  try{
    connection.query(q,(err,users)=>{
        if(err) throw err;
        //console.log(result)
       res.render("views.ejs",{users});
    });
}catch(err){
    console.log(err);
    res.send("Some error in DB ")
};
});

//edit user
app.get("/user/:id/edit",(req,res)=>{ 
  let { id }=req.params;
 let q =`select * from user where id='${id}'`;
 try{
  connection.query(q,(err,result)=>{
      if(err) throw err;
      let user = result[0];
      res.render("edit.ejs",{user});
  });
}catch(err){
  console.log(err);
  res.send("Some error in DB ")
};
});

//update route
app.patch("/user/:id",(req,res)=>{
//res.send("Updated")
let { id }=req.params;
let{password : formPass , userName : newUsername}=req.body;

 let q =`select * from user where id='${id}'`;
 try{
  connection.query(q,(err,result)=>{
      if(err) throw err;
      let user = result[0];
      if(formPass != user.password){
        res.send("Wrong Password");
      }
     else{
      let q2 = `UPDATE user SET username='${newUsername}'WHERE id='${id}'`;
      connection.query(q2,(err,result)=>{
        if(err) throw err;
        res.redirect("/user");
      })
     }
  });
}catch(err){
  console.log(err);
  res.send("Some error in DB ")
};
})
// changes made in database are permanent we cant change it.

// let q="INSERT into user (id,username,email,password)values ?";
// let data=[];
// for(let i=1;i<=100;i++){
//   data.push(createRandomUser());
// };
// try{
//     connection.query(q,[data],(err,result)=>{
//         if(err) throw err;
//         console.log(result);
        
//     });
// }catch(err){
//     console.log(err);
// };
//connection.end();

// let createRandomUser = ()=> {
//   return {
//     Id: faker.string.uuid(),
//     username: faker.internet.userName(),
//     email: faker.internet.email(),
//     //avatar: faker.image.avatar(),
//     password: faker.internet.password(),
//     // birthdate: faker.date.birthdate(),
//     // registeredAt: faker.date.past(),
//   };
// }
//console.log(createRandomUser());
