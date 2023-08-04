"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        token: "",
        password: "",
        repassword: "",
    });
    const [token, setToken] = useState("");
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    
    const resetPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/reset", user);
            console.log("Reset Success", response.data)
            router.push('/login')

        } catch (error: any) {
            console.log("Reset failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        console.log(urlToken);
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            user.token=token;
        }
    }, [token]);

    useEffect(() => {
        if (user.password.length > 0 && user.repassword.length > 0 ) {
            if(user.password===user.repassword)
            {
                setButtonDisabled(false);
            }
            else
            {
                setButtonDisabled(true);
            }
            
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="font-black mb-4 ">{loading ? "Processing" : "Reset Password"}</h1>
            <hr />
            <label htmlFor="password">Password</label>
            <input
                className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <hr />
            <label htmlFor="password">Verify Password</label>
            <input
                className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                id="repassword"
                type="password"
                value={user.repassword}
                onChange={(e) => setUser({ ...user, repassword: e.target.value })}
                placeholder="password"
            />
            <button
                disabled={buttonDisabled}
                onClick={resetPassword}
                className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600">
                {buttonDisabled ? "Password's Don't Match" : "Reset"}</button>
            <Link href="/login">Already have an account? Login </Link>
        </div>
    );
}