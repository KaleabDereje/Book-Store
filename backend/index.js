import express from "express";
import mongoose from "mongoose";

import router from "./routes/book.route.js";

const app = express();

//allow to use json format in the body and send to the API using POST
app.use(express.json());

//allow to use form format in the body and send to the API using POST
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) =>{
    res.send("book store trial");
});

//refactor the server and use express router to route
app.use('/books/', router);


mongoose.connect("mongodb+srv://kaleabdereje388:md8Sp2.hT-aDa8v@bookstoredb.daijkzq.mongodb.net/?retryWrites=true&w=majority&appName=bookstoredb")
    .then( ()=>{
        console.log("Connect to mongoDB succesfully!");
        app.listen(3000, () =>{
            console.log("running on #3000 port");
        });
    })
    .catch( ()=>{
        console.log("Connection failed!");
    });