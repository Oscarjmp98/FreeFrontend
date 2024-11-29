import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './styles/Registro.css';


const RegistroAdmin = ()=>{
    const [addcredenciales,setaddcredenciales ]= useState({
        "rol":"admin",
        "email":"",
        "password":""
        
    });
  
    const [respuesta, setrespuesta]= useState("");
    const home = useNavigate();
    
    function goHome(){
        home("/");
    }

    // const addRol =(e)=>{

    //     const rolasignado = e.target.value;

    //     if (rolasignado!="0"){
    //         setrol(rolasignado);
    //     }
    // }
    const hancredenciales =(e)=>{

       const {name, value}= e.target;

       setaddcredenciales({...addcredenciales, [name]:value})
    }

    function handleClick(e){
        // console.log(signoEditar);
        // console.log(textoEditar);
        e.preventDefault();
      
        fetch(`https://parcial2back.vercel.app/v1/signos/registroadmin`, {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({...addcredenciales})
        }) 
        .then(res => res.json())
        .then(resdata =>{
            setrespuesta(resdata);
            
        })
    }
    
    useEffect(()=>{

        if(respuesta){
            
            alert(respuesta);
        }

     },[respuesta])

     return (
        <div id ="dirRegistro">
            <h3>REGISTRO DE USUARIO ADMIN</h3>
            <form onSubmit={handleClick}>
                <label htmlFor="">Gmail</label>
                <input type="text" name= "email" value={addcredenciales.email} onChange={hancredenciales} />
                <label htmlFor="">Contraseña</label>
                <input type="password" name = "password" value={addcredenciales.password} onChange={hancredenciales}/>
                <input type="submit" value="Agregar" id="agregar"/>
                <button onClick={goHome}>Home</button>
            </form>
        </div>
    )

}

export default RegistroAdmin;