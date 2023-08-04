import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";



connect()


export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {email} = reqBody
        console.log(email);

        const user = await User.findOne({email});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);
        
        //sending reset email.
        const res=await sendEmail({email, emailType: "RESET", userId: user._id.toString()})
        console.log(res);
        
        return NextResponse.json({
            message: "Email sent successfully",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}