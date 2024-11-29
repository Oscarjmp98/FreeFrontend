import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './styles/Registro.css';


const Registro = ()=>{
    const [addcredenciales,setaddcredenciales ]= useState({
        "rol":"user",
        "email":"",
        "password":"",
        "nombre":"",
        "fecha":"",
        "cedula":"",
        "telefono":"",
        "ciudad":""
    });
    const [rol, setrol]= useState("");
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
      
        fetch(`http://localhost:4000/v1/signos/registro`, {
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
            <h3>REGISTRO DE USUARIO</h3>
            <form onSubmit={handleClick}>
                <label htmlFor="">Nombre</label>
                <input type="text" name= "nombre" value={addcredenciales.nombre} onChange={hancredenciales} />
                <label htmlFor="">Cedula</label>
                <input type="text" name= "cedula" value={addcredenciales.cedula} onChange={hancredenciales} />
                <label htmlFor="">Ciudad</label>
                <input type="text" name="ciudad" value={addcredenciales.ciudad} onChange={hancredenciales} />
                <label htmlFor="">Telefono</label>
                <input type="text" name= "telefono" value={addcredenciales.telefono} onChange={hancredenciales} />
                <label htmlFor="">Fecha Nacimiento</label>
                <input type="date" name= "fecha" value={addcredenciales.fecha} onChange={hancredenciales} />
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

export default Registro;