const express = require("express")
const router = express.Router()
const req = require("express/lib/request")
const res =require("express/lib/response")
const person = require("../Model/person")
//les requetes:
//Create a person with this prototype: 
let peopleSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:Number,
    favoriteFoods:[String]
})
let Person = mongoose.model('Person',peopleSchema)

//Create and Save a Record of a Model:
var createAndSavePerson = function(done)
let  francesca =new Person ({name:'francesca',age:20,favoriteFoods:['sushi']})
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
var findAndUpdate = function (personName,done){
    var aheToSet =20;
    personName.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(error,updatedRecord) => {
        if(error){
            console.log(error)
               }else{
                done(null,deletedRecord)
               }
            })
   

};
//Delete One Document Using model.findByIdAndRemove
var removeById = function(personId,done){
    Person.findByIdAndRemove(personId,(error,deletedRecord)=>{
        if(error){
            console.log(error)
               }else{
                done(null,updatedRecord)
               }
    
    })
};
//MongoDB and Mongoose - Delete Many Documents with model.remove()
var removeManyPeople = function(done){
    var nameToRemove = "Mary";
    Person.removeAllListeners({name:nameToRemove},(error,JSONStatus)=>{
        if(error){
            console.log(error)
               }else{
                done(null,JSONStatus)
               }
    
    
    })
};
//Chain Search Query Helpers to Narrow Search Results
var queryChain =function(done){
    var foodToSearch = "burrito"
    Person.find({favoriteFoods:{$all:[foodToSearch]}})
        .sort({name:'asc'})
        .limit(2)
        .select('-age')
        .exec((error,filteredResults) =>{
            if(error){
                console.log(error)
                   }else{
                    done(null,filteredResults)
                   }
        
        
        })
};
