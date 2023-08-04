"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Success", response.data)
            router.push('/login')

        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="font-black mb-4 ">{loading ? "Processing" : "Sign up"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
            />
            <label htmlFor="email">Email</label>
            <input
                className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">Password</label>
            <input
                className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button
                onClick={onSignup}
                className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600">
                {buttonDisabled ? "Can't Signup" : "Signup Here"}</button>
            <Link href="/login">Already have an account? Login </Link>
        </div>
    );
}