const mongoose = require('mongoose');

main().catch(err => console.log(err));

main()
.then(()=>{
    console.log("Connected")
})
.catch((err)=>{
    console.log(err)
})
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
const userSchema= new mongoose.Schema({
 name: String,
 email: String,
 age : Number,
});
const User=mongoose.model("User",userSchema);
const user1=new User ({name:"Adam",email:"adam12@gmail.com",age:48});
User.insertMany([{name:"Tony",email:"tony12@gmail.com",age:46},
{name:"David",email:"david12@gmail.com",age:40}])
.then((res)=>{console.log(res)});