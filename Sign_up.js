import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const collectData=async()=>{
        // console.warn(name,email,password)
        let result=await fetch('http://127.0.0.1:5000/register',{
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'},
        }); 
        result =await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result));
        if(result){
            navigate('/')
        }
    }


    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text"
                value={name}
                onChange={
                    (e) => setName(e.target.value)
                }
                placeholder="enter the name"></input>
            <input className="inputBox" type="email"
                value={email}
                onChange={
                    (e) => setEmail(e.target.value)
                }
                placeholder="enter the email"></input>
            <input className="inputBox" type="password"
                value={password}
                onChange={
                    (e) => setPassword(e.target.value)
                }
                placeholder="enter the password"></input>
            <button onClick={collectData} className="appbutton" type="button">Sign up</button>
        </div>

    )

}

export default Signup;
