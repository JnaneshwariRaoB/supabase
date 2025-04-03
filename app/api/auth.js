import {createClient} from '@supabase/supabase-js';
const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export async function signInWithEmail(){
    const{user,error}=await supabase.auth.signInWithOtp({provider:'google'});
    if (error) throw error;
    return user;        
}
export async function signOut(){
    await supabase.auth.signOut();
}