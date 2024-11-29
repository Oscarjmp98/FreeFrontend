import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './styles/Registro.css';

const Restablecer = ()=>{
    
    const home = useNavigate();
   
    const [respuesta , setRespuesta]= useState("");

    const [newpassword, setnewPassword]= useState({
        
        "usuario":"",
        "password":"",
        "newPassword": ""
    });

    function goHome(){
        home("/");
    }

    

    const resivirCredenciales =(e)=>{

        const {name,value }= e.target;

        setnewPassword({...newpassword,[name]:value})

        console.log(newpassword);
    }

    const enviarRegistro=(e)=>{

        e.preventDefault();
        
        fetch(`https://parcial2back.vercel.app/v1/signos/restablecer`,{

            method:'PATCH',
            headers: {"content-Type":"application/json"},
            body: JSON.stringify({...newpassword})
            
        })

        .then(res => res.json())
        .then(resData =>{
            setRespuesta(resData);
        })
        
    }
    useEffect(()=>{

        if(respuesta){
            
            alert(respuesta);
        }

    },[respuesta]);
    return(
        <div id = "dirRegistro">
            <h3>RESTABLECER CONTRASEÑA</h3>
            <form  onSubmit={enviarRegistro}>
                
                <label htmlFor="">Usuario</label>
                <input type="text" name="usuario" value ={newpassword.usuario} onChange={resivirCredenciales} />
                <label htmlFor="">Password Actual</label>
                <input type="password" name ="password" value={newpassword.password} onChange={resivirCredenciales} />
                <label htmlFor="">Nueva Password</label>
                <input type="password" name ="newPassword" value={newpassword.newPassword} onChange={resivirCredenciales} />
                <input type="Submit" value= "Enviar" id ="agregar"/>
                <button onClick={goHome}>Home</button>
            </form>
        </div>
    )
}

export default Restablecer;