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
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
    required:true,},
    author:{
        type: String,
    },
    price:{
        type: Number,
    },
    discount:{
        type:Number,
        default:0
    },
});
const Book = mongoose.model("Book",bookSchema);
let book1=new Book({
    title:"MATHS",
    author:"RD SHARMA",
    price:1200
})
book1
.save()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})
let book2=new Book({
    title:"Object Oriented Programming in C++",
    author:"E BALAGURUSAMY",
    price:200
})
book2
.save()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})