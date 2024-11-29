import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css'
import { useState, useEffect } from "react";

function AdminHome({user}){
    if(user!=='admin' || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    const [infoTabla, setInfoTabla] = useState([]);

    function handleSelect(event){
        const signo = event.target.value;
        if(signo!=="0"){
            setSignoEditar(signo);
        } 
    }
    function SelecCategori(event){
        const Categoria = event.target.value;
        if(Categoria!=="0"){
            setcategoria(Categoria);
        } 
    }

    function goHome(){
        home("/");
    }

    const valor ="utilizado"

    useEffect(()=>{

        fetch(`https://parcial2back.vercel.app/v1/signos/traer/${valor}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            // body: JSON.stringify(null)
        })
        .then(response => response.json())
                .then(responseData => {
                    
                    if (typeof responseData === "object"){
                        
                        setInfoTabla(responseData);
                    }else{
                        setTexto(responseData);
                        
                    }
                })
       

     },[valor])
   
        // console.log(signoEditar);
        // console.log(textoEditar);
    

    return (
        <div class="container">
           
            
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
            {/* Mostrar la tabla solo si infoTabla tiene datos */}
           {
                <table>
                    <thead>
                        <tr>
                            <th>FECHA</th>
                            <th>NOMBRE</th>
                            <th>CEDULA</th>
                            <th>TELEFONO</th>
                            <th>CÓDIGO GANADOR</th>
                            <th>PREMIO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapeamos todos los registros en el array */}
                        {infoTabla.length > 0 && (infoTabla.map((registro, index) => (
                            <tr key={index}>
                                <td>{new Date(registro.fecha).toLocaleDateString()}</td>
                                <td>{registro.nombre}</td>
                                <td>{registro.cedula}</td>
                                <td>{registro.telefono}</td>
                                <td>{registro.codigo}</td>
                                <td>{registro.premio}</td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default AdminHome;