import './Password.css';
import { useState } from 'react';

import React from 'react'

function Passwordgen(){
const [password,setPassword]=useState("");
const [passwordLength,setPasswordLength]=useState(8);
const [useSymbols,setUseSymbols]=useState(true);
const [useNumbers,setUseNumbers]=useState(true);
const [useLowerCase,setUseLowerCase]=useState(true);
const [useUpperCase,setUseUpperCase]=useState(true);
const [successMessage,setSuccessMessage]=useState("");

const generatePassword=()=>{
  if(passwordLength<8 || passwordLength>55){
    alert("Password length should be between 8 to 55");
    return;
  }

    let charset="";
    let newPassword="";
    if(useSymbols) charset+="!@#$%^&*()";
    if(useNumbers) charset+="0123456789";
    if(useLowerCase) charset+="abcdefghijklmnopqrstuvwxyz";
    if(useUpperCase) charset+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for(let i=0;i<passwordLength;i++){
        newPassword+=charset.charAt(Math.floor(Math.random()*charset.length));
    }
    setPassword(newPassword);
}

const copyToClipboard=()=>{
    const element=document.createElement("textarea");
    element.value=password;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    setSuccessMessage("Password Copied to clipboard!");
    setTimeout(()=>setSuccessMessage(""),3000);
}



  return (
    <div className='container'>
        <h1>Password Generator</h1>
        <div className='passwordlength'>
            <label htmlFor="">Password Length:(Choose Between 8 to 55 characters)</label>
            <input type="number" min="8" max="55" value={passwordLength} onChange={(e)=>setPasswordLength(e.target.value)} />
        </div>

        <div className="checkboxcontainer">
            <label htmlFor="">
                <input type="checkbox" checked={useSymbols} onChange={()=>setUseSymbols(!useSymbols)}/>
                Symbols
            </label>
            <label htmlFor="">
                <input type="checkbox" checked={useNumbers} onChange={()=>setUseNumbers(!useNumbers)}/>
                Numbers
            </label>
            <label htmlFor="">
                <input type="checkbox" checked={useLowerCase} onChange={()=>setUseLowerCase(!useLowerCase)}/>
                LowerCase
            </label>
            <label htmlFor="">
                <input type="checkbox" checked={useUpperCase} onChange={()=>setUseUpperCase(!useUpperCase)}/>
                UpperCase
            </label>
        </div>
        <div className="buttongenerate">
            <button onClick={generatePassword}>Generate Password</button>
        </div>
        {password && (
            <div className="copytext">
                <label htmlFor="">Generated Password:</label>
                <input type="text" value={password} readOnly />
                <button onClick={copyToClipboard}>Copy</button>
            </div>
        )}

        {successMessage && (
            <p>{successMessage}</p>
        )}
    </div>
  )
}

export default Passwordgen;