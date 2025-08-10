import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({ 
    username:{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        //optimise searching using index                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        index : true 
    },
    email:{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true, 
    },
    fullname: {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avatar: {
        type : String, //cloudnary url stored
        required : true
    },
    coverImage: {
        type : String //cloudnary url stored
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "password is required"]
    },
    refreshToken: {
        type: string
    }
},{
    timestamps: true
})

//most of the hook are in models files
//encrypting the password only when password is new or changes not everytime
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.Access_Token_Secret,
        {
            expiresIn: process.env.Access_Token_Expiry
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.Refresh_Token_Secret,
        {
            expiresIn: process.env.Refresh_Token_Expiry
        }
    )
}
export const User = mongoose.model("User",userSchema)