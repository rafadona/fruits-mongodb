const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});

// verificando conexao com o DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("conectado");
});


// criando schema para o db
const fruitSchema = new mongoose.Schema({
name: {
    type:String,
    required:[true,"Nao colocou nenhum nome."]
},
rating: {
    type: Number,
    min:0,
    max:10
},
review: String
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit : fruitSchema
    });

//criando collection
const Person = mongoose.model("Person",personSchema);
const Fruit = mongoose.model("Fruit",fruitSchema);

// const person = new Person({
//     name:"Lisa",
//     age: 30
    
// });
// person.save();

const kiwi = new Fruit({
    name:"Kiwi",
    score: 1,
    review:"terrible fruit"
    
});

const banana = new Fruit({
    name:"Banana",
    score: 10,
    review:"Best fruit!"
    
});

const orange = new Fruit({
    name:"Orange",
    score: 7,
    review:"Boa!"
    
});

// Fruit.insertMany([kiwi,orange,banana],function (err) {
//     if(err){
//         console.log(err);

//     }else{
//         console.log("Todas as frutas salvas!")
//     }
//   });

Person.updateOne({name:"John"},{favoriteFruit:banana},function(err){

    if(err){
        console.log(err);
    }else{
        console.log("Updated")
    }
})


Fruit.find(function(err,fruits){
    fruits.forEach(fruit => {
        if(err){
            console.log(err);    
        }else{
            console.log(fruit.name);
        }    
    });    
    mongoose.connection.close();
});






