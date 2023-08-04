"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onReset = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", user);
            console.log("Email Sent", response.data)
            toast.success("Email Sent");
            router.push('/login');

        } catch (error: any) {
            console.log("Error", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    React.useEffect(() => {
        if (user.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="font-black mb-4 ">Reset password</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input
                className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />            
            <button
                onClick={onReset}
                disabled={loading}
                className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600">
                {loading ? "Processing" : "Reset"}</button>
            <Link href="/signup">Create a new account</Link>
        </div>
    );
}