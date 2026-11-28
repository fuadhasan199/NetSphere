import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { registerSchema } from "@/validations/auth.validation";
import bcrypt from "bcryptjs";




export async function registerUser(body: unknown){
     const parsed = registerSchema.safeParse(body) 
     if(!parsed.success){
         return {error:"invalid input" ,status:400}
     } 
          await connectDB()
     const {name,email,password,phone}=parsed.data 


  const exists = await User.findOne({ email });
  if (exists) return { status: 409, error: "Email already registered" }; 


  const hased=await bcrypt.hash(password,10) 
   await User.create({name,email,password:hased,phone}) 
   return {status:201,message:"user created successfully"}

  
    }

