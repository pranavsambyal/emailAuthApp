"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage() {
    const router=useRouter();
    const [data,setData]=React.useState('nothing');

    const getUserDetails=async()=>{
        const response =await axios.get('api/users/me');
        console.log(response.data.data);
        setData(response.data.data.username);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-3 rounded bg-red-500">{data==="nothing"?"Nothing":<Link href={`/profile/${data}`}>{data}</Link> }</h2>
            <hr />
            <button
            onClick={async ()=>{
                try {
                    await axios.get("/api/users/logout")
                    router.push('/login');
                } catch (error:any) {
                    console.log(error);
                    toast.error("error.message");
                }
                }} 
            className="bg-blue-300 mt-4 text-white font-bold p-4 rounded hover:bg-blue-700">Logout</button>
            <button
            onClick={getUserDetails} 
            className="bg-purple-300 mt-4 text-white font-bold p-4 rounded hover:bg-purple-700">Get User Details</button>
        </div>
    )
}