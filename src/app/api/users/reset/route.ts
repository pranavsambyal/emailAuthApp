import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';



connect()


export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {token,password,repassword} = reqBody
        if(password!==repassword)
        {
            throw new Error("Passwords Don't match")
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);
        console.log({token,hashedPassword});

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            console.log("User not Found");
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({
            message: "Password reset successfully",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}