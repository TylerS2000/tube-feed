import React from "react";
import calculateTf from "../calculate";

export default function Input(){
    const[tfVals, setTfVals]=React.useState({
        weight:"",
        height:"",
        tf:"",
        gender:"",
        severity:"",
        propofol:0})
    const[final,setFinal]=React.useState("")

    function handleChange(event){  
       setTfVals((prev)=>{return{...prev,[event.target.name]:event.target.value}})
       console.log(tfVals.severity)
    }

    function handleClick(){
   setFinal(calculateTf(tfVals))
    
    }

    return(
    <div>
        <input placeholder="height in inches" name="height" value={tfVals.height} onChange={handleChange}></input>
        <input placeholder="weight in kg" name="weight" value={tfVals.weight} onChange={handleChange}></input>
        <select name="gender" onChange={handleChange}value={tfVals.gender}>
            <option >Select Gender</option>
            <option value="male" >Male</option>
            <option value ="female">Female</option>
        </select>
       <select name="tf" onChange={handleChange} value={tfVals.tf}>
            <option>Select TF</option>
            <option value="jevity">Jevity 1.5</option>
            <option value="vital">Vital HP</option>
       </select>
       <select name="severity" onChange={handleChange} value={tfVals.severity}>
        <option value="normal">normal</option>
        <option value="critically ill">critically ill</option>
       </select>
       <input placeholder="propofol rate" name="propofol" value={tfVals.propofol} onChange={handleChange} ></input>
       <button onClick={handleClick}>Submit</button>
       <p>{final}</p>
    </div>
    )
}