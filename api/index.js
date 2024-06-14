import express from 'express'
import cors from 'cors'

const app=express()
const PORT=3002;

// Middleware
app.use(cors());
app.use(express.json());

//route
app.get('/', (req, res)=>{
    res.json({ message: 'Hello, world!' });
})

app.listen(PORT, ()=>{
    console.log("Server is running on Port",PORT )
})