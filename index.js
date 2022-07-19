const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


var DB = {
    games: [
        {
            id:23,
            title: "call of duty",
            year: 2021,
            price:60
        },
        {
            id:26,
            title: "naruto",
            year: 2001,
            price:90
        },
        {
            id:28,
            title: "crash",
            year: 2012,
            price:80
        }
    ]
}

app.get("/games",(req,res) =>{
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/game/:id",(req,res) => {
    
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
            res.json(game);
            res.statusCode = 200;
        }else{
            res.sendStatus(404);
        }

    }

});

app.post("/game", (req,res) =>{

    var {title,price, year } = req.body;

    DB.games.push({
        id: 232,
        title,
        price,
        year
    });

    res.sendStatus(200);

});

app.delete("/game/:id", (req,res) =>{

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }

});

app.put("/game/:id", (req,res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if(game != undefined){

        var {title,price,year} = req.body;

        if(title != undefined){
            game.title = title;
        }
        if(price != undefined){
            game.price = price;
        }
        if(year != undefined){
            game.year = year;
        }
        
        res.sendStatus(200);

        }else{
           
            res.sendStatus(404);
        }
    }

});

app.listen(4000,()=>{
    console.log("api rodando")
});
