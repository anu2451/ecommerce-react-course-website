import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import {useNavigate} from "react-router-dom"

export default function Auth(){

    const[mode,setMode] = useState("signup")
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const { signUp, login} = useAuth();

    const[error, setError] = useState(null);

    function changeMode(nextMode) {
        reset();
        setError(null);
        setMode(nextMode);
    }

    function onSubmit(data) {

        let result;
        setError(null);
        if(mode === "signup"){
            result = signUp(data.email,data.password);
            if(result.success){
                changeMode("login");
            }
        } else {
            result = login(data.email,data.password);
            if(result.success){
                navigate("/");
            }
        }
        if(!result.success){
            setError(result.message);
        }
    }


    return <div className="page">
        <div className="container">
            <div className="auth-container">
                <h1 className="page-title">
                    {mode === "login"?"Login":"Sign Up"}
                </h1>
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    {error && <div className="form-error">{error}</div>}
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-input" type="email" id="email"
                        {...register("email",{required: "Email is required"})}></input>

                        {errors.email && <span className="form-error">{errors.email.message}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input className="form-input" type="password" id="password"
                        {...register("password",{required: "Password is required",
                            minLength:{
                                value: 6,
                                message: "Password must be at least 6 characters"
                            },
                            maxLength:{
                                value: 12,
                                message: "Password must be at max 12 characters"
                            }
                        },

                        )}></input>
                        {errors.password && <span className="form-error">{errors.password.message}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary btn-large">{mode === "login"?"Login":"Sign Up"}</button>
                </form>
                <div className="auth-switch">
                    { mode === "signup"?
                        <p>Already have an account? <span className="auth-link" onClick={() => changeMode("login")}>Login</span></p>:
                        <p>Don't have an account? <span className="auth-link" onClick={() => changeMode("signup")}>Sign Up</span></p>
                    }
                </div>
            </div>
        </div>
    </div>
}