//Installing and setting up Mongoose:
const mongoose = require('mongoose');
`mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });`
//Create a person with this prototype: 
let peopleSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:Number,
    favoriteFoods:[String]
})
let Person = mongoose.model('Person',peopleSchema)

//Create and Save a Record of a Model:
var createAndSavePerson = function(done)
let francesca =new Person ({name:'francesca',age:20,favoriteFoods:['sushi']})
francesca.save((error,data) =>{
    if(error){
        console.log(error)
    }
    else{
        done(null,data)
    }
})
//Create Many Records with model.create()
let arrayOfPeople = [
    {name:'Garry',age:35,favoriteFoods:['fried chiken','chiken wings','chicken nuggets']},
    {name:'Hannah',age:24,favoriteFoods:['watermelon','mango']},
    {name:'Igor',age:52,favoriteFoods:['vegetable soup']}
]
var createManyPeople= function(arrayOfPeople,done){
    Person.create(arrayOfPeople,(error,createdPeople) =>{
        if(error){
            console.log(error)
        }else{
            done(null,createdPeople)
        }
    });
};
//Use model.find() to Search Your Database
Person.find({name:'kris',age:42},(error,data)=>{
    if(error){
        console.log(error)
    }else{
        console.log(data)
    }
})
var findPeopleByName = function(personName,done){
    Person.find({name:personName},(error,arrayOfResults) =>{
        if(error){
            console.log(error)
        }else{
            done(null,arrayOfResults)
        }
    })
};
//Use model.findOne() to Return a Single Matching Document from Your Database
/*Person.find({favoriteFoods:{$all:['prawns']}},(error,data) =>{
    if(error){
        console.log(error)
    }else{
        console.log(data)
    }
})*/
var findOneByFood = function(food,done){
    Person.findOne({favoritefoods:{$all:['food']}},(error,result) =>{
        if(error){
            console.log(error)
        }else{
            done(null,result)
        }
    })
};
//Use model.findById() to Search Your Database By _id
var findPersonById = function(personId,done){
    Person.findById(personId,(error,result)=>{
        if(error){
            console.log(error)
        }else{
            done(null,result)
        }
    })
};
//Perform Classic Updates by Running Find, Edit, then Save
var findEditThenSave = function(personId,done){
    var foodToAdd = "hamburger";
    Person.findById(personId,(error,result)=>{
        if(error){
            console.log(error)
        }else{
            result.favoriteFoods.push(foodToAdd)
            result.save((error,updateResult)=>{
                if(error){
                    console.log(error)
                }else{
                    done(null,updateRecord)
                }
            })
        }
    })
}
//Perform New Updates on a Document Using model.findOneAndUpdate()
