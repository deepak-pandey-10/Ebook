import express from 'express'
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";


const app = express()
const prisma = new PrismaClient();

app.use(cors(
    {
        origin:`http://localhost:5173`,
        methods:['GET','POST','PATCH','PUT','DELETE'],
        credentials:true
    }
))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/signup',async(req,res)=>{
    const {firstName,lastName,email,password}=req.body;

    let userinfo = await prisma.user.findFirst({ where: { email } })
    if (userinfo){
        return res.status(400).json({message:'User already exists!!' , flag:'error'})
    }
    const passwordhash = await bcrypt.hash(password, 10);

    const response = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password : passwordhash
        }
    })

    return res.json({message :'User Added Successfully!!'})


    
})

app.post('/login',async(req,res)=>{
    const {email,password} = req.body

    if (!email || !password)
        return res.status(400).json({ message: "Email and password are required" });

    const user = prisma.user.findFirst({ where: { email },})

    if (!user){
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

    
    const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )

    res.json({
        success: true,
        message: "Logged in successfully",
        token,
        user:{
            id: user.id,
            email: user.email,
            firstName: user.findFirst,
            lastName: user.lastName
        }
    })
})


app.listen(3000,()=>{
    console.log("server is running.")
})

