import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })
    const HandleLogin = async() => {
        console.warn(email, password);
        let result=await fetch('http://127.0.0.1:5000/login',{
            method: 'POST',
            body: JSON.stringify({password,email}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        result=await result.json();
        console.warn(result);
        if(result.name){
            localStorage.setItem('user',JSON.stringify(result));
            navigate('/')
        }else{
            alert('Please enter correct details');
        }
    }
    return (
        <div className="login">
            <h1>
                Login page</h1>
            <input type="text" className="inputBox" placeholder="Enter the email"
                value={email}
                onChange={
                    (e) => setEmail(e.target.value)
            }></input>
            <input type="password" className="inputBox"
                value={password}
                onChange={
                    (e) => setPassword(e.target.value)
                }
                placeholder="Enter the password"></input>
            <button onClick={HandleLogin}
                className="appbutton"
                type="button">Login</button>

        </div>
    )
}

export default Login;
