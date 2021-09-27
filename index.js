require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db/index.js")
const app = express();

app.use(express.json())
app.use(morgan("dev"));

app.get('/api/v1/restaurants', async (req, res)=>{
    try{
    const result = await db.query("SELECT * FROM restaurants");
    res.status(200).json({status: "success", length: result.rows.length, restaurants: result.rows})
    }
    catch(error){
        res.status(500).json({status: "failed" })
    }
   
})

app.get('/api/v1/restaurants/:id', async (req, res)=>{
    try{
        const results = await db.query(`SELECT * FROM restaurants WHERE id = $1`, [req.params.id])
        res.status(200).json({status: "sucess", data: {
        restaurant: results.rows
    }})
    }catch(error){
        console.log(error)
    }
   
})

app.post('/api/v1/restaurants', (req, res)=>{
    res.status(200).json({status: "sucess", data: {
        restaurant: ["pizzi"]
    }})
})


app.put('/api/v1/restaurants/:id', (req, res)=>{
    res.status(200).json({status: "sucess", data: {
        restaurant: ["pizzi"]
    }})
})


app.delete('/api/v1/restaurants/:id', (req, res)=>{
    res.status(200).json({status: "sucess", data: {
        restaurant: ["pizzi"]
    }})
})

app.listen(process.env.PORT, ()=> {
    console.log(`server is running on ${process.env.PORT}`)
})