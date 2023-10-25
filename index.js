const express = require("express");

const app = express();

const PORT = 5000;

app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.listen(PORT,()=>{
    console.log("app is listening on port "+PORT);
})