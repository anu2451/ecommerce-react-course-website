import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }){

    const[user,setUser] = useState(null);

    function signUp(email, password){
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        
        if(users.find(user => user.email === email)){
            return {success: false, message: "Email already exists"};
        }

        const newUser = {email,password};
        users.push(newUser);
        localStorage.setItem("users",JSON.stringify(users));

        return {success: true};
    }


    function login(email, password){
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(user => user.email === email && user.password === password);

        if(!user){
            return {success: false, message: "Invalid email or password"};
        }

        localStorage.setItem("currentEmail", email);
        setUser({email});

        return {success: true};
    }

    function logout(){
        localStorage.removeItem("currentEmail");
        setUser(null);
    }



    return <AuthContext.Provider value={{signUp, login, logout, user}}>{children}</AuthContext.Provider>
}

export function useAuth(){

    const context = useContext(AuthContext);

    return context;
}