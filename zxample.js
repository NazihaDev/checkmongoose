let mongoose = require("mongoose");
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});
let peopleSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:Number,
    favoriteFoods:[String]
});
let Person =mongoose.model("Person",peopleSchema)