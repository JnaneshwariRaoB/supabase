"use client";
import supabase from "@/lib/supabase";
export default function LightButton() {
    async function signInWithEmail() {
        const {  error } = await supabase.auth.signInWithOtp({ 
            provider: 'google' });
        if (error) console.error("login error", error);
        }
        return (
            <button
            onClick={signInWithEmail}
            className="p-2 bg-blue-500 text-white rounded-lg"
        >sign in</button>
        );
    }