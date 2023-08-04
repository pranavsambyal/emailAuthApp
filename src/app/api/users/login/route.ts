import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);


        //Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User DNE")
            return NextResponse.json({ error: "User does not exist" }, { status: 500 });
        }
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
        }

        //Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create Token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "12h" });

        const response = NextResponse.json({ message: "Login Success", success: true })

        response.cookies.set("token", token, { httpOnly: true })
        return response;

    } catch (error: any) {
        console.log("error");
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}