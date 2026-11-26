import { InferSchemaType,  model,  models, Schema } from "mongoose";




  
    const userSchema =new Schema( 
              {
                  name:{ type:String, required:true,trim:true },
                 email: { type: String, required: true, unique: true, lowercase: true },
                 password: { type: String, required: true, select: false },
                  role: { type: String, enum: ["admin", "partner", "customer"], default: "customer" },
                  phone: String,
                  area: String, 
                status: { type: String, enum: ["active", "blocked"], default: "active" },

              } ,
              {timestamps:true}
    ) 
     

 export type IUser = InferSchemaType<typeof userSchema>;
 export const User = models.User || model("User", userSchema);












// export type IUser = InferSchemaType<typeof userSchema>;
// export const User = models.User || model("User", userSchema);